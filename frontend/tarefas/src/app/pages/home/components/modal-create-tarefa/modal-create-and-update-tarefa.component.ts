import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
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
import {
  Prioridade,
  Situacao,
  Tarefa,
  TarefaOptionalRequest,
  TarefaRequest,
} from '../../../../interfaces/models/tarefa';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ResponsavelService } from '../../../../services/responsavel/responsavel.service';
import { Responsavel } from '../../../../interfaces/models/responsavel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-create-and-update-tarefa',
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
  templateUrl: './modal-create-and-update-tarefa.component.html',
  styleUrl: './modal-create-and-update-tarefa.component.css',
})
export class ModalCreateTarefaComponent {
  @Input() isVisible: boolean = false;
  @Input() tarefa: Tarefa | null = null;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onCreateTarefaEmit = new EventEmitter<void>();
  @Output() onUpdateTarefaEmit = new EventEmitter<TarefaOptionalRequest>();

  isLoadingSubmit = false;
  responsaveis: Responsavel[] = [];
  prioridades: Prioridade[] = ['BAIXA', 'MEDIA', 'ALTA'];
  situacoes: Situacao[] = ['EM_ANDAMENTO', 'CONCLUIDA'];
  responsavelService: ResponsavelService = inject(ResponsavelService);
  tarefaService: TarefaService = inject(TarefaService);

  private fb = inject(NonNullableFormBuilder);
  private message = inject(NzMessageService);

  validateForm = this.fb.group({
    titulo: this.fb.control<string>(null!, [Validators.required]),
    descricao: this.fb.control<string>(null!, [Validators.required]),
    prioridade: this.fb.control<Prioridade>(null!, [Validators.required]),
    data: this.fb.control<string>(null!, [Validators.required]),
    responsavelId: this.fb.control<number>(null!, [Validators.required]),
  });

  private loadTarefa(): void {
    if (this.tarefa && this.isVisible) {
      const dataFormatada = this.tarefa.data.split('T')[0];
      this.validateForm.patchValue({
        titulo: this.tarefa.titulo,
        descricao: this.tarefa.descricao,
        prioridade: this.tarefa.prioridade,
        data: dataFormatada,
        responsavelId: this.tarefa.responsavel.id,
      });
    } else {
      this.validateForm.reset();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefa'] || changes['isVisible']) {
      this.loadTarefa();
    }
  }

  ngOnInit(): void {
    this.getResponsaveis();
    this.loadTarefa();
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.isLoadingSubmit = true;
      const formData = this.validateForm.getRawValue();

      const dataSubmit = {
        ...formData,
        data: new Date(formData.data).toISOString().split('T')[0],
      };

      if (this.tarefa) {
        this.updateTarefa(dataSubmit);
      } else {
        this.createTarefa(dataSubmit);
      }
    } else {
      this.markFormAsDirty();
    }
  }

  private markFormAsDirty(): void {
    Object.values(this.validateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private updateTarefa(data: TarefaOptionalRequest): void {
    if (!this.tarefa) return;

    this.tarefaService
      .updateTarefa(this.tarefa.id, data)
      .pipe(
        finalize(() => {
          this.isLoadingSubmit = false;
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Tarefa atualizada com sucesso!');
          this.onUpdateTarefaEmit.emit();
          this.closeModal();
        },
        error: () => this.message.error('Erro ao atualizar tarefa!'),
      });
  }

  private createTarefa(data: TarefaRequest): void {
    this.tarefaService
      .createTarefa(data)
      .pipe(
        finalize(() => {
          this.isLoadingSubmit = false;
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Tarefa criada com sucesso!');
          this.onCreateTarefaEmit.emit();
          this.closeModal();
        },
        error: () => this.message.error('Erro ao criar tarefa!'),
      });
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

  handleCancel(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.validateForm.reset();
  }
}
