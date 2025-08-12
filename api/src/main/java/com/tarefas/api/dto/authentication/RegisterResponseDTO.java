package com.tarefas.api.dto.authentication;

import com.tarefas.api.model.User;

public record RegisterResponseDTO(
        Integer id,
        String username
) {

    public static RegisterResponseDTO createFromEntity(User user){
        return new RegisterResponseDTO(
                user.getId(),
                user.getUsername()
        );
    }
}