package com.api.Heart_Game_Api.service.impl;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.api.Heart_Game_Api.dto.UserDTO;
import com.api.Heart_Game_Api.entity.User;
import com.api.Heart_Game_Api.repository.UserRepo;
import com.api.Heart_Game_Api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepo userRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
     return  user_name -> userRepo.findById( user_name)
            .orElseThrow(() -> new
                    UsernameNotFoundException(
                    "user not found"));
    }

    @Override
    public void Save(UserDTO userDTO) {
        userRepo.save(mapper.map(userDTO, User.class));
    }
    
}
