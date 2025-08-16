package com.tarefas.api.service;

import com.tarefas.api.dto.responsavel.ResponsavelCreateDTO;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.repository.ResponsavelRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResponsavelServiceTest {

    @Mock
    ResponsavelRepository responsavelRepository;

    @Autowired
    @InjectMocks
    private ResponsavelService responsavelService;

    @Test
    @DisplayName("Lista todos os responsáveis sem filtragem")
    void getResponsaveis() {
        Responsavel responsavel1 = new Responsavel(1, "joao", List.of());
        Responsavel responsavel2 = new Responsavel(2, "maria", List.of());

        List<Responsavel> todosResponsaveis = List.of(responsavel1, responsavel2);

        when(responsavelRepository.findAll()).thenReturn(todosResponsaveis);

        List<Responsavel> resultado = responsavelService.getResponsaveis();

        verify(responsavelRepository, times(1)).findAll();
        assertEquals(2, resultado.size());
    }

    @Test
    @DisplayName("Encontra o responsável com sucesso a partir do ID")
    void getResponsavelById() {
        Responsavel responsavelEsperado = new Responsavel(1, "joao", List.of());

        when(responsavelRepository.findById(1)).thenReturn(Optional.of(responsavelEsperado));

        Responsavel responsavelEncontrado = responsavelService.getResponsavelById(1);

        verify(responsavelRepository, times(1)).findById(1);
        assertEquals(responsavelEsperado, responsavelEncontrado);
    }

    @Test
    @DisplayName("Cria um responsável com sucesso")
    void createResponsavelSuccess() {
        when(responsavelRepository.save(any(Responsavel.class))).thenAnswer(invocation ->
                invocation.getArgument(0));

        ResponsavelCreateDTO newResponsavelDTO = new ResponsavelCreateDTO("joao");
        responsavelService.createResponsavel(newResponsavelDTO);

        verify(responsavelRepository, times(1)).save(any());
    }
}