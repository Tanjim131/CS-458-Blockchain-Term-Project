import sys
from cryptography.fernet import Fernet

def encrypt_file(file_content, key):
    f = Fernet(key)
    encrypted_data = f.encrypt(file_content.encode('UTF-8'))
    return encrypted_data

def decrypt_file(encrypted_data, key):
    f = Fernet(key)
    decrypted_data = f.decrypt(encrypted_data)
    return decrypted_data

if __name__ == "__main__":
    function_name = sys.argv[1]
    file_content = sys.argv[2]
    key = sys.argv[3]

    if function_name == "encrypt_file":
        encrypted_file_content = encrypt_file(file_content, key)
        print(encrypted_file_content)

    if function_name == "decrypt_file":
        decrypted_file_content = decrypt_file(file_content, key)
        print(decrypted_file_content)

