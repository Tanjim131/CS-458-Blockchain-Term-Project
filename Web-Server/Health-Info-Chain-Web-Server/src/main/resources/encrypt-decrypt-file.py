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

# file_content_1 = """TXT test file
# Purpose: Provide example of this file type
# Document file type: TXT
# Version: 1.0
# Remark:

# Example content:
# The names "John Doe" for males, "Jane Doe" or "Jane Roe" for females, or "Jonnie Doe" and "Janie Doe" for children, or just "Doe" non-gender-specifically are used as placeholder names for a party whose true identity is unknown or must be withheld in a legal action, case, or discussion. The names are also used to refer to acorpse or hospital patient whose identity is unknown. This practice is widely used in the United States and Canada, but is rarely used in other English-speaking countries including the United Kingdom itself, from where the use of "John Doe" in a legal context originates. The names Joe Bloggs or John Smith are used in the UK instead, as well as in Australia and New Zealand.

# John Doe is sometimes used to refer to a typical male in other contexts as well, in a similar manner to John Q. Public, known in Great Britain as Joe Public, John Smith or Joe Bloggs. For example, the first name listed on a form is often John Doe, along with a fictional address or other fictional information to provide an example of how to fill in the form. The name is also used frequently in popular culture, for example in the Frank Capra film Meet John Doe. John Doe was also the name of a 2002 American television series.

# Similarly, a child or baby whose identity is unknown may be referred to as Baby Doe. A notorious murder case in Kansas City, Missouri, referred to the baby victim as Precious Doe. Other unidentified female murder victims are Cali Doe and Princess Doe. Additional persons may be called James Doe, Judy Doe, etc. However, to avoid possible confusion, if two anonymous or unknown parties are cited in a specific case or action, the surnames Doe and Roe may be used simultaneously; for example, "John Doe v. Jane Roe". If several anonymous parties are referenced, they may simply be labelled John Doe #1, John Doe #2, etc. (the U.S. Operation Delego cited 21 (numbered) "John Doe"s) or labelled with other variants of Doe / Roe / Poe / etc. Other early alternatives such as John Stiles and Richard Miles are now rarely used, and Mary Major has been used in some American federal cases.



# File created by https://www.online-convert.com
# More example files: https://www.online-convert.com/file-type
# Text of Example content: Wikipedia (https://en.wikipedia.org/wiki/John_Doe)
# License: Attribution-ShareAlike 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)

# Feel free to use and share the file according to the license above."""

# qq = encrypt_file(file_content_1, "VR-MbCXvpOHVeo1yPgRUhJP8Rqnjth-PufPmxCdyYUs=") # For encryption, data must be bytes 

# print("QQ=", qq)

