import React, { PureComponent, Component } from 'react';

const {Provider, Consumer} = React.createContext("test");

const divStyle = {
  border: '2px solid black',
  margin: '2px'
};

class TextContextInnerComponent extends Component {

  componentDidMount() {
    this.props.rendered();
  }

  componentDidUpdate() {
    this.props.rendered();
  }

  render() {
    return (<div>{ "Inner most leaf" }</div>)
  }
}

export class TestContextComponent extends PureComponent {

  constructor() {
    super();
    this.memoizedWithContext = null;
    this.memoizedWithoutContext = null;
  }

  renderNode = (children) => {
    const innerNode = <div style={divStyle}>{ children }</div>;
    return this.props.useContext ? <Consumer>{ () => innerNode }</Consumer> : innerNode;
  }

  render() {

    const renderIterations = () => {
      let nodes = <TextContextInnerComponent rendered={this.props.rendered}/>;
      for(var i = 0; i < this.props.nestNodeCount; i++) {
        nodes = this.renderNode(nodes);
      }
      return nodes;
    };

    let result;
    if (this.props.useContext) {
      if (this.memoizedWithContext) {
        result = this.memoizedWithContext;
      } else {
        result = renderIterations();
      }
    } else{
      if (this.memoizedWithoutContext) {
        result = this.memoizedWithoutContext;
      } else {
        result = renderIterations();
      }
    }

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeCount}>
              {result}
            </Provider> :
             result
    );
  }
}


