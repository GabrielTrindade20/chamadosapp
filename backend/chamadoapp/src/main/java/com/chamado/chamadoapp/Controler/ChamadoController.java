package com.chamado.chamadoapp.Controler;

import com.chamado.chamadoapp.Model.Chamado;
import com.chamado.chamadoapp.Service.ChamadoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/chamados")
public class ChamadoController {

    private final ChamadoService chamadoService;


    public ChamadoController(ChamadoService chamadoService) {
        this.chamadoService = chamadoService;
    }

    @GetMapping
    public List<Chamado> listarChamados(){
        return chamadoService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Chamado> criarChamado(@RequestBody Chamado chamado){
        Chamado novo = chamadoService.salvar(chamado);
        return new ResponseEntity<>(novo, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chamado> buscarPorId(@PathVariable Long id){
        return chamadoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chamado> atualizar(@PathVariable Long id, @RequestBody Chamado chamadoAtualizado ){
        return chamadoService.atualizarChamado(id, chamadoAtualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarChamado(@PathVariable Long id){
        boolean deletado = chamadoService.deletarChamado(id);

        if (deletado){
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.noContent().build();
        }
    }
}
