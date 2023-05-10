package com.example.healthinfochainwebserver.controller;

import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.response.HealthDocumentResponse;
import com.example.healthinfochainwebserver.model.response.UploadFileResponse;
import com.example.healthinfochainwebserver.service.EncryptedHealthDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/api/v1")
public class EncryptedHealthDocumentController {
    private final EncryptedHealthDocumentService encryptedHealthDocumentService;

    @Autowired
    public EncryptedHealthDocumentController(EncryptedHealthDocumentService encryptedHealthDocumentService) {
        this.encryptedHealthDocumentService = encryptedHealthDocumentService;
    }

    @PostMapping(path="/file/upload")
    public ResponseEntity<UploadFileResponse> uploadFile(
            @ModelAttribute SaveEncryptedFileRequest saveEncryptedFileRequest
            ) {
        UploadFileResponse uploadFileResponse =
                encryptedHealthDocumentService.saveEncryptedFile(
                        saveEncryptedFileRequest
                );

        return new ResponseEntity<>(uploadFileResponse, HttpStatus.CREATED);
    }

    @PostMapping("/file/retrieve/")
    public ResponseEntity<HealthDocumentResponse> retrieveFile(
            @ModelAttribute RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
            ) {
        HealthDocumentResponse healthDocumentResponse =
                encryptedHealthDocumentService.retrieveEncryptedFile(
                        retrieveEncryptedFileRequest
                );

        return new ResponseEntity<>(healthDocumentResponse, HttpStatus.OK);
    }
}
