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
                        <BalanceAccount text={"Main B."} balance={window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} currency={"|S|"}/>
                        <BalanceAccount text={"Investment B."} balance={window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} currency={"|S|"}/>
                        <BalanceAccount text={"Reward B."} balance={window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} currency={"|A|"}/>
                    </div>


                    <img className="logo"  src={mainLogo}/>

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
