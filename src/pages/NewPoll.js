import React, { Component } from 'react';
import _ from 'lodash'
import { Navigation } from 'junctions'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { postPoll } from '../util/api'

class NewPollPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        title: '',
        description: '',
      }
    }
  }

  render() {
    return (
      <div className="NewPollPage">
        <NavBar />

        <div>
          <h2>Create a new poll</h2>
          <p>
            Please note that polls are deleted after a week of inactivity.
          </p>
        </div>

        <div>
          <input type="text" name="name" placeholder="Your name" value={this.state.form.name} onChange={this.onInputChange} />
          <input type="text" name="title" placeholder="Poll title" value={this.state.form.title} onChange={this.onInputChange} />
          <textarea placeholder="What is the best picture for our Facebook cover image?" value={this.state.form.description} onChange={this.onDescriptionChange} />
          <a onClick={() => console.log('Select images')}>
            <img src="public/upload-icon.svg" alt="" />
          </a>

          <Button onClick={this.onPublishClick}>Publish</Button>
        </div>

        <Footer />
      </div>
    )
  }

  onInputChange = (e) => {
    this.setState({
      form: _.merge(this.state.form, {
        [e.target.name]: e.target.value,
      }),
    });
  }

  onDescriptionChange = (e) => {
    this.setState({
      form: _.merge(this.state.form, {
        description: e.target.value,
      }),
    });
  }

  onPublishClick = () => {
    console.log('Publish')
    postPoll({
      title: this.state.form.title,
      authorName: this.state.form.name,
      description: this.state.form.description,
      targets: [
        { imageUrl: 'https://via.placeholder.com/350x150' },
        { imageUrl: 'https://via.placeholder.com/350x155' },
        { imageUrl: 'https://via.placeholder.com/450x155' },
      ]
    })
      .then(res => {
        const poll = res.data
        window.location = `/polls/${poll.slug}/share`
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default NewPollPage;
