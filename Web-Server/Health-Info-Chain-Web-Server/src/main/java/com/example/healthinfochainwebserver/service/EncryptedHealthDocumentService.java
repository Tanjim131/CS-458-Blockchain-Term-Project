package com.example.healthinfochainwebserver.service;

import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.response.HealthDocumentResponse;
import com.example.healthinfochainwebserver.model.response.UploadFileResponse;

public interface EncryptedHealthDocumentService {
    UploadFileResponse saveEncryptedFile(
            SaveEncryptedFileRequest saveEncryptedFileRequest
    );

    HealthDocumentResponse retrieveEncryptedFile(
            RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
    );
}
