package br.com.orbia.DTOs.horario;


import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record HorarioRequestDTO(

        @NotNull
        LocalDate data,

        @NotNull
        LocalTime horaInicio,

        @NotNull
        LocalTime horaFim

) {
}