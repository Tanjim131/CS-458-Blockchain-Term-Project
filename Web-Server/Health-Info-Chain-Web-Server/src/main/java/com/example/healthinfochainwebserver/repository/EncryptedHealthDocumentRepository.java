package com.example.healthinfochainwebserver.repository;

import com.example.healthinfochainwebserver.entity.EncryptedHealthDocument;
import com.example.healthinfochainwebserver.entity.EncryptedHealthDocumentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncryptedHealthDocumentRepository extends JpaRepository<EncryptedHealthDocument, EncryptedHealthDocumentId> {
    EncryptedHealthDocument findFirstById_PatientWalletAddress(String patientWalletAddress);
}
