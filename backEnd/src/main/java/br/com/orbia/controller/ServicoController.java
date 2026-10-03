package br.com.orbia.controller;

import br.com.orbia.DTOs.servico.ServicoRequestDTO;
import br.com.orbia.DTOs.servico.ServicoResponseDTO;
import br.com.orbia.service.ServicoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    private final ServicoService service;

    public ServicoController(ServicoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoResponseDTO cadastrar(
            @RequestBody @Valid ServicoRequestDTO dto
    ) {
        return service.cadastrar(dto);
    }

    @GetMapping
    public List<ServicoResponseDTO> listar() {
        return service.listarAtivos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void desativar(@PathVariable Long id) {
        service.desativar(id);
    }
}