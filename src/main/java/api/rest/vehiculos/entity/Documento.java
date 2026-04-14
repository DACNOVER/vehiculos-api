package api.rest.vehiculos.entity;

import jakarta.persistence.*;

@Entity
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String nombre;
    private String tipoVehiculoAplica;
    private String obligatorio;
    private String descripcion;

    public Documento() {}

    // getters y setters
    public Long getId() { return id; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipoVehiculoAplica() { return tipoVehiculoAplica; }
    public void setTipoVehiculoAplica(String tipoVehiculoAplica) { this.tipoVehiculoAplica = tipoVehiculoAplica; }

    public String getObligatorio() { return obligatorio; }
    public void setObligatorio(String obligatorio) { this.obligatorio = obligatorio; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}