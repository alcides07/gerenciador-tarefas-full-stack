package com.tarefas.api.dto.tarefa;

import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import jakarta.annotation.Nullable;

import java.time.LocalDate;

public record TarefaPartialUpdateDTO (
    @Nullable
    String titulo,

    @Nullable
    String descricao,

    @Nullable
    TarefaPrioridadeEnum prioridade,

    @Nullable
    TarefaSituacaoEnum situacao,

    @Nullable
    LocalDate data,

    @Nullable
    Integer responsavel_id
){}
