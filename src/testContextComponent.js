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
    return (<div>{ "Inner most leaf - " + this.props.value }</div>)
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

  renderIterations = () => {
    let result;

    if(this.props.useContext) {
      if(this.memoizedWithContext) {
        result = this.memoizedWithContext;
      } else {
        let nodes = <TextContextInnerComponent rendered={this.props.rendered}/>;
        for(var i = 0; i < this.props.nestNodeCount; i++) {
          nodes = this.renderNode(nodes);
        }
        result = nodes;
      }
    } else{
      if(this.memoizedWithoutContext) {
        result = this.memoizedWithoutContext;
      } else {
        let nodes = <TextContextInnerComponent rendered={this.props.rendered}/>;
        for(var i = 0; i < this.props.nestNodeCount; i++) {
          nodes = this.renderNode(nodes);
        }
        result = nodes;
      }
    }

    return result;
  }

  render() {

    console.log("this.props.nestNodeCount = " + this.props.nestNodeCount);
    console.log("this.props.useContext = " + this.props.useContext);

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeCount}>
              {this.renderIterations()}
            </Provider> :
             this.renderIterations()
    );
  }
}


