package com.example.healthinfochainwebserver.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EncryptedHealthDocumentId implements Serializable {
    @Column(nullable = false)
    private String patientWalletAddress;

    @Column(nullable = false)
    private String encryptedHealthDocumentHash;
}
