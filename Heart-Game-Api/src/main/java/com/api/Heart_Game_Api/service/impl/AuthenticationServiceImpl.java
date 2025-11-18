package com.api.Heart_Game_Api.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.api.Heart_Game_Api.auth.request.SignInRequest;
import com.api.Heart_Game_Api.auth.request.SignUpRequest;
import com.api.Heart_Game_Api.auth.response.JwtAuthResponse;
import com.api.Heart_Game_Api.dto.UserDTO;
import com.api.Heart_Game_Api.entity.User;
import com.api.Heart_Game_Api.repository.UserRepo;
import com.api.Heart_Game_Api.service.AuthenticationService;
import com.api.Heart_Game_Api.service.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        if (!userRepo.existsById(signInRequest.getUserName())){
            throw new RuntimeException("User name not found");
        }

        User userByEmail = userRepo.getAllByUserName(signInRequest.getUserName());
        if (!passwordEncoder.matches(signInRequest.getPassword(), userByEmail.getPassword())){
           throw new RuntimeException("Incorrect password");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUserName(), signInRequest.getPassword()));
        User user = userRepo.findById(signInRequest.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String generatedToken = jwtService.generateToken(user);
        return JwtAuthResponse.builder()
                .token(generatedToken)
                .name(user.getName())
                .build();
    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
       UserDTO userDTO = UserDTO.builder()
                .name(signUpRequest.getName())
                .userName(signUpRequest.getUserName())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .build();
        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
        String generatedToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generatedToken).build();
    }
    
}
