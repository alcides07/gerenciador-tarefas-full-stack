package com.tarefas.api.specification.Tarefa;

import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.model.Tarefa;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;

public class TarefaSpecification {
    public static Specification<Tarefa> responsavelIdExact(Integer id){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(id)){
                return null;
            }
            return builder.equal(root.join("responsavel").get("id"), id);
        };
    }

    public static Specification<Tarefa> tarefaIdExact(Integer tarefaId){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(tarefaId)){
                return null;
            }
            return builder.equal(root.get("id"), tarefaId);
        };
    }

    public static Specification<Tarefa> responsavelNomeContains(String nome){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(nome)){
                return null;
            }
            return builder.like(builder.lower(root.join("responsavel").get("nome")), "%" + nome.toLowerCase() + "%");
        };
    }

    public static Specification<Tarefa> prioridadeExact(TarefaPrioridadeEnum prioridade){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(prioridade)){
                return null;
            }
            return builder.equal(root.get("prioridade"), prioridade);
        };
    }

    public static Specification<Tarefa> situacaoExact(TarefaSituacaoEnum situacao){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(situacao)){
                return null;
            }
            return builder.equal(root.get("situacao"), situacao);
        };
    }

    public static Specification<Tarefa> tituloOrDescricaoContains(String search){
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(search)){
                return null;
            }
            return builder.or(
                    builder.like(builder.lower(root.get("titulo")), "%" + search.toLowerCase() + "%"),
                    builder.like(builder.lower(root.get("descricao")), "%" + search.toLowerCase() + "%")
            );
        };
    }
}
