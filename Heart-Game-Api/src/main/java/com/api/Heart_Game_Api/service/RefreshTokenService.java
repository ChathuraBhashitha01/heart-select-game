package com.api.Heart_Game_Api.service;

import java.util.Optional;

import com.api.Heart_Game_Api.entity.RefreshToken;
import com.api.Heart_Game_Api.entity.User;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(User user);
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
}
