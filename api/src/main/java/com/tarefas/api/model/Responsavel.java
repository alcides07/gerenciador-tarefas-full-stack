package com.tarefas.api.model;

import com.tarefas.api.dto.responsavel.ResponsavelCreateDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name="responsavel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Responsavel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nome", nullable = false)
    private String nome;

    @OneToMany(mappedBy="responsavel")
    private List<Tarefa> tarefas;

    public static Responsavel fromDTO(ResponsavelCreateDTO data) {
        Responsavel responsavel = new Responsavel();
        responsavel.setNome(data.nome());
        return responsavel;
    }
}
