import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount = () => {
    this.getBlogPost();
  }

  getBlogPost = () => {
    axios({
      url: 'api',
      method: 'GET'
    }).then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log('Data has been received!!');
    }).catch(() => {
      console.log('Error retrieving error');
    })
  }

  handleChange = ({target}) => {
    const {name, value} = target;
    this.setState({
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };
    console.log(payload);
    axios({
      url: 'api/save',
      method: 'POST',
      data: payload
    }).then(() => {
      console.log(`data has been sent to the server`);
      this.resetUserInputs();
      this.getBlogPost();
    })
    .catch(() => {
      console.log(`Internal server error`);
    });
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  } 

  displayPost = (posts) => {
    if(!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blogPostDisplay">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }

  render() {

  console.log('State:', this.state);

    //JSX
    return(
      <div className="app">
        <h2>Notes Down</h2>
        <form onSubmit = {this.submit}>
          <div className="form-input">
            <input 
              type = "text"
              name = "title"
              placeholder = 'title'
              value = {this.state.title}
              onChange = {this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea 
              name="body" 
              placeholder = "body" 
              cols="30" rows="10" 
              value={this.state.body} 
              onChange={this.handleChange}>
            </textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayPost(this.state.posts)}
        </div>
      </div>
    );
  }

}

export default App;