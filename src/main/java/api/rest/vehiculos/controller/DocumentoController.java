package api.rest.vehiculos.controller;

import api.rest.vehiculos.entity.Documento;
import api.rest.vehiculos.service.DocumentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService service;

    @PostMapping
    public ResponseEntity<Documento> crear(@Valid @RequestBody Documento d) {
        Documento documento = service.guardar(d);
        return ResponseEntity.status(HttpStatus.CREATED).body(documento);
    }

    @GetMapping
    public ResponseEntity<List<Documento>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documento> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Documento> actualizar(@PathVariable Long id, @Valid @RequestBody Documento d) {
        try {
            Documento documento = service.actualizar(id, d);
            return ResponseEntity.ok(documento);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}