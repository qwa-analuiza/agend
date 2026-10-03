package br.com.orbia.DTOs.agendamento;

import jakarta.validation.constraints.NotNull;

public record AgendamentoRequestDTO(

        @NotNull
        Long clienteId,

        @NotNull
        Long servicoId,

        @NotNull
        Long horarioId,

        String observacao

) {
}
