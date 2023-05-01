package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import org.springframework.web.multipart.MultipartFile;

public interface EncryptedHealthDocumentService {
    EncryptedHealthDocument saveEncryptedFile(
            String patientWalletAddress,
            MultipartFile encryptedFile,
            String encryptedKey
    );

    String retrieveEncryptedFile(
            String patientWalletAddress,
            String patientPublicKey
    );
}
