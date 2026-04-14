package api.rest.vehiculos.controller;

import api.rest.vehiculos.entity.Documento;
import api.rest.vehiculos.service.DocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService service;

    @PostMapping
    public Documento crear(@RequestBody Documento d) {
        return service.guardar(d);
    }

    @GetMapping
    public List<Documento> listar() {
        return service.listar();
    }
}