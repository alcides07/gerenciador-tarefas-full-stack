package com.tarefas.api.repository;

import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.model.Tarefa;
import com.tarefas.api.specification.Tarefa.TarefaSpecification;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class TarefaRepositoryTest {
    @Autowired
    EntityManager entityManager;

    @Autowired
    TarefaRepository tarefaRepository;

    private Responsavel responsavel1, responsavel2;
    private Tarefa tarefa1, tarefa2, tarefa3;

    @BeforeEach
    void setUp() {
        responsavel1 = new Responsavel(null, "João Silva", List.of());
        responsavel2 = new Responsavel(null, "Maria Guedes", List.of());
        this.entityManager.persist(responsavel1);
        this.entityManager.persist(responsavel2);

        tarefa1 = new Tarefa(null, "Implementar API", "Implementar endpoints da API",
                TarefaPrioridadeEnum.ALTA, TarefaSituacaoEnum.EM_ANDAMENTO,
                LocalDate.now(), responsavel1
        );

        tarefa2 = new Tarefa(null, "Criar testes", "Criar testes unitários",
                TarefaPrioridadeEnum.MEDIA, TarefaSituacaoEnum.EM_ANDAMENTO,
                LocalDate.now(), responsavel1
        );

        tarefa3 = new Tarefa(null, "Documentar projeto", "Escrever documentação Swagger para a api",
                TarefaPrioridadeEnum.BAIXA, TarefaSituacaoEnum.CONCLUIDA,
                LocalDate.now(), responsavel2
        );

        this.entityManager.persist(tarefa1);
        this.entityManager.persist(tarefa2);
        this.entityManager.persist(tarefa3);
    }

    @Test
    void filterByResponsavelIdExact() {
        Specification<Tarefa> spec = TarefaSpecification.responsavelIdExact(responsavel1.getId());

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(2, resultado.size());
    }

    @Test
    void filterByTarefaIdExact() {
        Specification<Tarefa> spec = TarefaSpecification.tarefaIdExact(tarefa1.getId());

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(1, resultado.size());
    }

    @Test
    void filterByResponsavelNomeContains() {
        Specification<Tarefa> spec = TarefaSpecification.responsavelNomeContains("edes");

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(1, resultado.size());
    }

    @Test
    void filterByPrioridadeExact() {
        Specification<Tarefa> spec = TarefaSpecification.prioridadeExact(TarefaPrioridadeEnum.ALTA);

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(1, resultado.size());
    }

    @Test
    void filterBySituacaoExact() {
        Specification<Tarefa> spec = TarefaSpecification.situacaoExact(TarefaSituacaoEnum.CONCLUIDA);

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(1, resultado.size());
    }

    @Test
    void tituloOrDescricaoContains() {
        Specification<Tarefa> spec = TarefaSpecification.tituloOrDescricaoContains("api");

        List<Tarefa> resultado = tarefaRepository.findAll(spec);

        assertEquals(2, resultado.size());
    }

}