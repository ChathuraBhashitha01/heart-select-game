package com.api.Heart_Game_Api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.Heart_Game_Api.entity.User;

public interface UserRepo extends JpaRepository<User,String> {
    User getAllByUserName(String  userName);
}