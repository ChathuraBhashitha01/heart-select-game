package com.api.Heart_Game_Api.service;

import com.api.Heart_Game_Api.dto.ProfileDTO;

public interface ProfileService {
    ProfileDTO getProfile(String user_name,String game_type);
    void saveProfile(ProfileDTO profileDTO);
}
