package br.com.orbia.controller;

import br.com.orbia.DTOs.agendamento.AgendamentoRequestDTO;
import br.com.orbia.DTOs.agendamento.AgendamentoResponseDTO;
import br.com.orbia.service.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService service;

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AgendamentoResponseDTO agendar(
            @RequestBody @Valid AgendamentoRequestDTO dto
    ) {
        return service.agendar(dto);
    }

    @GetMapping
    public List<AgendamentoResponseDTO> listar() {
        return service.listar();
    }

    @PatchMapping("/{id}/cancelar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelar(@PathVariable Long id) {
        service.cancelar(id);
    }
}