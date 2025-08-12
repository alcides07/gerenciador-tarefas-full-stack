package com.tarefas.api.dto.tarefa;

import com.tarefas.api.dto.responsavel.ResponsavelResponseDTO;
import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.model.Tarefa;

import java.time.LocalDate;

public record TarefaResponseDTO(
        Integer id,
        String titulo,
        String descricao,
        TarefaPrioridadeEnum prioridade,
        TarefaSituacaoEnum situacao,
        LocalDate data,
        ResponsavelResponseDTO responsavel
) {

    public static TarefaResponseDTO createFromEntity(Tarefa tarefa){
        return new TarefaResponseDTO(
                tarefa.getId(),
                tarefa.getTitulo(),
                tarefa.getDescricao(),
                tarefa.getPrioridade(),
                tarefa.getSituacao(),
                tarefa.getData(),
                ResponsavelResponseDTO.createFromEntity(tarefa.getResponsavel())
        );
    }
}
