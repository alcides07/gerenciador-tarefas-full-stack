import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Tarefa } from '../../../../interfaces/models/tarefa';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

@Component({
  imports: [NzModalModule],
  selector: 'app-modal-delete-tarefa',
  templateUrl: './modal-delete-tarefa.component.html',
  styleUrl: './modal-delete-tarefa.component.css',
})
export class ModalDeleteTarefaComponent {
  @Input() tarefa!: Tarefa;
  @Input() isLoading: boolean = false;
  @Input() isVisible: boolean = false;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<void>();

  modal: NzModalService = inject(NzModalService);
  private tarefaService = inject(TarefaService);
  private message = inject(NzMessageService);

  handleConfirm(): void {
    this.isLoading = true;

    this.tarefaService
      .deleteTarefa(this.tarefa.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isVisible = false;
          this.isVisibleChange.emit(false);
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Tarefa excluída com sucesso!');
          this.onComplete.emit();
        },
        error: () => {
          this.message.error('Erro ao excluir tarefa!');
        },
      });
  }

  closeModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
