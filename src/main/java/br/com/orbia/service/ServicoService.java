package br.com.orbia.service;

import br.com.orbia.DTOs.servico.ServicoRequestDTO;
import br.com.orbia.DTOs.servico.ServicoResponseDTO;
import br.com.orbia.Repositories.ServicoRepository;
import br.com.orbia.model.Servico;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository repository;

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    public ServicoResponseDTO cadastrar(ServicoRequestDTO dto) {

        Servico servico = new Servico();

        servico.setNome(dto.nome());
        servico.setDescricao(dto.descricao());
        servico.setPreco(dto.preco());
        servico.setDuracao(dto.duracao());

        return new ServicoResponseDTO(repository.save(servico));
    }

    public List<ServicoResponseDTO> listarAtivos() {

        return repository.findByAtivoTrue()
                .stream()
                .map(ServicoResponseDTO::new)
                .toList();
    }

    public Servico buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Serviço não encontrado"));
    }

    public void desativar(Long id) {

        Servico servico = buscarPorId(id);

        servico.setAtivo(false);

        repository.save(servico);
    }
}
