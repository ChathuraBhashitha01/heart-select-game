package com.api.Heart_Game_Api.service.impl;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.api.Heart_Game_Api.entity.RefreshToken;
import com.api.Heart_Game_Api.entity.User;
import com.api.Heart_Game_Api.repository.RefreshTokenRepo;
import com.api.Heart_Game_Api.service.JwtService;
import com.api.Heart_Game_Api.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
   
    private final RefreshTokenRepo refreshTokenRepo;
    private final JwtService jwtService;

    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(jwtService.generateRefreshToken(user));
        refreshToken.setExpirationDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)); 

        return refreshTokenRepo.save(refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepo.findByToken(token);
    }

    @Override
    public void deleteByUser(User user) {
        refreshTokenRepo.deleteByUser(user);
    }
    
    
}
