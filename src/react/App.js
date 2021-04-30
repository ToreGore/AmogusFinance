import React, { Component } from 'react'
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Main from './Main';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            daiToken: {},
            dappToken: {},
            tokenFarm: {},
            daiTokenBalance: '0',
            dappTokenBalance: '0',
            stakingBalance: '0',
            loading: false
        }
    }

  render() {

      let content
      if(this.state.loading) {
          content = <p id="loader" className="text-center">Loading...</p>
      } else {
          content = <Main/>
      }
    return (
        <ThemeProvider theme={theme}>
              {content}
        </ThemeProvider>
    );
  }
}

export default App;
