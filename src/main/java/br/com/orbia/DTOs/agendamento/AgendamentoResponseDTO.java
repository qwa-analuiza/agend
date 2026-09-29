package br.com.orbia.DTOs.agendamento;

import br.com.orbia.model.Agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResponseDTO(

        Long id,
        String cliente,
        String servico,
        LocalDate data,
        LocalTime horaInicio,
        LocalTime horaFim,
        String status,
        String observacao

) {

    public AgendamentoResponseDTO(Agendamento agendamento) {
        this(
                agendamento.getId(),
                agendamento.getCliente().getNome(),
                agendamento.getServico().getNome(),
                agendamento.getHorario().getData(),
                agendamento.getHorario().getHoraInicio(),
                agendamento.getHorario().getHoraFim(),
                agendamento.getStatus().name(),
                agendamento.getObservacao()
        );
    }
}
