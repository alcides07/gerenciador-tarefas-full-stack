import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule,
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ResponsavelService } from '../../../../services/responsavel/responsavel.service';
import { ResponsavelRequest } from '../../../../interfaces/models/responsavel';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-create-responsavel',
  imports: [
    NzFormControlComponent,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormLabelComponent,
    NzFormItemComponent,
  ],
  templateUrl: './modal-create-responsavel.component.html',
  styleUrl: './modal-create-responsavel.component.css',
})
export class ModalCreateResponsavelComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onReloadResponsaveisEmit = new EventEmitter<void>();

  isLoadingSubmit = false;
  responsavelService: ResponsavelService = inject(ResponsavelService);

  private fb = inject(NonNullableFormBuilder);
  private message = inject(NzMessageService);

  validateForm = this.fb.group({
    nome: this.fb.control<string>('', [Validators.required]),
  });

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isLoadingSubmit = true;
      const formData = this.validateForm.getRawValue();

      this.createResponsavel(formData);
    } else {
      this.markFormAsDirty();
    }
  }

  private createResponsavel(data: ResponsavelRequest): void {
    this.responsavelService
      .createResponsavel(data)
      .pipe(
        finalize(() => {
          this.isLoadingSubmit = false;
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Responsável cadastrado com sucesso!');
          this.onReloadResponsaveisEmit.emit();
          this.closeModal();
        },
        error: () => this.message.error('Erro ao cadastrar responsável!'),
      });
  }

  private markFormAsDirty(): void {
    Object.values(this.validateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  handleCancel(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.validateForm.reset();
  }
}
