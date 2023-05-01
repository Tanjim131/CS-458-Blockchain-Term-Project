import json
from web3 import Web3

# Replace these values with your own
COMPILED_SMART_CONTRACT_PATH = "practitioner_compData.json"

# Read the ABI and bytecode from the compiled smart contract
with open(COMPILED_SMART_CONTRACT_PATH) as f:
    compiled_contract = json.load(f)
    contract_abi = compiled_contract["abi"]
    contract_bytecode = compiled_contract["bytecode"]

contract_address = '<CONTRACT ADDRESS>'

# Connect to the Ropsten Ethereum network using Infura and web3.py
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/<API KEY>'))

# Check if connected to the Ethereum network
if not w3.is_connected():
    print("Unable to connect to Ethereum network.")
    exit(1)

# Create a new contract instance using the contract ABI and address
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Replace 'yourFunction' and its arguments with the actual function name and arguments
function_name = 'getHelloWorld'
function_arguments = () # Replace with your function's arguments

# Call the function on the contract
try:
    result = contract.functions[function_name](*function_arguments).call()
    print(f"The function '{function_name}' returned: {result}")
except Exception as error:
    print(f"Failed to call function '{function_name}': {error}")