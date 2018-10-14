import React, { Component } from 'react';
import {TestContextComponent} from "./testContextComponent";

/**
 * Machine specs??
 *
 * 10 runs per suite
 *
 * With 4 context wrappers
 * Depths per run
 * 100 -
 * 1000 -
 * 3000 -
 *
 * Without context wrappers
 * Depths per run
 * 100 -
 * 1000 -
 * 3000 -
 *
 * Teams DOM
 * Max tree depth 63 nodes
 * Total node count 7689
 * 500 levels are 3 nodes wide
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

/**
 * Number of nodes on the page
 * document.getElementsByTagName('*').length
 *
 * Deepest branch
 * var el = $("html");
 * var i = 0;
 *
 * while ((el = el.children()).length) {
 *   i++;
 * }
 */


class App extends Component {

  constructor() {
    super();
    this.runCount = 1;
    const defaultNestedNodeDepth = 100
    this.defaultUseContext = true;
    this.runResults = [];
    this.log = [];
    this.startTime = 0;
    this.state = {
      renderCount: 0,
      inputNestNodeDepth: defaultNestedNodeDepth,
      nestNodeDepth: defaultNestedNodeDepth,
      inputUseContext: this.defaultUseContext,
      useContext: this.defaultUseContext,
      result: [] };
  }

  // onClick = () => {
  //   if(this.state.inputNestNodeDepth <= 10000) {
  //     this.setState({ renderCount: this.state.renderCount + 1, nestNodeDepth: this.state.inputNestNodeDepth, useContext: this.state.inputUseContext });
  //   } else{
  //     alert("Too many nodes browser will puke. Keep it under 10000")
  //   }
  // }

  onNestNodeCountChange = (event) => {
    //this.setState({ inputNestNodeDepth: event.target.value });
  }

  onUseContextChange = (event) => {
    //this.setState({ inputUseContext: event.target.value === "true" ? true : false });
  }

  rendered = () => {
    const endTime = Date.now();
    const result = endTime - this.startTime;
    //this.log.push("Run " + this.state.renderCount + ", Render time(ms) " + result + ", Using react context:" + this.state.useContext);
    this.runResults.push(result);

    if(this.runCount !== 0) {
      this.runCount--;
      this.setState({
        renderCount: this.state.renderCount + 1,
        nestNodeDepth: this.state.inputNestNodeDepth,
        nestedLevelWidth: this.state.nestedLevelWidth,
        useContext: this.state.inputUseContext
      });
    } else {
      const total = this.runResults.reduce((prev, current) => {
        return prev + current;
      })
      this.setState({ result: total/this.runResults.length })
    }
    //this.setState({ result: this.log });
  }

  render() {

    this.startTime = Date.now();

    return (
      <div className="App">
        <label>Nest node count:</label>
        <input type="text" value={this.state.inputNestNodeDepth} onChange={this.onNestNodeCountChange} />
        <br/>
        <label>Use react context:</label>
        <div>
          <label>True:</label>
          <input type="radio" checked={this.state.inputUseContext === true} value="true" onChange={this.onUseContextChange} />
          <label>False:</label>
          <input type="radio" checked={this.state.inputUseContext === false} value="false" onChange={this.onUseContextChange} />
        </div>
        <br/>
        {/*<button onClick={this.onClick}>Rerender!</button>*/}
        <br/>
        <div>
          {/*{this.state.result.map((item) => (<div>{item}</div>))}*/}
          { "Average Run:" + this.state.result}
        </div>
        <TestContextComponent
            rendered={this.rendered}
            nestNodeDepth={this.state.nestNodeDepth}
            forceRenderCount={this.state.renderCount}
            useContext={this.state.useContext}>
        </TestContextComponent>
      </div>
    );
  }
}

export default App;
