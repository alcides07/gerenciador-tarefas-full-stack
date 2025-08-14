import { Responsavel } from './responsavel';

export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA';
export type Situacao = 'EM_ANDAMENTO' | 'CONCLUIDA';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  situacao: Situacao;
  data: 'string';
  responsavel: Responsavel;
}

export interface TarefaRequest {
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  situacao: Situacao;
  data: 'string';
  responsavel_id: number;
}

export interface TarefaOptionalRequest {
  titulo?: string;
  descricao?: string;
  prioridade?: Prioridade;
  situacao?: Situacao;
  data?: 'string';
  responsavel_id?: number;
}
