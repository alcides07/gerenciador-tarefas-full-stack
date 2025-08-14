import { Prioridade, Situacao } from '../models/tarefa';

export interface TarefaFilter {
  tarefaId?: number;
  responsavelId?: number;
  resonsavelNome?: string;
  prioridade?: Prioridade;
  situacao?: Situacao;
  search?: string;
}
