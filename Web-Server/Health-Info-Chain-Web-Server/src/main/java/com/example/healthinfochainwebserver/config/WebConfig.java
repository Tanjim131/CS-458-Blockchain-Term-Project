package com.example.healthinfochainwebserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // This allows CORS for all endpoints
                .allowedOrigins("*") // You can restrict this to specific domains if needed
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed request headers
                //.allowCredentials(true) // Allow cookies and other credentials
                .allowedHeaders("Access-Control-Allow-Origin")
                .maxAge(3600); // Max age for preflight requests (in seconds)
    }
}
