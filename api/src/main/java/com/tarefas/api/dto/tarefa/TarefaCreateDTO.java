package com.tarefas.api.dto.tarefa;

import com.tarefas.api.enums.TarefaPrioridadeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TarefaCreateDTO(
    @NotBlank
    String titulo,

    @NotBlank
    String descricao,

    @NotNull
    TarefaPrioridadeEnum prioridade,

    @NotNull
    LocalDate data,

    @NotNull
    Integer responsavelId

) {
}
