from eth_keys import keys
# from eth_account import Account

private_key_hex = "4dfd3a4a92df78920ea83d440d44eb8a7d9f747c909c270c4e515ea881633e73"

private_key = keys.PrivateKey(bytes.fromhex(private_key_hex))
# account = Account.from_key(private_key_hex)
public_key = private_key.public_key
# public_key = account.public_key

print(f"Public Key = {public_key}")

# public key = 0xb96d2080971f09405ee4c5a003c87eeb1f1538e363ac7260047879b9b8ddfb3cca0e12294fb8a903ee811add63fcb51718cd2330bfcf46b0fcde47d90d0c4f8c