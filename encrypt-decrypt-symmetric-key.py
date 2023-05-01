import hashlib
from coincurve import PublicKey, PrivateKey
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7
from cryptography.hazmat.backends import default_backend

def raw_to_uncompressed_public_key(raw_public_key_hex):
    x = raw_public_key_hex[:64]
    y = raw_public_key_hex[64:]
    return '04' + x + y

def encrypt_data(data, private_key_hex, public_key_hex):
    # Load private key of Entity A and public key of Entity B
    private_key_a = PrivateKey.from_hex(private_key_hex)
    public_key_b = PublicKey(bytes.fromhex(public_key_hex))

    # Compute shared secret using ECDH
    shared_secret = private_key_a.ecdh(public_key_b.format())

    # Derive encryption key and IV from shared secret
    derived_key = hashlib.sha256(shared_secret).digest()
    encryption_key = derived_key[:16]
    iv = derived_key[16:]

    # Encrypt the data using AES
    cipher = Cipher(algorithms.AES(encryption_key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()

    # Pad the data using PKCS7
    padder = PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()
    
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()

    return encrypted_data.hex()

def decrypt_data(encrypted_data, private_key_hex, public_key_hex):
    print("Encrypted data = ", encrypted_data)
    # Load private key of Entity A and public key of Entity B
    private_key_a = PrivateKey.from_hex(private_key_hex)
    public_key_b = PublicKey(bytes.fromhex(public_key_hex))

    # Compute shared secret using ECDH
    shared_secret = private_key_a.ecdh(public_key_b.format())

    print("Shared secret = ", shared_secret.hex())

    # Derive decryption key and IV from shared secret
    derived_key = hashlib.sha256(shared_secret).digest()
    decryption_key = derived_key[:16]
    iv = derived_key[16:]

    # Decrypt the data using AES
    cipher = Cipher(algorithms.AES(decryption_key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()

    # Unpad the decrypted data using PKCS7
    unpadder = PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(decrypted_data) + unpadder.finalize()
    
    return data.decode('UTF-8')

# data = "E7-6xpblDveex3HPV4KN-uFqZgoYHHDJU2YYhlQj9ZA="

tanjim_raw_public_key = "b96d2080971f09405ee4c5a003c87eeb1f1538e363ac7260047879b9b8ddfb3cca0e12294fb8a903ee811add63fcb51718cd2330bfcf46b0fcde47d90d0c4f8c"
# tanjim_private_key = "4dfd3a4a92df78920ea83d440d44eb8a7d9f747c909c270c4e515ea881633e73" # Tanjim's private key

# zarin_raw_public_key = "57574207e1c6302a2606a7b181b17d12f3a646339210d8604f263da0bd8bb10d80cd452ed997a94025112a0d567fa05c31ed90813e20404ab1d517cb2e85ac3c"
zarin_private_key = "5bd4c34b8514a63c09a96ce5fe8abedff5599f2eae6bd88d48abf61af291cb5b"

uncompressed_tanjim_public_key_hex = raw_to_uncompressed_public_key(tanjim_raw_public_key)
# uncompressed_zarin_public_key_hex = raw_to_uncompressed_public_key(zarin_raw_public_key)

# encrypted_data = encrypt_data(bytes(data, 'UTF-8'), tanjim_private_key, uncompressed_zarin_public_key_hex)
decrypted_data = decrypt_data(bytes.fromhex("dc90bf810b10d250cbc05b3797cf31e9ad1d2cd195b1d20620b009881772c392578b6346689c0cab7517e3a7269db6b8"), zarin_private_key, uncompressed_tanjim_public_key_hex)

# print("Encrypted data:", encrypted_data)
print("Decrypted data:", decrypted_data)