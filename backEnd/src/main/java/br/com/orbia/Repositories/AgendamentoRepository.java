package br.com.orbia.Repositories;


import br.com.orbia.enums.StatusAgendamento;
import br.com.orbia.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento> findByStatus(StatusAgendamento status);
}