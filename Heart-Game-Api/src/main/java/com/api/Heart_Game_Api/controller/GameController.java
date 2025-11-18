package com.api.Heart_Game_Api.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.api.Heart_Game_Api.dto.PuzzleDTO;
import com.api.Heart_Game_Api.service.GameService;

@RestController
@RequestMapping("/api/game")
@CrossOrigin()
public class GameController {

    private  GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public PuzzleDTO getHearts(){   
        return gameService.getNextPuzzle();
    }
}
