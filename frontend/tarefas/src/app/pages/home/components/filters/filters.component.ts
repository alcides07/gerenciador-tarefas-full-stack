import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TarefaFilter } from '../../../../interfaces/filters/tarefa';
import { Prioridade, Situacao } from '../../../../interfaces/models/tarefa';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Responsavel } from '../../../../interfaces/models/responsavel';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-filters',
  imports: [
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() responsaveis: Responsavel[] = [];
  @Output() aplicarFiltros = new EventEmitter<TarefaFilter>();

  filtros: Partial<TarefaFilter> = {
    situacao: 'EM_ANDAMENTO',
  };
  prioridades: Prioridade[] = ['BAIXA', 'MEDIA', 'ALTA'];
  situacoes: Situacao[] = ['EM_ANDAMENTO', 'CONCLUIDA'];

  aplicar() {
    const validFiltros: TarefaFilter = {
      tarefaId: this.filtros.tarefaId || undefined,
      search: this.filtros.search || undefined,
      responsavelId: this.filtros.responsavelId || undefined,
      prioridade: this.filtros.prioridade || undefined,
      situacao: this.filtros.situacao || undefined,
    };
    this.aplicarFiltros.emit(validFiltros);
  }
}
