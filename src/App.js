import React, { Component } from 'react';
import {TestContextComponent} from "./testContextComponent";

class App extends Component {

  constructor() {
    super();
    const defaultNodeCount = 1000;
    this.log = [];
    this.startTime = 0;
    this.state = { renderCount: 0, inputNestNodeCount: defaultNodeCount, nestNodeCount: defaultNodeCount, inputUseContext: false, useContext: false, result: [] };
  }

  onClick = () => {
    if(this.state.inputNestNodeCount <= 10000) {
      this.setState({ renderCount: this.state.renderCount + 1, nestNodeCount: this.state.inputNestNodeCount, useContext: this.state.inputUseContext });
    } else{
      alert("Too many nodes browser will puke. Keep it under 10000")
    }
  }

  onNestNodeCountChange = (event) => {
    this.setState({ inputNestNodeCount: event.target.value });
  }

  onUseContextChange = (event) => {
    this.setState({ inputUseContext: event.target.value === "true" ? true : false });
  }

  rendered = () => {
    const endTime = Date.now();
    const result = endTime - this.startTime;
    this.log.push("Run " + this.state.renderCount + ", Render time(ms) " + result + ", Using react context:" + this.state.useContext);
    this.setState({ result: this.log });
  }

  render() {

    // TODO add perf marker starts
    this.startTime = Date.now();

    return (
      <div className="App">
        <label>Nest node count:</label>
        <input type="text" value={this.state.inputNestNodeCount} onChange={this.onNestNodeCountChange} />
        <br/>
        <label>Use react context:</label>
        <div>
          <label>True:</label>
          <input type="radio" checked={this.state.inputUseContext === true} value="true" onChange={this.onUseContextChange} />
          <label>False:</label>
          <input type="radio" checked={this.state.inputUseContext === false} value="false" onChange={this.onUseContextChange} />
        </div>
        <br/>
        <button onClick={this.onClick}>Rerender!</button>
        <br/>
        <div>
          {this.state.result.map((item) => (<div>{item}</div>))}
        </div>
        <TestContextComponent
            rendered={this.rendered}
            nestNodeCount={this.state.nestNodeCount}
            forceRenderCount={this.state.renderCount}
            useContext={this.state.useContext}>
        </TestContextComponent>
      </div>
    );
  }
}

export default App;
