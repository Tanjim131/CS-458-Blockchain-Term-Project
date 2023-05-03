package com.example.healthinfochainwebserver.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UploadFileResponse {
    private String healthDocumentHash;
    private String encryptedFileContent;
}
