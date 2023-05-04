import os
import sys
from cryptography.fernet import Fernet

def get_file_extension(filename):
    _, file_extension = os.path.splitext(filename)
    # remove the dot from the extension
    file_extension = file_extension[1:]

    return file_extension

def encrypt_file(filename, key):
    """
    Given a filename (str) and key (bytes), it encrypts the file and write it
    """
    f = Fernet(key)

    with open(filename, "rb") as file:
        # read all file data
        file_data = file.read()

    encrypted_data = f.encrypt(file_data)

    with open(f"encrypted.{get_file_extension(filename)}", "wb") as f:
        f.write(encrypted_data)

    return encrypted_data.decode('UTF-8')

def decrypt_file(encrypted_data, key, file_extesion):
    """
    Given a filename (str) and key (bytes), it decrypts the file and write it
    """
    f = Fernet(key)

    decrypted_data = f.decrypt(encrypted_data)

    # write the original file
    with open(f"decrypt.{file_extesion}", "wb") as file:
        file.write(decrypted_data)

    return decrypted_data.decode('UTF-8')

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
    file_name = sys.argv[2]
    key = sys.argv[3]

    if len(sys.argv) == 5:
        file_extesion = sys.argv[4]

    key = bytes(key, 'UTF-8')

    if function_name == "encrypt_file":
        decrypted_file_content = encrypt_file(file_name, key)
        print(decrypted_file_content)

    if function_name == "decrypt_file":
        decrypted_file_content = decrypt_file(file_name, key, file_extesion)
        print(decrypted_file_content)
