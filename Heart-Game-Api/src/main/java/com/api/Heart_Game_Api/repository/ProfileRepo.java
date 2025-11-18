package com.api.Heart_Game_Api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.Heart_Game_Api.entity.Profile;

public interface ProfileRepo extends JpaRepository<Profile,Integer>{

    @Query(value = "SELECT * FROM profile WHERE user_name = :user_name AND game_type = :game_type", nativeQuery = true)
    Profile findByUserNameAndGameType(
        @Param("user_name") String user_name,
        @Param("game_type") String game_type
    );

    @Query(
        value = "SELECT COUNT(*) > 0 FROM profile WHERE user_name = :user_name AND game_type = :game_type",
        nativeQuery = true
    )
    boolean isExistUserNameAndGameType(
        @Param("user_name") String user_name,
        @Param("game_type") String game_type
    );

}
