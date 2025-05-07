package com.chamado.chamadoapp.Repository;

import com.chamado.chamadoapp.Model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
}
