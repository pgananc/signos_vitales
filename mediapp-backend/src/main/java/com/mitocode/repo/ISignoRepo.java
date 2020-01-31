package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Signo;

//@Repository
public interface ISignoRepo extends JpaRepository<Signo, Integer>{
	
}
