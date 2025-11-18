package com.api.Heart_Game_Api.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PuzzleDTO {

    private String imageBase64;
    private int solution;

}
