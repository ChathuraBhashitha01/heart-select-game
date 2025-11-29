package com.api.Heart_Game_Api.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.api.Heart_Game_Api.dto.ProfileDTO;
import com.api.Heart_Game_Api.entity.Profile;
import com.api.Heart_Game_Api.repository.ProfileRepo;
import com.api.Heart_Game_Api.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService{
    private ModelMapper modelMapper;
    private ProfileRepo profileRepo;

    public ProfileServiceImpl(ModelMapper modelMapper, ProfileRepo profileRepo) {
        this.modelMapper = modelMapper;
        this.profileRepo = profileRepo;
    }

    @Override
    public ProfileDTO getProfile(String user_name,String game_type) {
       return modelMapper.map(profileRepo.findByUserNameAndGameType(user_name,game_type),ProfileDTO.class);
    }

    @Override
    public void saveProfile(ProfileDTO profileDTO) {

        Profile existingProfile = profileRepo.findByUserNameAndGameType(
            profileDTO.getUser_name(), 
            profileDTO.getGame_type()
        );

        if(existingProfile != null) {
            if(profileDTO.getTop_score() > existingProfile.getTop_score()) {
                existingProfile.setTop_score(profileDTO.getTop_score());
                profileRepo.save(existingProfile);
            }
        } else {
            profileRepo.save(modelMapper.map(profileDTO, Profile.class));
        }
    }

}
