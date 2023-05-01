package com.example.healthinfochainwebserver.controller;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.service.EncryptedHealthDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
            @RequestParam("patientWalletAddress") String _patientWalletAddress,
            @RequestParam("encryptedHealthDocument") MultipartFile _encryptedHealthDocument,
            @RequestParam("encryptedKey") String _encryptedKey
    ) {
        EncryptedHealthDocument encryptedHealthDocument =
                encryptedHealthDocumentService.saveEncryptedFile(
                        _patientWalletAddress,
                        _encryptedHealthDocument,
                        _encryptedKey
                );

        return new ResponseEntity<>(encryptedHealthDocument, HttpStatus.CREATED);
    }

    // This function assumes patient has only one medical record
    @PostMapping("/file/retrieve/")
    public ResponseEntity<String> retrieveFile(
            @RequestParam("walletAddress") String _walletAddress,
            @RequestParam("patientPublicKey") String _patientPublicKey
    ) {
        String decryptedKey =
                encryptedHealthDocumentService.retrieveEncryptedFile(
                        _walletAddress,
                        _patientPublicKey
                );
        return new ResponseEntity<>(decryptedKey, HttpStatus.OK);
    }
}
