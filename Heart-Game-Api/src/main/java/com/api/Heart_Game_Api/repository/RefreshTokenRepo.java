package com.api.Heart_Game_Api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.Heart_Game_Api.entity.RefreshToken;
import com.api.Heart_Game_Api.entity.User;
import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
}
