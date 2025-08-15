import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Tarefa } from '../../../../interfaces/models/tarefa';
import formatDataISOToddMMyyyy from '../../../../utils/formatDataISO';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TarefaService } from '../../../../services/tarefa/tarefa.service';
import { ModalDeleteTarefaComponent } from '../modal-delete-tarefa/modal-delete-tarefa.component';
import { ModalCompleteTarefaComponent } from '../modal-complete-tarefa/modal-complete-tarefa.component';
import { ModalCreateTarefaComponent } from '../modal-create-tarefa/modal-create-and-update-tarefa.component';

@Component({
  selector: 'app-table',
  imports: [
    NzDividerModule,
    NzTableModule,
    ModalDeleteTarefaComponent,
    ModalCompleteTarefaComponent,
    ModalCreateTarefaComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() tarefas: Tarefa[] = [];

  @Output() onDeleteTarefaEmit = new EventEmitter<void>();
  @Output() onUpdateTarefaEmit = new EventEmitter<void>();
  @Output() onCompleteTarefaEmit = new EventEmitter<void>();

  selectedTarefa: Tarefa | null = null;
  showDeleteModal = false;
  showUpdateModal = false;
  showCompleteModal = false;

  formatarData(dataISO: string): string {
    return formatDataISOToddMMyyyy(dataISO);
  }

  onModalCompleteConfirm(): void {
    this.onCompleteTarefaEmit.emit();
  }

  onModalDeleteConfirm(): void {
    this.onDeleteTarefaEmit.emit();
  }

  onModalUpdateConfirm(): void {
    this.onUpdateTarefaEmit.emit();
  }

  openDeleteModal(tarefa: Tarefa): void {
    this.selectedTarefa = tarefa;
    this.showDeleteModal = true;
  }

  openUpdateModal(tarefa: Tarefa): void {
    this.selectedTarefa = tarefa;
    this.showUpdateModal = true;
  }

  openCompleteModal(tarefa: Tarefa): void {
    this.selectedTarefa = tarefa;
    this.showCompleteModal = true;
  }

  onModalCancel(): void {
    this.showDeleteModal = false;
    this.showCompleteModal = false;
    this.showUpdateModal = false;
  }
}
