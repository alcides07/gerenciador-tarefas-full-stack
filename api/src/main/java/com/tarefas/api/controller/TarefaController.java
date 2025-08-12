package com.tarefas.api.controller;

import com.tarefas.api.dto.tarefa.TarefaCreateDTO;
import com.tarefas.api.dto.tarefa.TarefaPartialUpdateDTO;
import com.tarefas.api.dto.tarefa.TarefaResponseDTO;
import com.tarefas.api.specification.Tarefa.TarefaFieldsFilter;
import com.tarefas.api.model.Tarefa;
import com.tarefas.api.service.TarefaService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/tarefas/")
public class TarefaController {

    @Autowired
    TarefaService tarefaService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<TarefaResponseDTO>> getTarefas(
            @ModelAttribute @Nullable TarefaFieldsFilter filters
    ){
        List<Tarefa> tarefas = tarefaService.getTarefas(filters);
        List<TarefaResponseDTO> tarefasResponseDTO = tarefas.stream().map(TarefaResponseDTO::createFromEntity).toList();
        return ResponseEntity.ok(tarefasResponseDTO);
    }

    @GetMapping("/{id}/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TarefaResponseDTO> getTarefaById(@PathVariable Integer id){
        Tarefa tarefa = tarefaService.getTarefaById(id);
        TarefaResponseDTO tarefaResponseDTO = TarefaResponseDTO.createFromEntity(tarefa);
        return ResponseEntity.ok(tarefaResponseDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TarefaResponseDTO> createTarefa(@Valid TarefaCreateDTO body){
        Tarefa newTarefa = tarefaService.createTarefa(body);
        TarefaResponseDTO newTarefaResponseDTO = TarefaResponseDTO.createFromEntity(newTarefa);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTarefaResponseDTO);
    }

    @DeleteMapping("/{id}/")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteTarefa(@PathVariable Integer id){
        tarefaService.deleteTarefa(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/")
    public ResponseEntity<TarefaResponseDTO> partialUpdateTarefa(@PathVariable Integer id, @Valid @RequestBody TarefaPartialUpdateDTO body){
        Tarefa tarefaUpdated = tarefaService.partialUpdateTarefa(id, body);
        TarefaResponseDTO tarefaUpdatedResponseDTO = TarefaResponseDTO.createFromEntity(tarefaUpdated);
        return ResponseEntity.status(HttpStatus.OK).body(tarefaUpdatedResponseDTO);
    }
}
