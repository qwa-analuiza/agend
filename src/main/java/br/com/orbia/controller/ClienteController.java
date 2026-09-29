package br.com.orbia.controller;

import br.com.orbia.DTOs.cliente.ClienteRequestDTO;
import br.com.orbia.DTOs.cliente.ClienteResponseDTO;
import br.com.orbia.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponseDTO cadastrar(
            @RequestBody @Valid ClienteRequestDTO dto
    ) {
        return service.cadastrar(dto);
    }

    @GetMapping
    public List<ClienteResponseDTO> listar() {
        return service.listar();
    }
}
