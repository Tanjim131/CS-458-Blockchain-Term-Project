package com.example.healthinfochainwebserver.util;

import com.google.crypto.tink.subtle.Hex;
import org.bouncycastle.crypto.agreement.ECDHBasicAgreement;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECNamedCurveSpec;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.ECPoint;
import java.security.spec.ECPrivateKeySpec;
import java.security.spec.ECPublicKeySpec;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;

public class ECDHCipher {

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    public static String rawToUncompressedPublicKey(String rawPublicKeyHex) {
        String x = rawPublicKeyHex.substring(0, 64);
        String y = rawPublicKeyHex.substring(64);
        return "04" + x + y;
    }

    private static ECNamedCurveSpec getCurveSpec(String curveName) {
        ECNamedCurveParameterSpec curveParameterSpec = ECNamedCurveTable.getParameterSpec(curveName);
        return new ECNamedCurveSpec(
                curveName,
                curveParameterSpec.getCurve(),
                curveParameterSpec.getG(),
                curveParameterSpec.getN(),
                curveParameterSpec.getH(),
                curveParameterSpec.getSeed()
        );
    }

    private static String test() {
        String privateKeyHex = "5bd4c34b8514a63c09a96ce5fe8abedff5599f2eae6bd88d48abf61af291cb5b";
        String publicKeyHex = "b96d2080971f09405ee4c5a003c87eeb1f1538e363ac7260047879b9b8ddfb3cca0e12294fb8a903ee811add63fcb51718cd2330bfcf46b0fcde47d90d0c4f8c";

        ECNamedCurveParameterSpec ecParameterSpec = ECNamedCurveTable.getParameterSpec("secp256k1");
        ECDomainParameters ecDomainParameters = new ECDomainParameters(ecParameterSpec.getCurve(), ecParameterSpec.getG(), ecParameterSpec.getN());

        BigInteger privateKeyInt = new BigInteger(privateKeyHex, 16);

        byte[] publicKeyBytes = hexStringToByteArray("04" + publicKeyHex);

        org.bouncycastle.math.ec.ECPoint pointQ = ecParameterSpec.getCurve().decodePoint(publicKeyBytes);
        ECPrivateKeySpec privateKeySpec = new ECPrivateKeySpec(privateKeyInt, new ECNamedCurveSpec("secp256k1", ecParameterSpec.getCurve(), ecParameterSpec.getG(), ecParameterSpec.getN()));
        ECPublicKeySpec publicKeySpec = new ECPublicKeySpec(new java.security.spec.ECPoint(pointQ.getAffineXCoord().toBigInteger(), pointQ.getAffineYCoord().toBigInteger()), new ECNamedCurveSpec("secp256k1", ecParameterSpec.getCurve(), ecParameterSpec.getG(), ecParameterSpec.getN()));

        try {
            KeyFactory keyFactory = KeyFactory.getInstance("ECDH", "BC");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (NoSuchProviderException e) {
            throw new RuntimeException(e);
        }

        ECDHBasicAgreement ecdhBasicAgreement = new ECDHBasicAgreement();
        ecdhBasicAgreement.init(new ECPrivateKeyParameters(privateKeySpec.getS(), ecDomainParameters));
        BigInteger sharedSecret = ecdhBasicAgreement.calculateAgreement(new ECPublicKeyParameters(pointQ, ecDomainParameters));

        return sharedSecret.toString(16);
    }

    private static byte[] computeSharedSecret(PrivateKey privateKey, PublicKey publicKey) {
        ECDHBasicAgreement ecdhBasicAgreement = new ECDHBasicAgreement();
        ECNamedCurveParameterSpec spec = ECNamedCurveTable.getParameterSpec("secp256k1");
        ECDomainParameters domainParams = new ECDomainParameters(spec.getCurve(), spec.getG(), spec.getN(), spec.getH(), spec.getSeed());

        ECPrivateKey ecPrivateKey = (ECPrivateKey) privateKey;
        ECPublicKey ecPublicKey = (ECPublicKey) publicKey;

        ECPrivateKeyParameters privateKeyParameters = new ECPrivateKeyParameters(ecPrivateKey.getS(), domainParams);

        java.security.spec.ECPoint javaEcPoint = ecPublicKey.getW();
        org.bouncycastle.math.ec.ECPoint bcECPoint = spec.getCurve().createPoint(javaEcPoint.getAffineX(), javaEcPoint.getAffineY());
        ECPublicKeyParameters publicKeyParameters = new ECPublicKeyParameters(bcECPoint, domainParams);

        ecdhBasicAgreement.init(privateKeyParameters);
        BigInteger sharedSecretBigInt = ecdhBasicAgreement.calculateAgreement(publicKeyParameters);

        return sharedSecretBigInt.toByteArray();
    }

    private static byte[] hashSha256(byte[] data) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(data);
            return md.digest();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static byte[] decryptWithAES(byte[] encryptedData, byte[] decryptionKey, byte[] iv) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(decryptionKey, "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
        return cipher.doFinal(encryptedData);
    }

    private static String printByteArray(byte[] byteArray){
        StringBuilder sb = new StringBuilder();
        sb.append("b'");
        for (byte b : byteArray) {
            sb.append(String.format("\\x%02x", b));
        }
        sb.append("'");

        return sb.toString();
    }

    private static String toHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }

