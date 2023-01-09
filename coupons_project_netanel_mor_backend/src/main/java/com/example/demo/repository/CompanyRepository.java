package com.example.demo.repository;

import com.example.demo.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {



    public Company findByName (String name);

    public Company findByEmail (String email);

    @Query(value = "select * from companies where email = ?1 and password = ?2", nativeQuery = true)
    public Company findByEmailAndPassword(String email, String password);

}
