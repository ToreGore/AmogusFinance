import React, { Component } from 'react'
import {theme} from "./styles/theme";
import mainLogo from "../assets/amongUS.png";
import BalanceAccount from "./components/BalanceAccount";
import './Main.css';
import {ThemeProvider} from "styled-components";


class Main extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="containerA" style={{background: theme.background}}>


                    <div className="containerLEFT" style={{background: theme.side_container}}>
                        <BalanceAccount text={"Main B."} balance={window.web3.utils.fromWei(this.props.stableTokenBalance, 'ether')} currency={"|S|"}/>
                        <BalanceAccount text={"Investment B."} balance={window.web3.utils.fromWei(this.props.deposingBalance, 'ether')} currency={"|S|"}/>
                        <BalanceAccount text={"Reward B."} balance={window.web3.utils.fromWei(this.props.amongusTokenBalance, 'ether')} currency={"|A|"}/>
                    </div>


                    <img className="logo" alt=""  src={mainLogo}/>

                    <div className="containerRIGHT"style={{background: theme.side_container}}>
                        <div className="box" style={{background: theme.box, borderColor: theme.border }}>
                            <div className="form">
                                <form
                                    className="form"
                                    onSubmit={(event) => {event.preventDefault()
                                        let amount
                                        amount = this.input.value.toString()
                                        amount = window.web3.utils.toWei(amount, 'Ether')
                                        this.props.issueTokens(amount)}}>
                                    <input
                                        class="input"
                                        type="text"
                                        ref={(input) => { this.input = input }}
                                        placeholder="0"
                                        required />
                                    <button class="button" type="submit" >INVEST</button>
                                </form>
                            </div>
                            <button
                                class="button"
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.props.getTokens()
                                }}>
                                DISINVEST
                            </button>

                        </div>

                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default Main;
