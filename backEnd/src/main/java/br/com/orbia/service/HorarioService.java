package br.com.orbia.service;

import br.com.orbia.DTOs.horario.HorarioRequestDTO;
import br.com.orbia.DTOs.horario.HorarioResponseDTO;
import br.com.orbia.Repositories.HorarioRepository;
import br.com.orbia.exception.RecursoNaoEncontradoException;
import br.com.orbia.exception.RegraNegocioException;
import br.com.orbia.model.HorarioDisponivel;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HorarioService {

    private final HorarioRepository repository;

    public HorarioService(HorarioRepository repository) {
        this.repository = repository;
    }

    public HorarioResponseDTO cadastrar(HorarioRequestDTO dto) {

        if (!dto.horaInicio().isBefore(dto.horaFim())) {
            throw new RegraNegocioException(
                    "A hora de início deve ser menor que a hora de fim"
            );
        }

        HorarioDisponivel horario = new HorarioDisponivel();

        horario.setData(dto.data());
        horario.setHoraInicio(dto.horaInicio());
        horario.setHoraFim(dto.horaFim());

        return new HorarioResponseDTO(repository.save(horario));
    }

    public List<HorarioResponseDTO> listarDisponiveis(LocalDate data) {

        return repository.findByDataAndDisponivelTrue(data)
                .stream()
                .map(HorarioResponseDTO::new)
                .toList();
    }

    public HorarioDisponivel buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Horário não encontrado"
                        ));
    }
}