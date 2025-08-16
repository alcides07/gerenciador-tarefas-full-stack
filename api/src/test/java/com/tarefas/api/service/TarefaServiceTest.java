package com.tarefas.api.service;

import com.tarefas.api.dto.tarefa.TarefaCreateDTO;
import com.tarefas.api.dto.tarefa.TarefaPartialUpdateDTO;
import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.model.Tarefa;
import com.tarefas.api.repository.TarefaRepository;
import com.tarefas.api.specification.Tarefa.TarefaFieldsFilter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    ResponsavelService responsavelService;

    @Mock
    TarefaRepository tarefaRepository;

    @Autowired
    @InjectMocks
    private TarefaService tarefaService;

    @Test
    @DisplayName("Lista todas as tarefas sem filtragem")
    void getAllTarefas() {
        Responsavel responsavel = new Responsavel(1, "joao", List.of());
        Tarefa tarefa1 = new Tarefa(1, "titulo1", "descricao1", TarefaPrioridadeEnum.MEDIA, TarefaSituacaoEnum.EM_ANDAMENTO, LocalDate.now(), responsavel);
        Tarefa tarefa2 = new Tarefa(2, "titulo2", "descricao2", TarefaPrioridadeEnum.ALTA, TarefaSituacaoEnum.EM_ANDAMENTO, LocalDate.now(), responsavel);

        TarefaFieldsFilter blankFilters = new TarefaFieldsFilter();
        List<Tarefa> todasTarefas = List.of(tarefa1, tarefa2);

        when(tarefaRepository.findAll(ArgumentMatchers.<Specification<Tarefa>>any()))
                .thenReturn(todasTarefas);

        List<Tarefa> resultado = tarefaService.getTarefas(blankFilters);

        verify(tarefaRepository, times(1)).findAll(ArgumentMatchers.<Specification<Tarefa>>any());
        assertEquals(2, resultado.size());
    }

    @Test
    @DisplayName("Encontra a tarefa com sucesso a partir do ID")
    void getTarefaById() {
        Responsavel responsavel = new Responsavel(1, "joao", List.of());
        Tarefa tarefaEsperada = new Tarefa(1, "titulo", "descricao", TarefaPrioridadeEnum.ALTA, TarefaSituacaoEnum.EM_ANDAMENTO, LocalDate.now(), responsavel);

        when(tarefaRepository.findById(1)).thenReturn(Optional.of(tarefaEsperada));

        Tarefa tarefaEncontrada = tarefaService.getTarefaById(1);

        verify(tarefaRepository, times(1)).findById(1);
        assertEquals(tarefaEsperada, tarefaEncontrada);
    }

    @Test
    @DisplayName("Cria uma tarefa com sucesso")
    void createTarefaSuccess() {
        Responsavel responsavel = new Responsavel(1, "joao", List.of());

        when(responsavelService.getResponsavelById(1)).thenReturn(responsavel);
        when(tarefaRepository.save(any(Tarefa.class))).thenAnswer(invocation ->
                invocation.getArgument(0));

        TarefaCreateDTO newTarefaDTO = new TarefaCreateDTO("titulo", "descricao", TarefaPrioridadeEnum.ALTA, LocalDate.now(), 1);
        Tarefa newTarefa = tarefaService.createTarefa(newTarefaDTO);

        verify(tarefaRepository, times(1)).save(any());
        assertThat(newTarefa.getResponsavel()).isEqualTo(responsavel);
        assertThat(newTarefa.getSituacao()).isEqualTo(TarefaSituacaoEnum.EM_ANDAMENTO);
    }

    @Test
    @DisplayName("Exclui uma tarefa com sucesso")
    void deleteTarefaSuccess() {
        Responsavel responsavel = new Responsavel(1, "joao", List.of());
        Tarefa tarefa = new Tarefa(1, "titulo", "descricao", TarefaPrioridadeEnum.ALTA, TarefaSituacaoEnum.EM_ANDAMENTO, LocalDate.now(), responsavel);

        when(tarefaRepository.findById(1)).thenReturn(Optional.of(tarefa));

        tarefaService.deleteTarefa(1);

        verify(tarefaRepository, times(1)).delete(tarefa);
    }

    @Test
    @DisplayName("Atualiza uma tarefa parcialmente com sucesso")
    void partialUpdateTarefa() {
        Integer tarefaId = 1;
        Responsavel responsavelAntigo = new Responsavel(1, "joao", List.of());
        Responsavel novoResponsavel = new Responsavel(2, "maria", List.of());

        Tarefa tarefaOriginal = new Tarefa(tarefaId, "tituloAntigo", "descricaoAntiga",
                TarefaPrioridadeEnum.MEDIA,
                TarefaSituacaoEnum.EM_ANDAMENTO,
                LocalDate.now(),
                responsavelAntigo
        );

        TarefaPartialUpdateDTO updateDTO = new TarefaPartialUpdateDTO(
                "tituloNovo",
                null,
                TarefaPrioridadeEnum.ALTA,
                null,
                LocalDate.now().plusDays(1),
                2
        );

        when(tarefaRepository.findById(tarefaId)).thenReturn(Optional.of(tarefaOriginal));
        when(responsavelService.getResponsavelById(2)).thenReturn(novoResponsavel);

        Tarefa tarefaAtualizada = tarefaService.partialUpdateTarefa(tarefaId, updateDTO);

        verify(tarefaRepository, times(1)).findById(tarefaId);
        verify(responsavelService, times(1)).getResponsavelById(2);

        // Atualizados
        assertEquals("tituloNovo", tarefaAtualizada.getTitulo());
        assertEquals(TarefaPrioridadeEnum.ALTA, tarefaAtualizada.getPrioridade());
        assertEquals(LocalDate.now().plusDays(1), tarefaAtualizada.getData());
        assertEquals(novoResponsavel, tarefaAtualizada.getResponsavel());

        // NÃO atualizados
        assertEquals("descricaoAntiga", tarefaAtualizada.getDescricao());
        assertEquals(TarefaSituacaoEnum.EM_ANDAMENTO, tarefaAtualizada.getSituacao());
    }
}