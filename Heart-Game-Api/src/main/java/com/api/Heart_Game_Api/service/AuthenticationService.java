package com.api.Heart_Game_Api.service;

import com.api.Heart_Game_Api.auth.request.SignInRequest;
import com.api.Heart_Game_Api.auth.request.SignUpRequest;
import com.api.Heart_Game_Api.auth.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
    JwtAuthResponse refreshToken(String refreshToken);
}
