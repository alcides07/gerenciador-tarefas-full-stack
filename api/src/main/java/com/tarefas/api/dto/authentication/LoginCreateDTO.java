package com.tarefas.api.dto.authentication;

import jakarta.validation.constraints.NotBlank;

public record LoginCreateDTO(
        @NotBlank
        String username,

        @NotBlank
        String password
) {}