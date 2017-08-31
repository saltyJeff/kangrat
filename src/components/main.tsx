import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import State from './State';

import App from './App';
import {MuiThemeProvider} from 'material-ui/styles/MuiThemeProvider';

mobx.useStrict(true);
(window as any).state = new State();

ReactDOM.render(<App />, document.getElementById('reactRoot'));