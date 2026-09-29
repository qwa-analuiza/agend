package br.com.orbia.Repositories;

import br.com.orbia.model.HorarioDisponivel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HorarioRepository extends JpaRepository<HorarioDisponivel, Long> {

    List<HorarioDisponivel> findByDataAndDisponivelTrue(LocalDate data);
}
