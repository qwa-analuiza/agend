package br.com.orbia.model;

import br.com.orbia.enums.StatusAgendamento;
import jakarta.persistence.*;

@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;

    @OneToOne
    @JoinColumn(name = "horario_id", nullable = false)
    private HorarioDisponivel horario;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    private String observacao;

    public Agendamento() {
    }

    public Long getId() {
        return id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public HorarioDisponivel getHorario() {
        return horario;
    }

    public void setHorario(HorarioDisponivel horario) {
        this.horario = horario;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}