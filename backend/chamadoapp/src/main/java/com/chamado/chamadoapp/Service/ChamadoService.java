package com.chamado.chamadoapp.Service;

import com.chamado.chamadoapp.Model.Chamado;
import com.chamado.chamadoapp.Repository.ChamadoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChamadoService {

    private final ChamadoRepository chamadoRepository;

    public ChamadoService(ChamadoRepository chamadoRepository){
        this.chamadoRepository = chamadoRepository;
    }

    public Optional<Chamado> buscarPorId(Long id){
        return chamadoRepository.findById(id);
    }

    public Optional<Chamado> atualizarChamado(Long id, Chamado chamadoAtualizado){
        return chamadoRepository.findById(id).map( chamado -> {
            chamado.setTitulo(chamadoAtualizado.getTitulo());
            chamado.setDescricao(chamadoAtualizado.getDescricao());
            chamado.setStatus(chamadoAtualizado.getStatus());
            return chamadoRepository.save(chamado);
            }
        );
    }

    public boolean deletarChamado(Long id){
        return chamadoRepository.findById(id)
                .map(chamado -> {
                    chamadoRepository.delete(chamado);
                return true;
                })
                .orElse(false);
    }

    public List<Chamado> listarTodos() {
        return chamadoRepository.findAll();
    }

    public Chamado salvar(Chamado chamado) {
        chamado.setDataCriacao(LocalDateTime.now());
        return chamadoRepository.save(chamado);
    }
}
