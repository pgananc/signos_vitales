package com.mitocode.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Información del signos vitales")
@Entity
@Table(name = "signo_vital")
public class Signo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idSigno;
	
	@ApiModelProperty(notes = "Id de paciente")
//	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "idPaciente", nullable = false, foreignKey = @ForeignKey(name = "FK_signo_vital_paciente"))
	private Paciente paciente;

	private LocalDateTime fecha;

	@ApiModelProperty(notes = "Temperatura máximo 5 caracteres")
	@Size(min = 2, message = "Temperatura máximo 5 caracteres")
	@Column(name = "temperatura", nullable = false, length = 5)
	private String temperatura;

	@ApiModelProperty(notes = "Pulso máximo 5 caracteres")
	@Size(min = 2, message = "Temperatura máximo 5 caracteres")
	@Column(name = "pulso", nullable = false, length =5)
	private String pulso;
	@ApiModelProperty(notes = "Ritmo respiratorio máximo 5 caracteres")
	@Size(min = 2, message = "Temperatura máximo 5 caracteres")
	@Column(name = "ritmo_respiratorio", nullable = false, length = 5)
	private String ritmoRespiratorio;
	public Integer getIdSigno() {
		return idSigno;
	}
	public void setIdSigno(Integer idSigno) {
		this.idSigno = idSigno;
	}
	public Paciente getPaciente() {
		return paciente;
	}
	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}
	public LocalDateTime getFecha() {
		return fecha;
	}
	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}
	public String getTemperatura() {
		return temperatura;
	}
	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}
	public String getPulso() {
		return pulso;
	}
	public void setPulso(String pulso) {
		this.pulso = pulso;
	}
	public String getRitmoRespiratorio() {
		return ritmoRespiratorio;
	}
	public void setRitmoRespiratorio(String ritmoRespiratorio) {
		this.ritmoRespiratorio = ritmoRespiratorio;
	}
	
	

}
