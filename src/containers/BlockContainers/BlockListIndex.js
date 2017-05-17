import React from  'react';
import { connect } from 'react-redux';
import { blocksActions, blocksSelectors } from '../../store/blocks/index';
import { BlockList } from '../../components/blocks/BlockList';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'




class BlockListIndex extends React.Component{
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };



  constructor(props, context) {
    super(props, context);
    this.navigate = this.navigate.bind(this);
    this.state ={
      currentPage : 1,
      loading:true

    }
  }


  componentDidMount(){
    this.fetchBlocks({page: this.state.currentPage});
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.data.blocks.length>0){
      this.setState({loading:false})
    }
  }

  fetchBlocks(params) {
    this.context.store.dispatch(blocksActions.fetchBlocks(params));
  }

  navigate(page){
    //alert(page);

   // this.props.data.currentPage = page;
    this.setState({currentPage : page})
    this.setState({loading:true})
    this.fetchBlocks({page: page});
  }

  render(){

    const {
      params,
      data,
    } = this.props;
    console.log(Math.ceil(data.lastpage));

    return(
      <div >
        <h2>Blocks</h2>
        <Segment color='blue' raised={false} basic>
          <Dimmer inverted active={this.state.loading} id="block-Container">
            <Loader inverted/>
          </Dimmer>

          {

            data.blocks != undefined &&
            <BlockList blocks={data.blocks} onNavigate={this.navigate} currentpage = {this.state.currentPage} maxpage = {Math.ceil(data.lastpage)}/>
          }
        </Segment>

      </div>
    );
  }
}

function mapStateToProps(state) {
    return  {
      params: blocksSelectors.getParams(state),
      data: blocksSelectors.getBlocks(state)
    }
}

export default connect(mapStateToProps, {blocksActions, blocksSelectors})(BlockListIndex);


