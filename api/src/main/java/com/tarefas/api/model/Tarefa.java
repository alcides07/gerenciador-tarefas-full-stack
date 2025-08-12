package com.tarefas.api.model;
import com.tarefas.api.dto.tarefa.TarefaCreateDTO;
import com.tarefas.api.enums.TarefaPrioridadeEnum;
import com.tarefas.api.enums.TarefaSituacaoEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Table(name="tarefa")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="titulo", nullable = false)
    private String titulo;

    @Column(name="descricao", nullable = false)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name="prioridade", nullable = false)
    private TarefaPrioridadeEnum prioridade;

    @Enumerated(EnumType.STRING)
    @Column(name="situacao", nullable = false)
    private TarefaSituacaoEnum situacao;

    @Column(name="data", nullable = false)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name="responsavel_id", nullable=false)
    private Responsavel responsavel;

    public static Tarefa createFromDTO(TarefaCreateDTO data) {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(data.titulo());
        tarefa.setDescricao(data.descricao());
        tarefa.setSituacao(data.situacao());
        tarefa.setPrioridade(data.prioridade());
        tarefa.setData(data.data());
        return tarefa;
    }
}
