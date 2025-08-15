import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Tarefa } from '../../../../interfaces/models/tarefa';

@Component({
  selector: 'app-modal-complete-tarefa',
  templateUrl: './modal-complete-tarefa.component.html',
  styleUrl: './modal-complete-tarefa.component.css',
})
export class ModalCompleteTarefaComponent {
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
      nzTitle: `Concluir tarefa`,
      nzContent: `Você deseja concluir a tarefa <b>'${this.tarefa.titulo}'</b>?`,
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
