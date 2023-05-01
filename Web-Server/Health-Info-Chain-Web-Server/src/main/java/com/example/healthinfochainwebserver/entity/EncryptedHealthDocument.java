package com.example.healthinfochainwebserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class EncryptedHealthDocument{
    @EmbeddedId
    private EncryptedHealthDocumentId encryptedHealthDocumentId;

    @Lob
    @Column(columnDefinition = "mediumblob", nullable = false)
    private byte[] encryptedFile;

    @Lob
    @Column(nullable = false)
    private String encryptedKey;
}