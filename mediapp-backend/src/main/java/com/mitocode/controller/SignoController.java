package com.mitocode.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Signo;
import com.mitocode.service.ISignoService;


@RestController
@RequestMapping("/signos")
//@CrossOrigin()
public class SignoController {
	
	@Autowired
	private ISignoService service;
	
	@GetMapping
	public ResponseEntity<List<Signo>> listar(){
		 List<Signo> lista = service.listar();
		return new ResponseEntity<List<Signo>>(lista, HttpStatus.OK);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Signo> listarPorId(@PathVariable("id") Integer id){
		Signo signo = service.leerPorId(id);
		if(signo.getIdSigno() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<Signo>(signo, HttpStatus.OK); 
	}
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<Signo>> listarPageable(Pageable pageable) {
		Page<Signo> signo = service.listarPageable(pageable);
		return new ResponseEntity<Page<Signo>>(signo, HttpStatus.OK);
	}
	
	/*@GetMapping("/{id}")
	public Resource<Signo> listarPorId(@PathVariable("id") Integer id){
		Signo pac = service.leerPorId(id);
		if(pac.getIdSigno() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		//localhost:8080/Signos/{id}
		Resource<Signo> recurso = new Resource<Signo>(pac);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		recurso.add(linkTo.withRel("Signo-resource"));
		return recurso;
	
	}*/		
		
	
	/*@PostMapping
	public ResponseEntity<Signo> registrar(@Valid @RequestBody Signo Signo) {
		Signo pac = service.registrar(Signo);
		return new ResponseEntity<Signo>(pac, HttpStatus.CREATED);
	}*/
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Signo signo) {
		Signo sig = service.registrar(signo);
		//Signos/4
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(sig.getIdSigno()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@PutMapping
	public ResponseEntity<Signo> modificar(@Valid @RequestBody Signo signo) {
		Signo sig = service.modificar(signo);
		return new ResponseEntity<Signo>(sig, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
		Signo signo = service.leerPorId(id);
		if(signo.getIdSigno() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
