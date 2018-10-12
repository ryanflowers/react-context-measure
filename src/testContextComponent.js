import React, { PureComponent, Component } from 'react';

const {Provider, Consumer} = React.createContext("test");

class TextContextInnerComponent extends Component {

  componentDidMount() {
    this.props.rendered();
  }

  componentDidUpdate() {
    this.props.rendered();
  }

  render() {
    return null
  }
}

export class TestContextComponent extends PureComponent {

  constructor() {
    super();
  }

  renderNode = (children) => {
    const innerNode = <div>{ children }</div>;
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

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeCount}>
              {renderIterations()}
            </Provider> :
             renderIterations()
    );
  }
}


