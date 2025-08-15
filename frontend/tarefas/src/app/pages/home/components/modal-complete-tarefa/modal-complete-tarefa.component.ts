import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Tarefa } from '../../../../interfaces/models/tarefa';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

@Component({
  imports: [NzModalModule],
  selector: 'app-modal-complete-tarefa',
  templateUrl: './modal-complete-tarefa.component.html',
  styleUrl: './modal-complete-tarefa.component.css',
})
export class ModalCompleteTarefaComponent {
  @Input() tarefa!: Tarefa;
  @Input() isVisible: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<void>();

  private tarefaService = inject(TarefaService);
  private message = inject(NzMessageService);

  handleConfirm(): void {
    this.isLoading = true;

    this.tarefaService
      .completeTarefa(this.tarefa.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isVisible = false;
          this.isVisibleChange.emit(false);
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Tarefa concluída com sucesso!');
          this.onComplete.emit();
        },
        error: () => {
          this.message.error('Erro ao concluir tarefa!');
        },
      });
  }

  closeModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
