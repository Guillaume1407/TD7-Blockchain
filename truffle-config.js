const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNENOMIC="speed chase must hungry image panic visit visual zoo own slide animal"
require('dotenv').config()  // Store environment-specific variable from '.env' to process.env

module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*"
      },
  //  test: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  }
  rinkeby: {
    provider: () => new HDWalletProvider(MNENOMIC, "https://rinkeby.infura.io/v3/e6acc5e813c941cfa1e5d1065650e368"),
    network_id: 4,
    gas: 3000000,
    gasPrice: 10000000000
  },
  }
  //
};
