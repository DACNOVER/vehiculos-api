package api.rest.vehiculos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoVehiculo tipoVehiculo;

    @NotBlank
    @Pattern(
        regexp = "^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]$",
        message = "Formato de placa inválido"
    )
    private String placa;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoServicio tipoServicio;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Combustible combustible;

    @Min(1)
    private int capacidadPasajeros;

    @Pattern(
        regexp = "^#([A-Fa-f0-9]{6})$",
        message = "Color inválido"
    )
    private String color;

    @Min(1900)
    @Max(2100)
    private int modelo;

    @NotBlank
    private String marca;

    @NotBlank
    private String linea;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehiculoDocumento> documentos = new ArrayList<>();

    public Vehiculo() {
    }

    public Long getId() {
        return id;
    }

    public TipoVehiculo getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(TipoVehiculo tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public TipoServicio getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(TipoServicio tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public Combustible getCombustible() {
        return combustible;
    }

    public void setCombustible(Combustible combustible) {
        this.combustible = combustible;
    }

    public int getCapacidadPasajeros() {
        return capacidadPasajeros;
    }

    public void setCapacidadPasajeros(int capacidadPasajeros) {
        this.capacidadPasajeros = capacidadPasajeros;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getModelo() {
        return modelo;
    }

    public void setModelo(int modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getLinea() {
        return linea;
    }

    public void setLinea(String linea) {
        this.linea = linea;
    }

    public List<VehiculoDocumento> getDocumentos() {
        return documentos;
    }

    public void setDocumentos(List<VehiculoDocumento> documentos) {
        this.documentos = documentos;
    }

    public void addDocumento(VehiculoDocumento documento) {
        documentos.add(documento);
        documento.setVehiculo(this);
    }

    public void removeDocumento(VehiculoDocumento documento) {
        documentos.remove(documento);
        documento.setVehiculo(null);
    }

    public enum TipoVehiculo {
        AUTOMOVIL,
        MOTOCICLETA,
        CAMION
    }

    public enum TipoServicio {
        PUBLICO,
        PRIVADO,
        CARGA
    }

    public enum Combustible {
        GASOLINA,
        GAS,
        DIESEL,
        ELECTRICO,
        HIBRIDO
    }
}