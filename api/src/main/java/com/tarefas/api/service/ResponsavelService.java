package com.tarefas.api.service;

import com.tarefas.api.dto.responsavel.ResponsavelCreateDTO;
import com.tarefas.api.model.Responsavel;
import com.tarefas.api.repository.ResponsavelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponsavelService {

    @Autowired
    ResponsavelRepository responsavelRepository;

    public List<Responsavel> getResponsaveis(){
        return responsavelRepository.findAll();
    }

    @Transactional
    public Responsavel createResponsavel(ResponsavelCreateDTO data){
        Responsavel newResponsavel = Responsavel.fromDTO(data);
        return responsavelRepository.save(newResponsavel);
    }
}
