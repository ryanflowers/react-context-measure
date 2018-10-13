import React, { Component } from 'react';
import {TestContextComponent} from "./testContextComponent";

/**
 * Teams DOM
 * Max depth of deepest branch 63 nodes
 * Total node count 7689
 * Top 20 widest levels
 * 0: 59
 *1: 59
 *2: 59
 *3: 33
 *4: 32
 *5: 28
 *6: 9
 *7: 8
 *8: 7
 *9: 7
 *10: 6
 *11: 5
 *12: 5
 *13: 5
 *14: 4
 *15: 4
 *16: 4
 *17: 4
 *18: 4
 *19: 4
 */


class App extends Component {

  constructor() {
    super();
    const defaultNodeCount = 2;
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
