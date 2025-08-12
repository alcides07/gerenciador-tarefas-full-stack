package com.tarefas.api.controller;
import com.tarefas.api.dto.responsavel.ResponsavelCreateDTO;
import com.tarefas.api.dto.responsavel.ResponsavelResponseDTO;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.service.ResponsavelService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("api/responsaveis/")
@SecurityRequirement(name = "bearer-key")
public class ResponsavelController {

    @Autowired
    ResponsavelService responsavelService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ResponsavelResponseDTO>> getResponsaveis(){
        List<Responsavel> responsaveis = responsavelService.getResponsaveis();
        List<ResponsavelResponseDTO> responsaveisResponseDTO = responsaveis.stream().map(ResponsavelResponseDTO::createFromEntity).toList();
        return ResponseEntity.ok(responsaveisResponseDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponsavelResponseDTO> createResponsavel(@Valid ResponsavelCreateDTO body){
        Responsavel newResponsavel = responsavelService.createResponsavel(body);
        ResponsavelResponseDTO newResponsavelResponseDTO = ResponsavelResponseDTO.createFromEntity(newResponsavel);
        return ResponseEntity.status(HttpStatus.CREATED).body(newResponsavelResponseDTO);
    }
}
