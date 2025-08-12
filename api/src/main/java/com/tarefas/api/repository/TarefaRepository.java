package com.tarefas.api.repository;

import com.tarefas.api.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TarefaRepository extends JpaRepository<Tarefa, Integer>, JpaSpecificationExecutor<Tarefa> {
}
