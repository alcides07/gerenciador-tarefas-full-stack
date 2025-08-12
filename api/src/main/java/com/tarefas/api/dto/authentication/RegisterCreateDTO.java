package com.tarefas.api.dto.authentication;

import jakarta.validation.constraints.NotBlank;

public record RegisterCreateDTO(
        @NotBlank
        String username,

        @NotBlank
        String password
) {
}