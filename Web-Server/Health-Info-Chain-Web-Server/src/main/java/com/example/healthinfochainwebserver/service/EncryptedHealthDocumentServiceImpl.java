package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.entity.EncryptedHealthDocumentId;
import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import com.example.healthinfochainwebserver.repository.EncryptedHealthDocumentRepository;
import com.example.healthinfochainwebserver.util.ApplicationProperties;
import com.example.healthinfochainwebserver.util.PythonBridge;
import com.example.healthinfochainwebserver.util.Utility;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@Builder
@Component
public class EncryptedHealthDocumentServiceImpl implements EncryptedHealthDocumentService{
    private final EncryptedHealthDocumentRepository encryptedHealthDocumentRepository;
    private final ApplicationProperties applicationProperties;
    private final PythonBridge pythonBridge;

    @Autowired
    public EncryptedHealthDocumentServiceImpl(
            EncryptedHealthDocumentRepository encryptedHealthDocumentRepository,
            ApplicationProperties applicationProperties,
            PythonBridge pythonBridge) {
        this.encryptedHealthDocumentRepository = encryptedHealthDocumentRepository;
        this.applicationProperties = applicationProperties;
        this.pythonBridge = pythonBridge;
    }

    public EncryptedHealthDocument saveEncryptedFile(
            SaveEncryptedFileRequest saveEncryptedFileRequest
    ) {
        String decryptedKey =
                pythonBridge.decryptData(
                        saveEncryptedFileRequest.getEncryptedKey(),
                        applicationProperties.getPrivateKey(),
                        saveEncryptedFileRequest.getPatientPublicKey()
                );

        String decryptedPDF;
        try {
            decryptedPDF =
                    pythonBridge.decryptPDF(
                            new String(saveEncryptedFileRequest.getEncryptedHealthDocument().getBytes(), StandardCharsets.UTF_8),
                            decryptedKey
                    );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("Decrypted PDF = " + decryptedPDF);

        String fileHash =
                Utility.calculateMessageDigest(
                        decryptedPDF.getBytes(StandardCharsets.UTF_8)
                );

        System.out.println("File Hash = " + fileHash);

        EncryptedHealthDocumentId encryptedHealthDocumentId =
                EncryptedHealthDocumentId.builder()
                        .patientWalletAddress(saveEncryptedFileRequest.getPatientWalletAddress())
                        .healthDocumentHash(fileHash)
                        .build();

        EncryptedHealthDocument encryptedHealthDocument;

        try {
            encryptedHealthDocument = EncryptedHealthDocument.builder()
                    .encryptedHealthDocumentId(encryptedHealthDocumentId)
                    .encryptedFile(saveEncryptedFileRequest.getEncryptedHealthDocument().getBytes())
                    .encryptedKey(saveEncryptedFileRequest.getEncryptedKey())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return encryptedHealthDocumentRepository.save(encryptedHealthDocument);
    }

    public EncryptedHealthDocument retrieveEncryptedFile(
            RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
    ) {
        EncryptedHealthDocument encryptedHealthDocumentPatientSystem =
                encryptedHealthDocumentRepository
                        .findFirstByEncryptedHealthDocumentId_PatientWalletAddress(
                                retrieveEncryptedFileRequest.getPatientWalletAddress()
                        );

        String encryptedKeyPatientSystem =
                encryptedHealthDocumentPatientSystem.getEncryptedKey();

        String documentHash =
                encryptedHealthDocumentPatientSystem
                        .getEncryptedHealthDocumentId()
                        .getHealthDocumentHash();

        String decryptedKeyPatientSystem =
                pythonBridge.decryptData(
                        encryptedKeyPatientSystem,
                        applicationProperties.getPrivateKey(),
                        retrieveEncryptedFileRequest.getPatientPublicKey()
                );

        String decryptedPDF =
                pythonBridge.decryptPDF(
                        new String(
                                encryptedHealthDocumentPatientSystem.getEncryptedFile(),
                                StandardCharsets.UTF_8
                        ),
                        decryptedKeyPatientSystem
                );

        String encryptedPDFSystemPractitioner =
                pythonBridge.encryptPDF(
                        decryptedPDF,
                        applicationProperties.getSymmetricKey()
                );

        String encryptedKeySystemPractitioner =
                pythonBridge.encryptData(
                        applicationProperties.getSymmetricKey(),
                        applicationProperties.getPrivateKey(),
                        retrieveEncryptedFileRequest.getPractitionerPublicKey()
                );

        EncryptedHealthDocumentId encryptedHealthDocumentId =
                EncryptedHealthDocumentId
                        .builder()
                        .healthDocumentHash(documentHash)
                        .patientWalletAddress(retrieveEncryptedFileRequest.getPatientWalletAddress())
                        .build();

        EncryptedHealthDocument encryptedHealthDocumentPractitionerSystem =
                EncryptedHealthDocument
                        .builder()
                        .encryptedFile(encryptedPDFSystemPractitioner.getBytes(StandardCharsets.UTF_8))
                        .encryptedKey(encryptedKeySystemPractitioner)
                        .build();

        return encryptedHealthDocumentPractitionerSystem;
    }
}
