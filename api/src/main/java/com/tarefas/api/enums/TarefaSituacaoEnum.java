package com.tarefas.api.enums;

import lombok.Getter;

@Getter
public enum TarefaSituacaoEnum {
    EM_ANDAMENTO("emAndamento"),
    CONCLUIDA("concluida");

    private final String situacao;

    TarefaSituacaoEnum(String situacao){
        this.situacao = situacao;
    }
}
