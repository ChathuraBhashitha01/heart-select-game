package com.api.Heart_Game_Api.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.api.Heart_Game_Api.auth.request.SignInRequest;
import com.api.Heart_Game_Api.auth.request.SignUpRequest;
import com.api.Heart_Game_Api.auth.response.JwtAuthResponse;
import com.api.Heart_Game_Api.dto.UserDTO;
import com.api.Heart_Game_Api.entity.RefreshToken;
import com.api.Heart_Game_Api.entity.User;
import com.api.Heart_Game_Api.repository.UserRepo;
import com.api.Heart_Game_Api.service.AuthenticationService;
import com.api.Heart_Game_Api.service.JwtService;
import com.api.Heart_Game_Api.service.RefreshTokenService;
import com.api.Heart_Game_Api.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        User user = userRepo.findById(signInRequest.getUserName())
            .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return JwtAuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken.getToken())
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

    String accessToken = jwtService.generateToken(savedUser);
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);

    return JwtAuthResponse.builder()
            .token(accessToken)
            .refreshToken(refreshToken.getToken())
            .build();
    }

    @Override
    public JwtAuthResponse refreshToken(String refreshToken){
         RefreshToken token = refreshTokenService.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));

        if (!jwtService.isRefreshTokenValid(token.getToken(),
                userService.userDetailService().loadUserByUsername(token.getUser().getUsername()))) {
            throw new RuntimeException("Refresh token is invalid or expired.");
        }

        String newAccessToken = jwtService.generateToken(token.getUser());
        return JwtAuthResponse.builder()
                .token(newAccessToken)
                .refreshToken(token.getToken())
                .build();
    }
    
}
