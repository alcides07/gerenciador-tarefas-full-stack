// modal-delete-tarefa.component.ts
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Tarefa } from '../../../../interfaces/models/tarefa';

@Component({
  selector: 'app-modal-delete-tarefa',
  templateUrl: './modal-delete-tarefa.component.html',
  styleUrl: './modal-delete-tarefa.component.css',
})
export class ModalDeleteTarefaComponent {
  @Input() tarefa!: Tarefa;
  @Input() isLoading: boolean = false;
  @Output() onConfirm = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();
  modal: NzModalService = inject(NzModalService);

  ngOnInit() {
    this.showConfirm();
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: `Excluir tarefa`,
      nzContent: `Você deseja excluir a tarefa <b>'${this.tarefa.titulo}'</b>?`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkLoading: this.isLoading,
      nzOkDanger: true,
      nzOnOk: () => this.onConfirm.emit(this.tarefa.id),
      nzCancelText: 'Não',
      nzOnCancel: () => this.onCancel.emit(),
    });
  }
}
