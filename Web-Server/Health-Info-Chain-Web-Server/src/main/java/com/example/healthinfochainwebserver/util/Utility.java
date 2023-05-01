package com.example.healthinfochainwebserver.util;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

public class Utility {
    public static String calculateMessageDigest(byte[] fileContent){
        String fileHash;
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] fileHashBytes = digest.digest(fileContent);
            HexFormat hex = HexFormat.of();
            fileHash = hex.formatHex(fileHashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return fileHash;
    }
}
