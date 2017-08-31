"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const AppBar_1 = require("material-ui/AppBar");
class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (React.createElement(MuiThemeProvider_1.default, null,
            React.createElement(AppBar_1.default, { title: "Kangrat Editor" })));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map