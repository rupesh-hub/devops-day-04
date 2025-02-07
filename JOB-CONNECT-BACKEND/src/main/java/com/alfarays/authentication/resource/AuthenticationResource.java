package com.alfarays.authentication.resource;

import com.alfarays.authentication.model.AuthenticationRequest;
import com.alfarays.authentication.model.RegistrationRequest;
import com.alfarays.authentication.service.AuthenticationService;
import com.alfarays.util.GlobalResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/authentication")
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    public ResponseEntity<GlobalResponse<?>> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<GlobalResponse<?>> register(@RequestBody @Valid RegistrationRequest request) {
        return new ResponseEntity<>(authenticationService.register(request), HttpStatus.OK);
    }

}
