import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/e6acc5e813c941cfa1e5d1065650e368")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const mycontract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    this.setState({mycontract})
    const name = await mycontract.methods.getName().call()
    this.setState({ name })
    const BlockNumber = await web3.eth.getBlockNumber()
    this.setState({BlockNumber})
    const ChainId = await web3.eth.net.getId()
    this.setState({ChainId})
    const NumberOfToken = await mycontract.methods.totalSupply().call()
    this.setState({NumberOfToken})

    mycontract.methods.registerBreeder(accounts.toString()).send({from: accounts.toString()})
    mycontract.methods.declareAnimal("chat","m","milo","blue",4 ).send({from: accounts.toString()})

    const nbtoken = await mycontract.methods.balanceOf(accounts.toString()).call()
    this.setState({nbtoken})



  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
        <div className="container">
          <h1 id="titre">Contract name : {this.state.name} </h1>
          <p id ="text">Last Block : {this.state.BlockNumber}</p>
          <p id ="text">ChainId : {this.state.ChainId}</p>
          <p id ="text">Number of Token: {this.state.NumberOfToken} tokens.</p>
          <p id ="text">Your account: {this.state.account}</p>
          <p></p>
          <p></p>
          <form onSumbit ={ (event) => this.setState({ address: event.target.value })
          }>
              <input id="adress" type="text" className="form-control" placeholder="Write the token Id..." required />
              <input type="submit" hidden="" />
          </form>
          <p id ="text">Your account: {this.state.nbtoken}</p>
        </div>
        

    );
  }
}

export default App;