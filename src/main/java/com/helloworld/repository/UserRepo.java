package com.helloworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.User;
import java.util.*;

public interface UserRepo extends JpaRepository<User,Integer>{

    User findByEmail(String email);

    User findById(Long userId);


}
