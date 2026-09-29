package br.com.orbia.controller;


import br.com.orbia.DTOs.horario.HorarioRequestDTO;
import br.com.orbia.DTOs.horario.HorarioResponseDTO;
import br.com.orbia.service.HorarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioController {

    private final HorarioService service;

    public HorarioController(HorarioService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HorarioResponseDTO cadastrar(
            @RequestBody @Valid HorarioRequestDTO dto
    ) {
        return service.cadastrar(dto);
    }

    @GetMapping("/disponiveis")
    public List<HorarioResponseDTO> listarDisponiveis(
            @RequestParam LocalDate data
    ) {
        return service.listarDisponiveis(data);
    }
}