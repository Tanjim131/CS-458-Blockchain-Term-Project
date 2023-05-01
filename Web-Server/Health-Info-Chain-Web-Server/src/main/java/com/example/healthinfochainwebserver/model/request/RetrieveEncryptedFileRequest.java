package com.example.healthinfochainwebserver.model.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RetrieveEncryptedFileRequest {
    private String patientWalletAddress;
    private String patientPublicKey;
    private String practitionerPublicKey;
}
