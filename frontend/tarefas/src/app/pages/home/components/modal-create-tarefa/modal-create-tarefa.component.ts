import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule,
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Prioridade, Situacao } from '../../../../interfaces/models/tarefa';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ResponsavelService } from '../../../../services/responsavel/responsavel.service';
import { Responsavel } from '../../../../interfaces/models/responsavel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-create-tarefa',
  imports: [
    NzFormControlComponent,
    NzDatePickerModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzFormLabelComponent,
    NzFormItemComponent,
  ],
  templateUrl: './modal-create-tarefa.component.html',
  styleUrl: './modal-create-tarefa.component.css',
})
export class ModalCreateTarefaComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onCreateTarefaEmit = new EventEmitter<void>();

  isLoadingSubmit = false;
  responsaveis: Responsavel[] = [];
  prioridades: Prioridade[] = ['BAIXA', 'MEDIA', 'ALTA'];
  situacoes: Situacao[] = ['EM_ANDAMENTO', 'CONCLUIDA'];
  responsavelService: ResponsavelService = inject(ResponsavelService);
  tarefaService: TarefaService = inject(TarefaService);

  private fb = inject(NonNullableFormBuilder);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  validateForm = this.fb.group({
    titulo: this.fb.control<string>(null!, [Validators.required]),
    descricao: this.fb.control<string>(null!, [Validators.required]),
    prioridade: this.fb.control<Prioridade>(null!, [Validators.required]),
    data: this.fb.control<string>(null!, [Validators.required]),
    responsavelId: this.fb.control<number>(null!, [Validators.required]),
  });

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isLoadingSubmit = true;
      const formData = this.validateForm.getRawValue();

      const dataSubmit = {
        ...formData,
        data: new Date(formData.data).toISOString().split('T')[0],
      };

      this.tarefaService
        .createTarefa(dataSubmit)
        .pipe(
          finalize(() => {
            this.isLoadingSubmit = false;
            this.cdr.markForCheck();
          })
        )
        .subscribe({
          next: () => {
            this.onCreateTarefaEmit.emit();
            this.closeModal();
          },
          error: () => {
            this.message.create('error', 'Erro ao criar tarefa!');
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

  handleCancel(): void {
    this.closeModal();
  }

  ngOnInit(): void {
    this.getResponsaveis();
  }

  getResponsaveis(): void {
    this.responsavelService.getResponsaveis().subscribe({
      next: (responsaveis) => {
        this.responsaveis = responsaveis;
      },
      error: () => {
        this.message.create('error', 'Erro ao listar responsáveis!');
      },
    });
  }

  private closeModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
