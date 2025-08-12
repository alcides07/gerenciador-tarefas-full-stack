package com.tarefas.api.controller;

import com.tarefas.api.dto.authentication.LoginCreateDTO;
import com.tarefas.api.dto.authentication.LoginResponseDTO;
import com.tarefas.api.dto.authentication.RegisterCreateDTO;
import com.tarefas.api.dto.authentication.RegisterResponseDTO;
import com.tarefas.api.model.User;
import com.tarefas.api.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth/")
@Validated
public class AuthenticationController {

    @Autowired
    AuthenticationService authorizationService;

    @PostMapping("/login/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginCreateDTO body){
        String access = authorizationService.login(body);
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(access);
        return ResponseEntity.ok().body(loginResponseDTO);
    }

    @PostMapping("/register/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RegisterResponseDTO> register(@Valid @RequestBody RegisterCreateDTO body){
        User newUser = authorizationService.register(body);
        RegisterResponseDTO registerResponseDTO = RegisterResponseDTO.createFromEntity(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponseDTO);
    }
}
