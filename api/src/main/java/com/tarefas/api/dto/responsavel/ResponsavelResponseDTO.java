package com.tarefas.api.dto.responsavel;

import com.tarefas.api.model.Responsavel;

public record ResponsavelResponseDTO(
        Integer id,
        String nome
) {
    public static ResponsavelResponseDTO createFromEntity(Responsavel responsavel){
        return new ResponsavelResponseDTO(
                responsavel.getId(),
                responsavel.getNome()
        );
    }
}