    public static String decryptData(byte[] encryptedData, String privateKeyHex, String publicKeyHex) {
        try {
            System.out.println("Inside Decrypt Data");
            System.out.println("Encrypted data = " + printByteArray(encryptedData));

            ECNamedCurveSpec params = getCurveSpec("secp256k1");

            PrivateKey privateKeyA = getPrivateKeyFromHex(privateKeyHex, params);
            PublicKey publicKeyB = getPublicKeyFromHex(publicKeyHex, params);

//            System.out.println("Private Key Hex (Provided) = " + privateKeyHex);
//            System.out.println("Public Key B = " + Hex.encode(publicKeyB.getEncoded()));
//            System.out.println("Public Key Hex (Provided) = " + publicKeyHex);
//            System.out.println("Public Key (Calculated) = " + rawToEncodedECPublicKey(publicKeyHex.substring(2).getBytes(), params));

            System.out.println("Test = " + test());

            //byte[] sharedSecret = hexStringToByteArray("b1b7b7953a464f86b3a939e55c58e19edc0bc10088155dd2d751f34c16c37c27"); //computeSharedSecret(privateKeyA, publicKeyB);
            byte[] sharedSecret = computeSharedSecret(privateKeyA, publicKeyB);

            System.out.println("Shared secret: " + Hex.encode(sharedSecret));

            byte[] derivedKey = hashSha256(sharedSecret);
            byte[] decryptionKey = Arrays.copyOfRange(derivedKey, 0, 16);
            byte[] iv = Arrays.copyOfRange(derivedKey, 16, 32);

            System.out.println("Derived key: " + Arrays.toString(derivedKey));
            System.out.println("Decryption key: " + Arrays.toString(decryptionKey));
            System.out.println("IV: " + Arrays.toString(iv));

            byte[] decryptedData = decryptWithAES(encryptedData, decryptionKey, iv);
            return new String(decryptedData, StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static PrivateKey getPrivateKeyFromHex(String privateKeyHex, ECNamedCurveSpec params) throws NoSuchAlgorithmException, InvalidKeySpecException {
        BigInteger privateKeyValue = new BigInteger(privateKeyHex, 16);
        ECPrivateKeySpec privateKeySpec = new ECPrivateKeySpec(privateKeyValue, params);
        KeyFactory kf = KeyFactory.getInstance("EC");
        return kf.generatePrivate(privateKeySpec);
    }

    public static PublicKey getPublicKeyFromHex(String publicKeyHex, ECNamedCurveSpec params) throws NoSuchAlgorithmException, InvalidKeySpecException {
        BigInteger x = new BigInteger(publicKeyHex.substring(2, 66), 16);
        BigInteger y = new BigInteger(publicKeyHex.substring(66), 16);
        ECPoint point = new ECPoint(x, y);
        ECPublicKeySpec publicKeySpec = new ECPublicKeySpec(point, params);
        KeyFactory keyFactory = KeyFactory.getInstance("EC", new BouncyCastleProvider());
        return keyFactory.generatePublic(publicKeySpec);
    }

    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4) + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }
}