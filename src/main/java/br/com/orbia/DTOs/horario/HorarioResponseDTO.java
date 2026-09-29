package br.com.orbia.DTOs.horario;

import br.com.orbia.model.HorarioDisponivel;

import java.time.LocalDate;
import java.time.LocalTime;

public record HorarioResponseDTO(
        Long id,
        LocalDate data,
        LocalTime horaInicio,
        LocalTime horaFim,
        boolean disponivel
) {

    public HorarioResponseDTO(HorarioDisponivel horario) {
        this(
                horario.getId(),
                horario.getData(),
                horario.getHoraInicio(),
                horario.getHoraFim(),
                horario.isDisponivel()
        );
    }
}
