"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Load extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        let state = window.state;
        state.changeRoute('Load');
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Choose a kangratsave.json to load..."),
            React.createElement("h2", null, "...or select a file to load from below")));
    }
}
exports.default = Load;
//# sourceMappingURL=Load.js.map