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
      const wrapperCount = 4;
      let nodeCount = 0;

      for(var level = 0; level < this.props.nestNodeDepth; level++) {
        nodes = this.renderNode(<div>{nodes}</div>, this.props.useContext, this.props.useContext ? wrapperCount : 0);

        if(nodeCount < 6) { // Match ~7K nodes same as teams.com
          nodes = <div>
            {nodes}
            {nodes}
            {nodes}
            {nodes}
          </div>
          nodeCount++;
        }
      }

      return nodes;
    };

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeDepth}>
              {renderNestedNodes()}
            </Provider> :
             renderNestedNodes()
    );
  }
}


