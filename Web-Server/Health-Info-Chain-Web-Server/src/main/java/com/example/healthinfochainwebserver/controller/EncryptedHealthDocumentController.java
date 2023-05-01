package com.example.healthinfochainwebserver.controller;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.model.request.RetrieveEncryptedFileRequest;
import com.example.healthinfochainwebserver.model.request.SaveEncryptedFileRequest;
import com.example.healthinfochainwebserver.service.EncryptedHealthDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(path = "/api/v1")
public class EncryptedHealthDocumentController {
    private final EncryptedHealthDocumentService encryptedHealthDocumentService;

    @Autowired
    public EncryptedHealthDocumentController(EncryptedHealthDocumentService encryptedHealthDocumentService) {
        this.encryptedHealthDocumentService = encryptedHealthDocumentService;
    }

    @PostMapping(path="/file/upload")
    public ResponseEntity<EncryptedHealthDocument> uploadFile(
            @ModelAttribute SaveEncryptedFileRequest saveEncryptedFileRequest
            ) {
        EncryptedHealthDocument encryptedHealthDocument =
                encryptedHealthDocumentService.saveEncryptedFile(
                        saveEncryptedFileRequest
                );

        return new ResponseEntity<>(encryptedHealthDocument, HttpStatus.CREATED);
    }

    // This function assumes patient has only one medical record
    @PostMapping("/file/retrieve/")
    public ResponseEntity<EncryptedHealthDocument> retrieveFile(
            @ModelAttribute RetrieveEncryptedFileRequest retrieveEncryptedFileRequest
            ) {
        EncryptedHealthDocument encryptedHealthDocument =
                encryptedHealthDocumentService.retrieveEncryptedFile(
                        retrieveEncryptedFileRequest
                );

        return new ResponseEntity<>(encryptedHealthDocument, HttpStatus.OK);
    }
}
