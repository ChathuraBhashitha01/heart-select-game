package com.api.Heart_Game_Api.service.impl;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.api.Heart_Game_Api.dto.PuzzleDTO;
import com.api.Heart_Game_Api.service.GameService;

@Service
public class GameServiceImpl implements GameService{

    private static final String HEART_API_URL ="https://marcconrad.com/uob/heart/api.php?out=csv&base64=yes";
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public PuzzleDTO getNextPuzzle() {
        try {
            String response = restTemplate.getForObject(HEART_API_URL, String.class);
           
            @SuppressWarnings("null")
            String[] parts = response.split(",");

            if (parts.length < 3) {
                throw new RuntimeException("Invalid puzzle format from API");
            }

            String imageBase64 = parts[0].trim();
            int solution = Integer.parseInt(parts[1].trim());

            if (solution < 0 ) {
                throw new RuntimeException("Invalid solution value: " + solution);
            }
            return new PuzzleDTO(imageBase64, solution);

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch puzzle from Heart API");
        }
    }
}
