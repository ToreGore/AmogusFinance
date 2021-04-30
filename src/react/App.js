import React, { Component } from 'react'
import RightBox from "./components/RightBox/RightBox";
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import './App.css'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0'
    }
  }
  render() {
    return (
        <ThemeProvider theme={theme}>
          <div className="containerA" style={{background: theme.background}}>

              <div className="containerLEFT" style={{background: theme.side_container}}>
              </div>

              <div className="space"/>

              <div className="containerRIGHT"style={{background: theme.side_container}}>
                  <RightBox></RightBox>
              </div>

          </div>
        </ThemeProvider>
    );
  }
}

export default App;
