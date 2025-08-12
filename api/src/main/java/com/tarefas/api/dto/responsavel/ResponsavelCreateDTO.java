package com.tarefas.api.dto.responsavel;

import jakarta.validation.constraints.NotBlank;

public record ResponsavelCreateDTO(
        @NotBlank
        String nome
) {
}
