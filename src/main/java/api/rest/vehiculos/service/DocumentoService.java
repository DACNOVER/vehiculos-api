package api.rest.vehiculos.service;

import api.rest.vehiculos.entity.Documento;
import api.rest.vehiculos.repository.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Documento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Documento actualizar(Long id, Documento dto) {
        Documento documento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado con id: " + id));

        documento.setCodigo(dto.getCodigo());
        documento.setNombre(dto.getNombre());
        documento.setTipoVehiculoAplica(dto.getTipoVehiculoAplica());
        documento.setObligatorio(dto.getObligatorio());
        documento.setDescripcion(dto.getDescripcion());

        return repository.save(documento);
    }

    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Documento no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}