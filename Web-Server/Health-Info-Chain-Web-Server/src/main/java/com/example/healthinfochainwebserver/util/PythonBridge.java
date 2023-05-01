package com.example.healthinfochainwebserver.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Component
public class PythonBridge {
    private final ResourceLoader resourceLoader;

    @Autowired
    public PythonBridge(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    private String callEncryptDecryptData(String functionName, String data, String privateKeyHex, String publicKeyHex) {
        String pythonScriptName = "encrypt-decrypt-symmetric-key.py";
        Resource resource = resourceLoader.getResource("classpath:" + pythonScriptName);
        String scriptPath = null;
        try {
            scriptPath = resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ProcessBuilder pb = new ProcessBuilder(
                "python",
                scriptPath,
                functionName,
                data,
                privateKeyHex,
                publicKeyHex
        );
        pb.redirectErrorStream(true);
        Process process = null;
        try {
            process = pb.start();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
            String output = reader.readLine();
            process.waitFor();
            return output;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private String callEncryptDecryptPDF(String functionName, String fileContent, String key) {
        String pythonScriptName = "encrypt-decrypt-pdf.py";
        Resource resource = resourceLoader.getResource("classpath:" + pythonScriptName);
        String scriptPath = null;
        try {
            scriptPath = resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ProcessBuilder pb = new ProcessBuilder(
                "python",
                scriptPath,
                functionName,
                fileContent,
                key
        );

        pb.redirectErrorStream(true);
        Process process = null;
        try {
            process = pb.start();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
            String output = reader.readLine();
            process.waitFor();
            return output;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public String encryptPDF(String fileContent, String key){
        return callEncryptDecryptPDF(
                "encrypt_file",
                fileContent,
                key
        );
    }

    public String decryptPDF(String fileContent, String key){
        return callEncryptDecryptPDF(
                "decrypt_file",
                fileContent,
                key
        );
    }

    public String encryptData(String data, String privateKeyHex, String publicKeyHex){
        return callEncryptDecryptData(
                "encrypt_data",
                data,
                privateKeyHex,
                publicKeyHex
        );
    }

    public String decryptData(String data, String privateKeyHex, String publicKeyHex){
        return callEncryptDecryptData(
                "decrypt_data",
                data,
                privateKeyHex,
                publicKeyHex
        );
    }
}
