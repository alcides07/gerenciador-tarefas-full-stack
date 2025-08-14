import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { RegistroService } from '../../../../services/registro/registro.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-registro',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
export class FormRegistroComponent {
  isLoading = false;

  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  private registroService = inject(RegistroService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      const formData = this.validateForm.getRawValue();

      this.registroService
        .register(formData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          })
        )
        .subscribe({
          next: () => {
            this.message.create('success', 'Cadastro realizado com sucesso!');
            this.router.navigate(['/']);
          },
          error: () => {
            this.message.create('error', 'Erro no cadastro!');
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
