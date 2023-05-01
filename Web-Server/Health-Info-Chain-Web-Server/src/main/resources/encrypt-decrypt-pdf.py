import sys
from cryptography.fernet import Fernet

# def write_key():
#     """
#     Generates a key and save it into a file
#     """
#     key = Fernet.generate_key()

#     with open("key.key", "wb") as key_file:
#         key_file.write(key)

# def load_key(key = None):
#     """
#     Loads the key from the current directory named `key.key`
#     """
#     if not key:
#         return open("key.key", "rb").read()
    
#     return bytes(key, 'UTF-8')

def encrypt_file(file_data, key):
    """
    Given a filename (str) and key (bytes), it encrypts the file and write it
    """
    f = Fernet(key)

    # with open(filename, "rb") as file:
    #     # read all file data
    #     file_data = file.read()

    encrypted_data = f.encrypt(file_data)

    return encrypted_data

def decrypt_file(encrypted_data, key):
    """
    Given a filename (str) and key (bytes), it decrypts the file and write it
    """
    f = Fernet(key)
    # with open(filename, "rb") as file:
    #     # read the encrypted data
    #     encrypted_data = file.read()
    # decrypt data
    decrypted_data = f.decrypt(encrypted_data)
    # write the original file
    # with open("decrypt.pdf", "wb") as file:
    #     file.write(decrypted_data)
    return decrypted_data

# uncomment this if it's the first time you run the code, to generate the key
# write_key()
# load the key
# key = load_key("E7-6xpblDveex3HPV4KN-uFqZgoYHHDJU2YYhlQj9ZA=")
# file name
# file = "sample.pdf"
# encrypt it
# encrypted_data = encrypt_file(file, key)
# decrypt_file(encrypted_data, key)

if __name__ == "__main__":
    function_name = sys.argv[1]
    file_content = sys.argv[2]
    key = sys.argv[3]

    file_content = bytes(file_content, 'UTF-8')
    key = bytes(key, 'UTF-8')

    if function_name == "encrypt_file":
        encrypted_file_content = encrypt_file(file_content, key)
        print(encrypted_file_content)

    if function_name == "decrypt_file":
        decrypted_file_content = decrypt_file(file_content, key)
        print(decrypted_file_content)