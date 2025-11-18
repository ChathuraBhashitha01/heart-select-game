package com.api.Heart_Game_Api.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.api.Heart_Game_Api.dto.UserDTO;

public interface UserService {
    UserDetailsService userDetailService();
    void Save(UserDTO userDTO);
}