# file_content_2 = b'gAAAAABkUb4B8L5QdB91s3-vk5QfuL27fDNW0XkovzmYRqpXE6xIgovPFCknoWjH6k4alsp9RyIedaoHduYieFwHxoea8j3wmc80Dvn9V9eRzQ_vVwN7GX0NzzEXChXB00d526edq_WLA4gEQRQtMgdy5ryJqqNLL7PakuMf-rlY65npmyZ_RYanOXrCH98a2RrslzmHgCe_9ezDQhNHIjgqj3RslUBXGSzmGod7qGT9r1rodOICKRN1nfhvs7dfQOtaYba7y51aZfsOIgiruq9FNL2rK7d5-I_lF5iI_r5a9ilBybH0XN1NnU-NMvCShtxkMotDnkbWsaSIS1mBXWYKiBA5vgvKMUaVZd3b1p2qJIAGVu_Bo8Aze7DmXIKBDkXsJleAPRlXggtrXuywilrHvTaI7khc2ZZj0wfdA0AjdUMZCi01AJoP7k5wJLRpzs5dJyDDAaJPHfAFHBw5eKTmsn0NY6HUvFCiF7EvMlDziCtELMknLpxGfsdWQKXCm0CZL5jYA0i04_o5RzfDFHfKxa3W2nv97ed9p3r5ayH0PoMPnR6419Hk_37nyC3HhesyhsoQAtQzIHLKjvxpMC7LHIcmpAxwKHVb4vm6tC4tPALre0vCN4K-xTekSKsTizFAOvIzv0jJT3yfkXihKYGvhPoSvqx9XBfo13qBEKEAJU0jk_5LhsHAQzMXPVu_5jqIQZw1gqY6mxUE3YetIWYSkPHTQdaTCmoAvsrHVXHaBEaNxqkbmy7o585wkfLKxUO2LuooacqBT_E6On5EoT70ioJwSeQKpxvfNS9NgozTQdYY9-jxi-fZcNCJoejXRNPrbcfqlQEK6Xl245nxnYAfVCbzCv26WnRK_3MWD1x1mwLpPXcD4VFkM1FxShCDHcVmVH0eHl2pJC-4J8tzmhDyrkIiHYR6SAgbxc5q4m6iRuN2cFHJ_Ti0DfcxUwzzrBYQk19y8qkjfgbpOZmOPnxHQuNozAjcgRK2qebwbPH68_kKgVtSpZaWiXvS39cxFYY9ySxm2WcKyw6nwEUq2c7Q5gK00KOol3unO_fYBFt-Z1D0ag9h_Cp1Us-3EnrVyrvYuOqkMHm0aVjXvDwi0ynvpLlSqMuYZUsW5WM4qfdTRuNQv3pfzqQDZuqvGJSIrVjsuN_BbRzrTMn9j4grB99xTrOT9YvXwhVpRUPcVLyX8ksXvYa5YcnvAQUovxhb0FV2_qrpCHXhW1NGxYrbfnC3Hn97ms9-7-MUL_rrVB2D4LLzECkzxWt6ueoNCFaUKw20jlKciNBZZPpOUtDmLGXT4haPSzwfP3B7DWFE74-VDVVVKIFgjf1omjq1uxJ7c46Ef5n6yw94cb7vae7CAt_JWz5qRBQ_EKS9gCbeYGAFTcHNsoc0rxY4JOdJzA88gh0qx1Di-PJp9uA285wUIM9lZvXwScfDN1ZZ9VBsO4hrQ6BO2rHNOQwdMCGG0WW919i2-jUaLy_p1z-6KqMSVpnbfU1e2DCVgr9RoCTtHf4vlcGJzZlPIpRNtywsjkSkZOodyQag6A0v_wXvDVsWYm_JxeZ0PJCb0hcnWDhwPEs7H0-CW_qCBbkGXXXDbUrvYfMCChCfrFSAWaXRVG_E3tQ5IDun77SAsAziV4IlMB0upGAsyh481FRyd0y1x0-r2GBjknHeRpmb8O3KZHOXhb2tiY1v4McOXQxYEpr_eawPDhfL22Bopx9Bv1Qejh3g4GZktZA2AtDVdIQ7mBofPJMsYt0EgOMbatUob9hI97g9R3u5ADROcQjIubSPRsRcQeTanP7T4A7oLQ34vOfp7LbXMUvSQChiTqwp-n8uWTLxOn-4GAFkB2IPiysgF_8mg8WGZ8iI3_7eorZGkL8LI1pE-1LXIyB7yjwY0ZhJ1LW-KCkNWQDFfF9qUeXvaXozvSYLEBhBf7k0ynJrEYLE9IOhSG6VE3tiXY2F1n80MIS_U45qUzmvj7v9RxBLb8RWAOYm0ZEcOC_Xbwt-gpUy4hCb6NWxOIjJUchrS6luUP4EbI6KIhjt3c6BznyiCbZqubFson_Q69lBk7O4H5Crr197Vo-Vvi8_4ZfhpYIA3PQaH4CQF4lmygTeYqR6oCHg--x1InHV93EgJVWkxv3EmfhyNwFokKivYLm2garfIWyOMoXjqRkc9f9gxRF_UQAFREbhLRII46ux4md-fqHhSaGD2W8ro1OzwHUdCqABj-YLlXIswRwHZtmVN1YzRF0HYz9W25duckh8hN2yHdm3n5BaeHKktY0aqL3cwGMLbbG-XD60-G2G5xw7sfjzohhgkEGiaUhjJZURIiXdIzHQ2xIazwPlb4kdNd9v_9ILmR2foN8cfcOlw2xPF3r7J19IG39O5YFgqndYozYRWwlCvoUnALtmZtgux2BYypYMarKUud0A3N9qYsEBHZxYVXIL4X6YuvjiGIn33_0fshuZcuVuKZGjWrmDrWmBeeqPLFYLDvooCIgo32cpTOYuJvfo5WL2gGHp2SDzEbvpybEPdu3ZhoR2Eal-cKcfuKPenr365qX204cdyjhvFRgKfL0gtdwHWx7lF7cD-pSPfpuwIRaEj2J3s4mp5hZyNMVgj0AMHwUKaZ4K56LuqQrPaGJRY7S08XdHp475gZYwH1vFphoEM0CsrZ8IzmIX9vvf6W3SLHbc-AkMGkvEbK0qY9XEAoRZdp8MkWaYn82cuMpgcWNrIlE9zDjsHdlj4pPrGzNVo5pHsmw5HKhW1oSaz3q9q2Piz4Aknr0jAWJrVKk-AiXQH9PK6UmRHHLqGWosZz1S2zpLUdCZ2PMQ05NXTwdhkJS8_gqefDPHu-2Oy4TLqoLiHj5aaTcJIwL4OGt9UBROLTdCH6JQGzpE68lwFj2nleX761-K-AxNWYW8RxO03Bn4JvlVXQk_a9r2fwQtG91pXoAw1DtLHH9QgBy71Zu6CA2q2_N562Q0OwIB2vl-yGICdEvXzVyWYRY8gqTiloz6jkNxcFJaG2WTG-5SmjOhJF3JAYoafLvsci9nGJXMpCFYB4r3IAKNYZdAnHfUbAk7K-FDbJwgM8nWNwGyeSuma6KM8TOFA6izH12v22EuEW73Zu9zclqg2j9K3giK33DBDblJj4P2-OFAvAEkX4tCvbsMO_qD786F4XRq0vtxL6xcX5Vpm3h6101ryThSqNXg3v7j-LjoiuUR2nxuoW0AXk_q-hAwsqd8gqo08HDAsyrbWsyC94n7ozZ9Lfi0DNIYUPUqMqRNTlacaJjMoxJeSTJ5iVNmKTNxW6xd0CSOge_7UP1bDFx62ccdpzcda675c0Wr2exlIs1SQEyS1dIsObX1Dfc6wkserT28tA5BBCeOk0fPbGnpAEoxsaPDu6LZgvJyjmlFnCy4EgCLGGMHL6oxaWeDgzRHnB0VS3n_c_vxWuBdpDcniPtp0OxhtiPT9wQ2F6-zmnrAPqC1LkcFz2sBPRqHzpYU98bK98bRC-GWz5vsrclJ8Jsjrx-2gegFe47tLyDApdos7YfhPoBYRaYVgbXgVz6P5P3BtDXz-9pIr7wlg2IT_g=='

# rr = decrypt_file(file_content_2, "JQNeBWhoLdQj9SyejDzIgaS-0Ohv1EkdOcE8Tcp-7pE=") # For decryption, data can be bytes or string
# with open("decrypt.txt", "wb") as f:
#     f.write(rr)
# print("RR=", rr)


