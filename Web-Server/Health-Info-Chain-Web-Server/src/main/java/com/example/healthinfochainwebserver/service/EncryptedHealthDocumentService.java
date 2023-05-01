package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import org.springframework.web.multipart.MultipartFile;

public interface EncryptedHealthDocumentService {
    EncryptedHealthDocument saveEncryptedFile(
            SaveEncryptedFileRequest saveEncryptedFileRequest
    );

    EncryptedHealthDocument retrieveEncryptedFile(
            RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
    );
}
