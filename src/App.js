import React, { Component } from 'react';
import {TestContextComponent} from "./testContextComponent";

class App extends Component {

  constructor() {
    super();

    this.runCount = 50;
    const defaultNestedNodeDepth = 100;
    this.defaultUseContext = true;


    this.runResults = [];
    this.log = [];
    this.startTime = 0;
    this.runsReported = false;
    this.state = {
      renderCount: 0,
      inputNestNodeDepth: defaultNestedNodeDepth,
      nestNodeDepth: defaultNestedNodeDepth,
      inputUseContext: this.defaultUseContext,
      useContext: this.defaultUseContext,
      result: [] };
  }

  componentDidMount() {
    this.rendered();
  }

  componentDidUpdate() {
    this.rendered();
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
    this.runCount--;
    const endTime = Date.now();
    const result = endTime - this.startTime;
    this.runResults.push(result);

    if(this.runCount > 0) {
      this.setState({
        renderCount: this.state.renderCount + 1,
        nestNodeDepth: this.state.inputNestNodeDepth,
        nestedLevelWidth: this.state.nestedLevelWidth,
        useContext: this.state.inputUseContext
      });
      console.log(this.runCount);
    } else {
      if(!this.runsReported) {
        this.runResults.map(result => console.log(result));
        const total = this.runResults.reduce((prev, current) => {
          return prev + current;
        })
        this.runsReported = true;
        this.setState({ result: total/this.runResults.length })
      }
    }
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
