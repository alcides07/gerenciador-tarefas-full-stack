package com.tarefas.api.enums;

import lombok.Getter;

@Getter
public enum TarefaPrioridadeEnum {
    ALTA("alta"),
    MEDIA("media"),
    BAIXA("baixa");

    private final String prioridade;

    TarefaPrioridadeEnum(String prioridade){
        this.prioridade = prioridade;
    }
}
