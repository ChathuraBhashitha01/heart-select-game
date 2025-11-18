package com.api.Heart_Game_Api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.Heart_Game_Api.dto.ProfileDTO;
import com.api.Heart_Game_Api.service.ProfileService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/profile")
@CrossOrigin()
public class ProfileController {
    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping(value = "/{user}/{mode}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ProfileDTO getProfile(@PathVariable("user") String user_name,@PathVariable("mode") String game_type){
        return profileService.getProfile(user_name,game_type);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveProfile(@RequestBody ProfileDTO profileDTO){
        System.out.println("profileDTO"+profileDTO);
        profileService.saveProfile(profileDTO);
    }

}
