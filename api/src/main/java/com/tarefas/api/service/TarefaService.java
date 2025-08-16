package com.tarefas.api.service;

import com.tarefas.api.dto.tarefa.TarefaCreateDTO;
import com.tarefas.api.dto.tarefa.TarefaPartialUpdateDTO;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import com.tarefas.api.specification.Tarefa.TarefaFieldsFilter;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.model.Tarefa;
import com.tarefas.api.repository.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TarefaService {

    @Autowired
    TarefaRepository tarefaRepository;

    @Autowired
    ResponsavelService responsavelService;

    public List<Tarefa> getTarefas(TarefaFieldsFilter filters){
        return tarefaRepository.findAll(filters.toSpecification());
    }

    public Tarefa getTarefaById(Integer id){
        return tarefaRepository.findById(id)
                .orElseThrow((() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @Transactional
    public Tarefa createTarefa(TarefaCreateDTO data){
        Responsavel responsavel = responsavelService.getResponsavelById(data.responsavelId());

        Tarefa newTarefa = Tarefa.createFromDTO(data);
        newTarefa.setSituacao(TarefaSituacaoEnum.EM_ANDAMENTO);
        newTarefa.setResponsavel(responsavel);

        return tarefaRepository.save(newTarefa);
    }

    @Transactional
    public void deleteTarefa(Integer id){
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        tarefaRepository.delete(tarefa);
    }

    @Transactional
    public Tarefa partialUpdateTarefa(Integer id, TarefaPartialUpdateDTO data){
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (data.responsavelId() != null && !data.responsavelId().equals(tarefa.getResponsavel().getId())){
            Responsavel newResponsavelIntoTarefa = responsavelService.getResponsavelById(data.responsavelId());
            tarefa.setResponsavel(newResponsavelIntoTarefa);
        }

        if (data.titulo() != null){
            tarefa.setTitulo(data.titulo());
        }

        if (data.descricao() != null){
            tarefa.setDescricao(data.descricao());
        }

        if (data.prioridade() != null){
            tarefa.setPrioridade(data.prioridade());
        }

        if (data.situacao() != null){
            tarefa.setSituacao(data.situacao());
        }

        if (data.data() != null){
            tarefa.setData(data.data());
        }

        return tarefa;
    }
}
