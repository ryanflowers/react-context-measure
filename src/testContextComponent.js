import React, { PureComponent } from 'react';

const {Provider, Consumer} = React.createContext("test");

export class TestContextComponent extends PureComponent {

  componentDidMount() {
    this.props.rendered();
  }

  componentDidUpdate() {
    this.props.rendered();
  }

  renderNode = () => {
    return <Consumer><div></div></Consumer>
  }

  renderIterations = () => {
    // for(var i = 0; i < this.props.nestNodeCount; i++) {
    //   console.log(i)
    // }
    console.log("this.props.nestNodeCount = " + this.props.nestNodeCount);
    console.log("this.props.useContext = " + this.props.useContext);
    return <div>Test</div>
  }

  render() {
    // Start perf counter
    return (
        <Provider>
          { this.renderIterations() }
        </Provider>
    );
  }
}


