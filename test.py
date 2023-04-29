import json
from web3 import Web3

# Replace with the path to your compiled smart contract's JSON file
COMPILED_SMART_CONTRACT_PATH = "practitioner_compData.json"

# Read the ABI and bytecode from the compiled smart contract
with open(COMPILED_SMART_CONTRACT_PATH) as f:
    compiled_contract = json.load(f)
    contract_abi = compiled_contract["abi"]
    contract_bytecode = compiled_contract["bytecode"]

# Set up web3.py with your Infura API key
# INFURA_API_KEY = os.environ["INFURA_API_KEY"]
# TESTNET = "rinkeby"  # Replace with the desired testnet: ropsten, rinkeby, kovan, or goerli
# w3 = Web3(HTTPProvider(f"https://{TESTNET}.infura.io/v3/{INFURA_API_KEY}"))

w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/f0a0d78881ca40d2b86e7adff9569c45'))

# Set up the account to deploy the contract
# PRIVATE_KEY = os.environ["PRIVATE_KEY"]
account = w3.eth.account.from_key("4dfd3a4a92df78920ea83d440d44eb8a7d9f747c909c270c4e515ea881633e73")
w3.eth.defaultAccount = account.address

# Set up the contract object
# Set up the contract object
contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# get gas price
gas_price = w3.to_wei('10', 'gwei')

gas_estimate = contract.constructor().estimate_gas()

# Deploy the smart contract
transaction = {
    "from": account.address,
    "gas": gas_estimate,
    "gasPrice": gas_price,
    "data": contract_bytecode,
    "nonce": w3.eth.get_transaction_count(account.address)
}

signed_transaction = account.signTransaction(transaction)
transaction_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)

# Get the deployed contract address
contract_address = transaction_receipt["contractAddress"]

print(f"Smart contract deployed to: {contract_address}")