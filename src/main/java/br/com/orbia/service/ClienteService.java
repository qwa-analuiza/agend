package br.com.orbia.service;


import br.com.orbia.DTOs.cliente.ClienteRequestDTO;
import br.com.orbia.DTOs.cliente.ClienteResponseDTO;
import br.com.orbia.Repositories.ClienteRepository;
import br.com.orbia.model.Cliente;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public ClienteResponseDTO cadastrar(ClienteRequestDTO dto) {

        Cliente cliente = new Cliente(
                dto.nome(),
                dto.telefone(),
                dto.email()
        );

        return new ClienteResponseDTO(repository.save(cliente));
    }

    public List<ClienteResponseDTO> listar() {

        return repository.findAll()
                .stream()
                .map(ClienteResponseDTO::new)
                .toList();
    }
}