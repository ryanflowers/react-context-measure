import React, { Component } from 'react';
import {TestContextComponent} from "./testContextComponent";

class App extends Component {

  constructor() {
    super();
    this.state = { renderCount: 0, inputNestNodeCount: 0, nestNodeCount: 0, inputUseContext: false, useContext: false, result: 0 };
  }

  onClick = () => {
    // TODO add perf marker start
    this.setState({ renderCount: this.state.renderCount + 1, nestNodeCount: this.state.inputNestNodeCount, useContext: this.state.inputUseContext });
  }

  onNestNodeCountChange = (event) => {
    this.setState({ inputNestNodeCount: event.target.value });
  }

  onUseContextChange = (event) => {
    this.setState({ inputUseContext: event.target.value === "true" ? true : false });
  }

  rendered = () => {
    // TODO add perf marker measure and set to result
    console.log("render complete");
  }

  render() {
    return (
      <div className="App">
        <label>Nest node count:</label>
        <input type="text" value={this.state.inputNestNodeCount} onChange={this.onNestNodeCountChange} />
        <br/>
        <br/>
        <label>Use react context:</label>
        <div>
          <label>True:</label>
          <input type="radio" checked={this.state.inputUseContext === true} value="true" onChange={this.onUseContextChange} />
          <label>False:</label>
          <input type="radio" checked={this.state.inputUseContext === false} value="false" onChange={this.onUseContextChange} />
        </div>
        <br/>
        <br/>
        <button onClick={this.onClick}>Rerender!</button>
        <TestContextComponent
            rendered={this.rendered}
            nestNodeCount={this.state.nestNodeCount}
            useContext={this.state.useContext}>
        </TestContextComponent>
        <br/>
        <br/>
        <div>
          {this.state.result} ms
        </div>
      </div>
    );
  }
}

export default App;
