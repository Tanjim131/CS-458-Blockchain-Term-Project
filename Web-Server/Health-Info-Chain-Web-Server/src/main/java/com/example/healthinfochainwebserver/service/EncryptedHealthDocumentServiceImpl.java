package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.entity.EncryptedHealthDocumentId;
import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.response.HealthDocumentResponse;
import com.example.healthinfochainwebserver.model.response.UploadFileResponse;
import com.example.healthinfochainwebserver.repository.EncryptedHealthDocumentRepository;
import com.example.healthinfochainwebserver.util.ApplicationProperties;
import com.example.healthinfochainwebserver.util.PythonBridge;
import com.example.healthinfochainwebserver.util.Utility;
import jakarta.transaction.Transactional;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

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

    @Transactional
    public UploadFileResponse saveEncryptedFile(
            SaveEncryptedFileRequest saveEncryptedFileRequest
    ) {
        String decryptedKey =
                pythonBridge.decryptData(
                        saveEncryptedFileRequest.getEncryptedKey(),
                        applicationProperties.getPrivateKey(),
                        saveEncryptedFileRequest.getPatientPublicKey()
                );

        byte[] decryptedFileByteArray;
        try {
            decryptedFileByteArray =
                    pythonBridge.decryptFile(
                            saveEncryptedFileRequest
                                    .getEncryptedHealthDocument()
                                    .getBytes(),
                            decryptedKey
                    );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String decryptedFileByteString = new String(decryptedFileByteArray, StandardCharsets.UTF_8);
        String withoutPrefixSuffix = decryptedFileByteString.substring(2, decryptedFileByteString.length() - 1);
        String decryptedFile = withoutPrefixSuffix.replace("\\r\\n", System.lineSeparator());

        String fileHash =
                Utility.calculateMessageDigest(
                        decryptedFile.getBytes(StandardCharsets.UTF_8)
                );

        System.out.println(decryptedFileByteString);

        EncryptedHealthDocumentId encryptedHealthDocumentId =
                EncryptedHealthDocumentId.builder()
                        .patientWalletAddress(saveEncryptedFileRequest.getPatientWalletAddress())
                        .healthDocumentHash(fileHash)
                        .build();

        EncryptedHealthDocument encryptedHealthDocument;

        try {
            encryptedHealthDocument = EncryptedHealthDocument.builder()
                    .id(encryptedHealthDocumentId)
                    .encryptedFileContent(
                            new String(
                                    saveEncryptedFileRequest
                                            .getEncryptedHealthDocument()
                                            .getBytes(),
                                    StandardCharsets.UTF_8
                            )
                    )
                    .encryptedKey(
                            new String(
                                    saveEncryptedFileRequest
                                            .getEncryptedKey()
                                            .getBytes(),
                                    StandardCharsets.UTF_8
                            )
                    )
                    .fileExtension(saveEncryptedFileRequest.getFileExtension())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        encryptedHealthDocumentRepository.save(encryptedHealthDocument);

        UploadFileResponse uploadFileResponse =
                UploadFileResponse
                        .builder()
                        .encryptedFileContent(
                                encryptedHealthDocument
                                        .getEncryptedFileContent()
                        )
                        .healthDocumentHash(fileHash)
                        .build();

        return uploadFileResponse;
    }

    public HealthDocumentResponse retrieveEncryptedFile(
            RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
    ) {
        EncryptedHealthDocument encryptedHealthDocumentPatientSystem =
                encryptedHealthDocumentRepository
                        .findFirstById_PatientWalletAddress(
                                retrieveEncryptedFileRequest.getPatientWalletAddress()
                        );

        String fileHash =
                encryptedHealthDocumentPatientSystem
                        .getId()
                        .getHealthDocumentHash();

        String decryptedKeyPatientSystem =
                pythonBridge.decryptData(
                        encryptedHealthDocumentPatientSystem.getEncryptedKey(),
                        applicationProperties.getPrivateKey(),
                        retrieveEncryptedFileRequest.getPatientPublicKey()
                );

        byte[] decryptedFileByteArray =
                pythonBridge.decryptFile(
                        encryptedHealthDocumentPatientSystem.getEncryptedFileContent().getBytes(),
                        decryptedKeyPatientSystem
                );

        String decryptedFileByteString = new String(decryptedFileByteArray, StandardCharsets.UTF_8);
        String decryptedWithoutPrefixSuffix = decryptedFileByteString.substring(2, decryptedFileByteString.length() - 1);
        String decryptedFile = decryptedWithoutPrefixSuffix.replace("\\r\\n", System.lineSeparator());

        String encryptedKeySystemPractitioner =
                pythonBridge.encryptData(
                        applicationProperties.getSymmetricKey(),
                        applicationProperties.getPrivateKey(),
                        retrieveEncryptedFileRequest.getPractitionerPublicKey()
                );

        byte[] encryptedFileSystemPractitionerByteArray =
                pythonBridge.encryptFile(
                        Utility.escapeString(decryptedFile),
                        applicationProperties.getSymmetricKey()
                );

        String encryptedFileSystemPractitionerByteString =
                new String(
                        encryptedFileSystemPractitionerByteArray,
                        StandardCharsets.UTF_8
                );

        String encryptedFileSystemPractitioner =
                encryptedFileSystemPractitionerByteString.substring(
                        2,
                        encryptedFileSystemPractitionerByteString.length() - 1
                );

        HealthDocumentResponse healthDocumentResponse =
                HealthDocumentResponse
                        .builder()
                        .encryptedHealthDocument(encryptedFileSystemPractitioner)
                        .encryptedKey(encryptedKeySystemPractitioner)
                        .fileHash(fileHash)
                        .fileExtension(encryptedHealthDocumentPatientSystem.getFileExtension())
                        .build();

        return healthDocumentResponse;
    }
}