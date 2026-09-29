package br.com.orbia.DTOs.servico;

import br.com.orbia.model.Servico;

import java.math.BigDecimal;

public record ServicoResponseDTO(
        Long id,
        String nome,
        String descricao,
        BigDecimal preco,
        Integer duracao,
        boolean ativo
) {

    public ServicoResponseDTO(Servico servico) {
        this(
                servico.getId(),
                servico.getNome(),
                servico.getDescricao(),
                servico.getPreco(),
                servico.getDuracao(),
                servico.isAtivo()
        );
    }
}