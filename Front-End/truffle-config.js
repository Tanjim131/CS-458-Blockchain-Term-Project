const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider('once globe three lizard ivory plastic canyon edge pear stereo dish creek', 'https://rinkeby.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc'),
      network_id: 4,       
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 200,  
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
