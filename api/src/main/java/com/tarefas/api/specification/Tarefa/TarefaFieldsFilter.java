package com.tarefas.api.specification.Tarefa;

import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.model.Tarefa;
import static com.tarefas.api.specification.Tarefa.TarefaSpecification.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

@Data
public class TarefaFieldsFilter {
    @Nullable
    private Integer responsavelId;

    @Nullable
    private Integer tarefaId;

    @Nullable
    private String responsavelNome;

    @Nullable
    private TarefaPrioridadeEnum prioridade;

    @Nullable
    private TarefaSituacaoEnum situacao;

    @Nullable
    @Schema(
            description = "Termo de busca que será pesquisado no título OU descrição da tarefa (case-insensitive)"
    )
    private String search;

    public Specification<Tarefa> toSpecification(){
        return
            responsavelNomeContains(responsavelNome)
            .and(responsavelIdExact(responsavelId))
            .and(tarefaIdExact(tarefaId))
            .and(prioridadeExact(prioridade))
            .and(situacaoExact(situacao))
            .and(tituloDescricaoContains(search)
        );
    }
}
