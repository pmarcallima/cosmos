package com.cosmos.api.chat;

import jakarta.validation.constraints.NotBlank;

public record ChatMessage(@NotBlank String channel, @NotBlank String body, @NotBlank String author) {}
