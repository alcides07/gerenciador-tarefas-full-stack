import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { LoginService } from '../../../../services/login/login.service';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-form-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  isLoading = false;
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);
  private localStorageService = inject(LocalStorageService);

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      const formData = this.validateForm.getRawValue();
      this.localStorageService.clear();

      this.loginService
        .login(formData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          })
        )
        .subscribe({
          next: (data) => {
            this.localStorageService.setItem('token', data.access);
            this.router.navigate(['/inicio']);
          },
          error: () => {
            this.message.create('error', 'Erro no login!');
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
