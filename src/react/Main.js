import React, { Component } from 'react'
import {theme} from "./styles/theme";
import mainLogo from "../assets/amongUS.png";
import RightBox from "./components/RightBox";
import BalanceAccount from "./components/BalanceAccount";
import AmountInput from "./components/AmountInput";
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
                        <RightBox>
                            <AmountInput />
                        </RightBox>
                    </div>


                </div>
            </ThemeProvider>
        );
    }
}

export default Main;
