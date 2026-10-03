package br.com.orbia.DTOs.cliente;
import br.com.orbia.model.Cliente;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String telefone,
        String email
) {

    public ClienteResponseDTO(Cliente cliente) {
        this(
                cliente.getId(),
                cliente.getNome(),
                cliente.getTelefone(),
                cliente.getEmail()
        );
    }
}
