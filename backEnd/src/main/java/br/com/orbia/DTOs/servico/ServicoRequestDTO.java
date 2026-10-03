package br.com.orbia.DTOs.servico;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ServicoRequestDTO(

        @NotBlank
        String nome,

        String descricao,

        @NotNull
        BigDecimal preco,

        @NotNull
        Integer duracao

) {
}