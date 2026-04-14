package api.rest.vehiculos.controller;

import api.rest.vehiculos.entity.Vehiculo;
import api.rest.vehiculos.service.VehiculoService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehiculos")
public class VehiculoController {

    private final VehiculoService service;

    public VehiculoController(VehiculoService service) {
        this.service = service;
    }

    @PostMapping
    public Vehiculo crearVehiculo(@Valid @RequestBody Vehiculo dto) {
        return service.guardar(dto);
    }
}