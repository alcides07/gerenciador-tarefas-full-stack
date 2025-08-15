import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Tarefa } from '../../../../interfaces/models/tarefa';
import formatDataISOToddMMyyyy from '../../../../utils/formatDataISO';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalDeleteTarefaComponent } from '../modal-delete-tarefa/modal-delete-tarefa.component';
import { ModalCompleteTarefaComponent } from '../modal-complete-tarefa/modal-complete-tarefa.component';

@Component({
  selector: 'app-table',
  imports: [
    NzDividerModule,
    NzTableModule,
    ModalDeleteTarefaComponent,
    ModalCompleteTarefaComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() tarefas: Tarefa[] = [];
  @Output() onDeleteTarefaEmit = new EventEmitter<void>();
  @Output() onCompleteTarefaEmit = new EventEmitter<void>();

  isLoadingSubmit = false;
  modal: NzModalService = inject(NzModalService);
  tarefaService: TarefaService = inject(TarefaService);
  private cdr = inject(ChangeDetectorRef);
  private message = inject(NzMessageService);
  selectedTarefa: Tarefa | null = null;
  showDeleteModal = false;
  showCompleteModal = false;

  formatarData(dataISO: string): string {
    return formatDataISOToddMMyyyy(dataISO);
  }

  handleDeleteTarefa(id: number): void {
    this.isLoadingSubmit = true;
    this.tarefaService
      .deleteTarefa(id)
      .pipe(
        finalize(() => {
          this.isLoadingSubmit = false;
          this.cdr.markForCheck();
          this.showDeleteModal = false;
        })
      )
      .subscribe({
        next: () => {
          this.onDeleteTarefaEmit.emit();
        },
        error: () => {
          this.message.create('error', 'Erro ao excluir tarefa!');
        },
      });
  }

  handleCompleteTarefa(id: number): void {
    this.isLoadingSubmit = true;
    this.tarefaService
      .completeTarefa(id)
      .pipe(
        finalize(() => {
          this.isLoadingSubmit = false;
          this.cdr.markForCheck();
          this.showCompleteModal = false;
        })
      )
      .subscribe({
        next: () => {
          this.onCompleteTarefaEmit.emit();
        },
        error: () => {
          this.message.create('error', 'Erro ao concluir tarefa!');
        },
      });
  }

  openDeleteModal(tarefa: Tarefa): void {
    this.selectedTarefa = tarefa;
    this.showDeleteModal = true;
  }

  openCompleteModal(tarefa: Tarefa): void {
    this.selectedTarefa = tarefa;
    this.showCompleteModal = true;
  }

  onModalDeleteConfirm(id: number): void {
    this.handleDeleteTarefa(id);
  }

  onModalCompleteConfirm(id: number): void {
    this.handleCompleteTarefa(id);
  }

  onModalCancel(): void {
    this.showDeleteModal = false;
    this.showCompleteModal = false;
    this.selectedTarefa = null;
  }
}
