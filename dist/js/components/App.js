"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const AppBar_1 = require("material-ui/AppBar");
const react_router_dom_1 = require("react-router-dom");
const mobx_react_1 = require("mobx-react");
const Load_1 = require("./Load");
let App = class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        let state = window.state;
        return (React.createElement(MuiThemeProvider_1.default, null,
            React.createElement("div", null,
                React.createElement(AppBar_1.default, { title: "Kangrat - " + state.currentRoute }),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", null,
                        React.createElement(react_router_dom_1.Route, { path: "/", component: Load_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/template" }),
                        React.createElement(react_router_dom_1.Route, { path: "/data" }),
                        React.createElement(react_router_dom_1.Route, { path: "/build" }))))));
    }
};
App = __decorate([
    mobx_react_1.observer
], App);
exports.default = App;
//# sourceMappingURL=App.js.map