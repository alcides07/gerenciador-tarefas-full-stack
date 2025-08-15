import { Component, inject, OnInit } from '@angular/core';
import { Tarefa } from '../../interfaces/models/tarefa';
import { TarefaService } from '../../services/tarefa/tarefa.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableComponent } from './components/table/table.component';
import { TarefaFilter } from '../../interfaces/filters/tarefa';
import { Responsavel } from '../../interfaces/models/responsavel';
import { ResponsavelService } from '../../services/responsavel/responsavel.service';
import { FiltersComponent } from './components/filters/filters.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ModalCreateTarefaComponent } from './components/modal-create-tarefa/modal-create-and-update-tarefa.component';
import { ModalCreateResponsavelComponent } from './components/modal-create-responsavel/modal-create-responsavel.component';

@Component({
  selector: 'app-home',
  imports: [
    TableComponent,
    FiltersComponent,
    NzButtonComponent,
    ModalCreateTarefaComponent,
    ModalCreateResponsavelComponent,
    ModalCreateResponsavelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tarefas: Tarefa[] = [];
  responsaveis: Responsavel[] = [];
  modalCreateTarefaIsVisible = false;
  modalCreateResponsavelVisible = false;
  currentFilters: TarefaFilter = {
    situacao: 'EM_ANDAMENTO',
  };

  private tarefaService: TarefaService = inject(TarefaService);
  private responsavelService: ResponsavelService = inject(ResponsavelService);
  private message = inject(NzMessageService);

  onFiltersChange(filters: TarefaFilter): void {
    this.currentFilters = filters;
    this.getTarefas(filters);
  }

  ngOnInit(): void {
    this.getTarefas(this.currentFilters);
    this.getResponsaveis();
  }

  getTarefas(params: TarefaFilter): void {
    this.tarefaService.getTarefas(params).subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
      },
      error: () => {
        this.message.create('error', 'Erro ao listar tarefas!');
      },
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

  showModalCreateTarefa(): void {
    this.modalCreateTarefaIsVisible = true;
  }

  showModalCreateResponsavel(): void {
    this.modalCreateResponsavelVisible = true;
  }

  loadTarefas(): void {
    this.getTarefas(this.currentFilters);
  }

  loadResponsaveis(): void {
    this.getResponsaveis();
  }
}
