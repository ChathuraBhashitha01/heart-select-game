package com.api.Heart_Game_Api.dto;

import com.api.Heart_Game_Api.util.Mode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {

    private int game_id;
    private String user_name;
    private String game_type;
    private double top_score;
   
}
