package com.example.healthinfochainwebserver.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaveEncryptedFileRequest {
    private String patientWalletAddress;
    private String patientPublicKey;
    private MultipartFile encryptedHealthDocument;
    private String encryptedKey;
    private String fileExtension;
}