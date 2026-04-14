package api.rest.vehiculos.service;

import api.rest.vehiculos.entity.Documento;
import api.rest.vehiculos.repository.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository repository;

    public Documento guardar(Documento d) {
        return repository.save(d);
    }

    public List<Documento> listar() {
        return repository.findAll();
    }
}