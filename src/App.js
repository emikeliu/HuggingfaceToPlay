import Title from './modules/TitleBar';
import Bottom from './modules/Bottom';
import ContentRouter from './modules/ContentRouter';
import "@fontsource/noto-sans-sc/300.css";
import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/700.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { Box, Divider } from '@mui/material';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCheck : 0
    };
    
  }
  render() {
    return (
        <Box className="App"  sx={{ "paddingBottom": 7}} >
          <Title app={this}/>
          <ContentRouter id={this.state.currentCheck}/>
          <Bottom onChange={(event, newValue) => {this.setState({currentCheck : newValue})}}></Bottom>
        </Box>
    );
  }
}

export default App;
