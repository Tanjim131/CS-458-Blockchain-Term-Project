package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.entity.EncryptedHealthDocumentId;
import com.example.healthinfochainwebserver.repository.EncryptedHealthDocumentRepository;
import com.example.healthinfochainwebserver.util.ApplicationProperties;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import static com.example.healthinfochainwebserver.util.ECDHCipher.*;

@Service
@Builder
@Component
public class EncryptedHealthDocumentServiceImpl implements EncryptedHealthDocumentService{
    private final EncryptedHealthDocumentRepository encryptedHealthDocumentRepository;
    private final ApplicationProperties applicationProperties;

    @Autowired
    public EncryptedHealthDocumentServiceImpl(
            EncryptedHealthDocumentRepository encryptedHealthDocumentRepository,
            ApplicationProperties applicationProperties
    ) {
        this.encryptedHealthDocumentRepository = encryptedHealthDocumentRepository;
        this.applicationProperties = applicationProperties;
    }

    public EncryptedHealthDocument saveEncryptedFile(
            String patientWalletAddress,
            MultipartFile encryptedFile,
            String encryptedKey
    ) {
        String encryptedFileHash;

        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] fileBytes = encryptedFile.getBytes();
            byte[] fileHashBytes = digest.digest(fileBytes);
            HexFormat hex = HexFormat.of();
            encryptedFileHash = hex.formatHex(fileHashBytes);
        } catch (NoSuchAlgorithmException | IOException e) {
            throw new RuntimeException(e);
        }

        EncryptedHealthDocumentId encryptedHealthDocumentId =
                EncryptedHealthDocumentId.builder()
                        .patientWalletAddress(patientWalletAddress)
                        .encryptedHealthDocumentHash(encryptedFileHash)
                        .build();

        EncryptedHealthDocument encryptedHealthDocument = null;

        try {
            encryptedHealthDocument = EncryptedHealthDocument.builder()
                    .encryptedHealthDocumentId(encryptedHealthDocumentId)
                    .encryptedFile(encryptedFile.getBytes())
                    .encryptedKey(encryptedKey)
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return encryptedHealthDocumentRepository.save(encryptedHealthDocument);
    }


    public String retrieveEncryptedFile(
            String patientWalletAddress,
            String patientPublicKey
    ) {
        EncryptedHealthDocument encryptedHealthDocument =
                encryptedHealthDocumentRepository
                        .findFirstByEncryptedHealthDocumentId_PatientWalletAddress(patientWalletAddress);

        String encryptedKey = encryptedHealthDocument.getEncryptedKey();
        System.out.println("Encrypted key from DB = " + encryptedKey);
        System.out.println("Patient public key = " + rawToUncompressedPublicKey(patientPublicKey));
        System.out.println("Server private key = " + applicationProperties.getPrivateKey());

        String decryptedKey =
                decryptData(
                        hexStringToByteArray(encryptedKey),
                        applicationProperties.getPrivateKey(),
                        rawToUncompressedPublicKey(patientPublicKey)
                );

        return decryptedKey;
    }
}
