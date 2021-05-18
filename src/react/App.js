import React, { Component } from 'react'
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Main from './Main';
import Web3 from 'web3'
import  StableToken from '../abis/StableToken.json'
import AmongusToken from '../abis/AmongusToken.json'
import YieldFarming from '../abis/YieldFarming.json'

class App extends Component {


    async componentWillMount() {
        //It is invoked just before mounting occurs.
        //It is called before render().
        console.log('componentWillMountcalled')
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {

        //open a window in web 3 that can communicate with the Ethereum network
        const web3 = window.web3

        //get the accounts from the Ethereum network
        console.log('Waiting for Accounts')
        const accounts = await web3.eth.getAccounts()

        //insert them in the component's state
        this.setState({ account: accounts[0] })

        //insert them in the component's state
        const networkId = await web3.eth.net.getId()

        //load stableToken
        //get a reference to the contract in the network
        const stableTokenData = StableToken.networks[networkId]
        if(stableTokenData) {

            //create a new contract object with the same json interface of the respective smart contract
            //this allows us to interact with smart contracts as if they were JavaScript objects.
            const stableToken = new web3.eth.Contract(StableToken.abi, stableTokenData.address)

            //pass the new object to the component state
            this.setState({ stableToken })

            //load the balance of the the account using the method "balanceOf" defined in the SC.
            let stableTokenBalance = await stableToken.methods.balanceOf(this.state.account).call()
            this.setState({ stableTokenBalance: stableTokenBalance.toString() })

        } else {
            window.alert('DaiToken contract not deployed to detected network.')
        }

        // Same procedure for Amongus Token
        const amongusTokenData = AmongusToken.networks[networkId]
        if(amongusTokenData) {
            const amongusToken = new web3.eth.Contract(AmongusToken.abi, amongusTokenData.address)
            this.setState({ amongusToken })
            let amongusTokenBalance = await amongusToken.methods.balanceOf(this.state.account).call()
            this.setState({ amongusTokenBalance: amongusTokenBalance.toString() })
        } else {
            window.alert('DappToken contract not deployed to detected network.')
        }

        // TokenFarm
        const tokenFarmData = YieldFarming.networks[networkId]
        if(tokenFarmData) {
            const tokenFarm = new web3.eth.Contract(YieldFarming.abi, tokenFarmData.address)
            this.setState({ tokenFarm })
            let deposingBalance = await tokenFarm.methods.deposingBalance(this.state.account).call()
            this.setState({ deposingBalance: deposingBalance.toString() })
        } else {
            window.alert('TokenFarm contract not deployed to detected network.')
        }

        this.setState({ loading: false })
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    issueTokens = (amount) => {
        //buffer before the action is executed
        this.setState({ loading: true })

        //wait for approval on the balance account and send the token amount to the given address.
        this.state.stableToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.state.tokenFarm.methods.issueTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
                this.setState({ loading: false })
            })
        })
    }

    getTokens = (amount) => {
        //buffer before the action is executed
        this.setState({ loading: true })

        //directly transfer the token amount to the given address.
        this.state.tokenFarm.methods.getTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })
    }

    constructor(props) {
        //inherit all the attributes of Components
        super(props)

        //define state variables valid only inside the component
        this.state = {
            account: '0x0',

            stableToken: {},
            amongusToken: {},
            tokenFarm: {},

            stableTokenBalance: '0',
            amongusTokenBalance: '0',
            deposingBalance: '0',

            loading: true
        }
    }

    render() {
        // invoked when a the App component is called. (logic of the return statement)
        console.log('asdf')
        let content
        if(this.state.loading) {
            content = <p id="loader" className="text-center">Loading...</p>
        } else {
            content = <Main
                stableTokenBalance={this.state.stableTokenBalance}
                amongusTokenBalance={this.state.amongusTokenBalance}
                deposingBalance={this.state.deposingBalance}
                issueTokens={this.issueTokens}
                getTokens={this.getTokens}
            />
        }

        // what's really displayed in the UI

    return (
        <ThemeProvider theme={theme}>
              {content}
        </ThemeProvider>
    );
  }
}

export default App;
