import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';


var PostContainer = React.createClass({
  render: function(){
    return <h1>Hello World!</h1>;
  }
});

/*
class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
  }

  handleClick(e) {
    this.setState({
      showAddPost: !this.state.showAddPost,
    });

    e.preventDefault();
  }

  add(name, title, content) {
    this.props.dispatch(Actions.addPostRequest({ name, title, content }));
    this.setState({
      showAddPost: false,
    });
  }

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.dispatch(Actions.fetchPosts());
    }
  }

  render() {
    return (
      <div>
        <h1>hello world</h1>
      </div>
    );
  }
}

PostContainer.need = [() => { return Actions.fetchPosts(); }];
PostContainer.contextTypes = {
  router: React.PropTypes.object,
};
*/


function mapStateToProps(store) {
  return {
    //counters: store.counters,
  };
}

export default connect(mapStateToProps)(PostContainer);
