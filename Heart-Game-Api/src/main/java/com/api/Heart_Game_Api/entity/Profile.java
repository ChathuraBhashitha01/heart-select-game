package com.api.Heart_Game_Api.entity;

import com.api.Heart_Game_Api.util.Mode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int game_id;
    private String user_name;
    @Enumerated(EnumType.STRING)
    private Mode game_type;
    private double top_score;
}
