package com.opstrack.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestConroller {

    @GetMapping("/test")
    public String test(){
        return "test_string";
    }
}
