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

  renderNode = (innerNode, useContext, wrapperCount) => {

    if(useContext) {
      if(wrapperCount === 0) {
        return innerNode;
      }
      return this.renderNode(<Consumer>{ () => innerNode }</Consumer>, useContext, wrapperCount - 1);
    } else{
      return innerNode;
    }
  }

  render() {

    const renderNestedNodes = () => {
      let nodes = <TextContextInnerComponent rendered={this.props.rendered}/>;
      for(var i = 0; i < this.props.nestNodeCount; i++) {
        nodes = this.renderNode(<div>{ nodes }</div>, this.props.useContext, this.props.useContext ? 4 : 0);
      }
      return nodes;
    };

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeCount}>
              {renderNestedNodes()}
            </Provider> :
             renderNestedNodes()
    );
  }
}


