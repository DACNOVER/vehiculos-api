package api.rest.vehiculos.controller;

import api.rest.vehiculos.entity.Vehiculo;
import api.rest.vehiculos.entity.VehiculoDocumento;
import api.rest.vehiculos.service.VehiculoService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehiculos")
public class VehiculoController {

    private final VehiculoService service;

    public VehiculoController(VehiculoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Vehiculo> crearVehiculo(@Valid @RequestBody Vehiculo dto) {
        try {
            Vehiculo vehiculo = service.guardar(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(vehiculo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Vehiculo>> listarVehiculos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizarVehiculo(@PathVariable Long id, @Valid @RequestBody Vehiculo dto) {
        try {
            Vehiculo vehiculo = service.actualizar(id, dto);
            return ResponseEntity.ok(vehiculo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVehiculo(@PathVariable Long id) {
        try {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/documentos")
    public ResponseEntity<Vehiculo> agregarDocumento(@PathVariable Long id, @Valid @RequestBody VehiculoDocumento vehiculoDocumento) {
        try {
            Vehiculo vehiculo = service.agregarDocumento(id, vehiculoDocumento);
            return ResponseEntity.ok(vehiculo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoints de búsqueda personalizados
    @GetMapping("/buscar/placa/{placa}")
    public ResponseEntity<Vehiculo> buscarPorPlaca(@PathVariable String placa) {
        return service.buscarPorPlaca(placa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar/tipo/{tipoVehiculo}")
    public ResponseEntity<List<Vehiculo>> buscarPorTipoVehiculo(@PathVariable String tipoVehiculo) {
        try {
            Vehiculo.TipoVehiculo tipo = Vehiculo.TipoVehiculo.valueOf(tipoVehiculo.toUpperCase());
            List<Vehiculo> vehiculos = service.buscarPorTipoVehiculo(tipo);
            return ResponseEntity.ok(vehiculos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buscar/documento/{nombreDocumento}")
    public ResponseEntity<List<Vehiculo>> buscarPorTipoDocumento(@PathVariable String nombreDocumento) {
        List<Vehiculo> vehiculos = service.buscarPorTipoDocumento(nombreDocumento);
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/buscar/estado/{estado}")
    public ResponseEntity<List<Vehiculo>> buscarPorEstadoDocumento(@PathVariable String estado) {
        List<Vehiculo> vehiculos = service.buscarPorEstadoDocumento(estado);
        return ResponseEntity.ok(vehiculos);
    }
}