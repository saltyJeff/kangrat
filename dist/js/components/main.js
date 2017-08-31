"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const mobx = require("mobx");
const State_1 = require("./State");
const App_1 = require("./App");
mobx.useStrict(true);
window.state = new State_1.default();
ReactDOM.render(React.createElement(App_1.default, null), document.getElementById('reactRoot'));
//# sourceMappingURL=main.js.map