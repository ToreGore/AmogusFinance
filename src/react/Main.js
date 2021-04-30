import React, { Component } from 'react'
import {theme} from "./styles/theme";
import mainLogo from "../assets/amongUS.png";
import RightBox from "./components/RightBox";
import BalanceAccount from "./components/BalanceAccount";
import './Main.css';
import {ThemeProvider} from "styled-components";

class Main extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="containerA" style={{background: theme.background}}>


                    <div className="containerLEFT" style={{background: theme.side_container}}>
                        <BalanceAccount text={"Main B."} balance={100000} currency={"|S|"}/>
                        <BalanceAccount text={"Investment B."} balance={100000} currency={"|S|"}/>
                        <BalanceAccount text={"Reward B."} balance={100000} currency={"|A|"}/>
                    </div>


                    <img className="logo"  src={mainLogo}/>


                    <div className="containerRIGHT"style={{background: theme.side_container}}>
                        <RightBox></RightBox>
                    </div>


                </div>
            </ThemeProvider>
        );
    }
}

export default Main;
