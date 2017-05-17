import React from  'react';
import { connect } from 'react-redux';

import { BlockList } from '../../components/blocks/BlockList';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import {fetchBlocks,deleteBlock} from '../../actions/blockActions';




class BlockListIndex extends React.Component{
 


  componentDidMount(){

   var hello=  this.props.fetchBlocks();
  console.log(hello);
  }
  
  render(){

    return(
      <div >
        <h2>Blocks</h2>
        <Segment color='blue' raised={false} basic>
          {/*<Dimmer inverted active={this.state.loading} id="block-Container">
            <Loader inverted/>
          </Dimmer>*/}

          {

            this.props.blocks != undefined &&
            <BlockList blocks={this.props.blocks} />
          }
        </Segment>

      </div>
    );
  }
}
BlockListIndex.propTypes = {
    blocks: React.PropTypes.array.isRequired,
    fetchBlocks:React.PropTypes.func.isRequired,
    deleteBlock:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {blocks: state.blocks}
}
export default connect(mapStateToProps, {fetchBlocks, deleteBlock })(BlockListIndex);


