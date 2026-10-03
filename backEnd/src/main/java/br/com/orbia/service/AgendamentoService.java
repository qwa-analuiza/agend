package br.com.orbia.service;

import br.com.orbia.DTOs.agendamento.AgendamentoRequestDTO;
import br.com.orbia.DTOs.agendamento.AgendamentoResponseDTO;
import br.com.orbia.enums.StatusAgendamento;
import br.com.orbia.exception.RegraNegocioException;
import br.com.orbia.exception.RecursoNaoEncontradoException;
import br.com.orbia.model.Agendamento;
import br.com.orbia.model.Cliente;
import br.com.orbia.model.HorarioDisponivel;
import br.com.orbia.model.Servico;
import br.com.orbia.Repositories.AgendamentoRepository;
import br.com.orbia.Repositories.ClienteRepository;
import br.com.orbia.Repositories.HorarioRepository;
import br.com.orbia.Repositories.ServicoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final ServicoRepository servicoRepository;
    private final HorarioRepository horarioRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            ServicoRepository servicoRepository,
            HorarioRepository horarioRepository
    ) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.servicoRepository = servicoRepository;
        this.horarioRepository = horarioRepository;
    }

    public AgendamentoResponseDTO agendar(AgendamentoRequestDTO dto) {

        Cliente cliente = clienteRepository.findById(dto.clienteId())
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Cliente não encontrada"
                        ));

        Servico servico = servicoRepository.findById(dto.servicoId())
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Serviço não encontrado"
                        ));

        HorarioDisponivel horario = horarioRepository.findById(dto.horarioId())
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Horário não encontrado"
                        ));

        if (!servico.isAtivo()) {
            throw new RegraNegocioException(
                    "Este serviço não está disponível"
            );
        }

        if (!horario.isDisponivel()) {
            throw new RegraNegocioException(
                    "Este horário já está ocupado"
            );
        }

        if (horario.getData().isBefore(LocalDate.now())) {
            throw new RegraNegocioException(
                    "Não é possível agendar em uma data passada"
            );
        }

        Agendamento agendamento = new Agendamento();

        agendamento.setCliente(cliente);
        agendamento.setServico(servico);
        agendamento.setHorario(horario);
        agendamento.setObservacao(dto.observacao());
        agendamento.setStatus(StatusAgendamento.AGENDADO);

        horario.setDisponivel(false);

        horarioRepository.save(horario);

        return new AgendamentoResponseDTO(
                agendamentoRepository.save(agendamento)
        );
    }

    public List<AgendamentoResponseDTO> listar() {

        return agendamentoRepository.findAll()
                .stream()
                .map(AgendamentoResponseDTO::new)
                .toList();
    }

    public void cancelar(Long id) {

        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Agendamento não encontrado"
                        ));

        if (agendamento.getStatus() == StatusAgendamento.CANCELADO) {
            throw new RegraNegocioException(
                    "Agendamento já está cancelado"
            );
        }

        agendamento.setStatus(StatusAgendamento.CANCELADO);

        HorarioDisponivel horario = agendamento.getHorario();

        horario.setDisponivel(true);

        horarioRepository.save(horario);
        agendamentoRepository.save(agendamento);
    }
}