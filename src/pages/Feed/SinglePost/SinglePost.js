import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';
import withRouter from '../../../hoc/withRouter';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    console.log(this.props.location.pathname)
    const postId = this.props.location.pathname;
    fetch('https://rest-projects.herokuapp.com/feed/post' + postId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: 'https://rest-projects.herokuapp.com/' + resData.post.imageUrl.toString().split('\\').join('/'),
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
        console.log(this.state.image)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default withRouter(SinglePost);
