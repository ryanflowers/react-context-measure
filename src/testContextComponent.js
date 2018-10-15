import React, {Component, PureComponent} from 'react';

const {Provider, Consumer} = React.createContext("test");

let renders = 0;

class TextContextInnerComponent extends Component {

  componentDidMount() {
    renders++;
    console.log("leaf render number" + renders);
  }

  componentDidUpdate() {
    renders++;
    console.log("leaf render number" + renders);
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

      let nodes = <TextContextInnerComponent forceRenderCount={this.props.forceRenderCount}></TextContextInnerComponent>;
      const wrapperCount = 4;
      let nodeCount = 7;

      for(var level = 0; level < this.props.nestNodeDepth; level++) {
        nodes = this.renderNode(<div>{nodes}</div>, this.props.useContext, this.props.useContext ? wrapperCount : 0);

        if(nodeCount > 0) { // 6 levels with a branching factor of 4
          nodes = <div>
            {nodes}
            {nodes}
            {nodes}
            {nodes}
          </div>
          nodeCount--;
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


