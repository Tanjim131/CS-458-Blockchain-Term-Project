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
    private EncryptedHealthDocumentId id;

    @Column(nullable = false)
    private String fileExtension;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String encryptedFileContent;

    @Lob
    @Column(nullable = false)
    private String encryptedKey;
}