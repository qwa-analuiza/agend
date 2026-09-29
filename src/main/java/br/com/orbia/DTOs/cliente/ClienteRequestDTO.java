package br.com.orbia.DTOs.cliente;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRequestDTO(

        @NotBlank
        String nome,

        @NotBlank
        String telefone,

        @Email
        String email

) {
}
