import React, { Component } from 'react';
import _ from 'lodash'
import BPromise from 'bluebird'
import NavBar from '../components/NavBar'
import styled from 'styled-components'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { postPoll } from '../util/api'
import { uploadFile } from '../util/upload'

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const FormSection = styled.div`
  margin: 40px 0 100px 0;
`

const TextInput = styled.input`
  padding: 10px 10px;
  display: block;
  margin-bottom: 12px;
  border-radius: 5px;
  min-width: 300px;
  border: 1px solid #ddd;

  &[name="name"] {
    min-width: 180px;
  }
`

const TextArea = styled.textarea`
  padding: 10px 10px;
  display: block;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-width: 300px;
  min-height: 100px;
`

const FormLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
`

const SelectImagesContainer = styled.div`
  margin: 20px 0 0 0;
`

const ImageList = styled.div`
  list-style: none;
  padding: 0;
  margin: 20px 0 40px 0;
  display: flex;
  flex-wrap: wrap;

  img {
    align-self: flex-start;
    max-width: 200px;
    margin: 0 10px 10px 0;
  }
`

class NewPollPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      form: {
        name: '',
        title: '',
        description: '',
        files: [],
      }
    }
  }

  render() {
    return (
      <div className="NewPollPage">
        <NavBar />

        <TextContainer>
          <h2>Create a new poll</h2>
          <p>
            Please note that polls are deleted after a week of inactivity.
          </p>
        </TextContainer>

        <FormSection>
          <TextContainer>
            <FormLabel>Your name</FormLabel>
            <TextInput type="text" name="name" placeholder="Your name" value={this.state.form.name} onChange={this.onInputChange} />

            <FormLabel>Poll title</FormLabel>
            <TextInput type="text" name="title" placeholder="Poll title" value={this.state.form.title} onChange={this.onInputChange} />

            <FormLabel>Poll description</FormLabel>
            <TextArea placeholder="What is the best picture for our Facebook cover image?" value={this.state.form.description} onChange={this.onDescriptionChange} />

            <SelectImagesContainer>
              <label>
                <img src="public/upload-icon.svg" alt="" />
                <a>{this.state.form.files.length > 0 ? 'Reselect' : 'Select'} images</a>
                <input style={{visibility: 'hidden', display: 'none'}} hidden multiple type="file" accept="image/*;capture=camera" onChange={this.onFileInputChange}/>
              </label>

              <ImageList>
                {
                  _.map(this.state.form.files, (f, i) => {
                    return <img key={i} src={f.objectUrl} alt="" />
                  })
                }
              </ImageList>
            </SelectImagesContainer>

            <Button disabled={!this.isFormReady() || this.state.loading} invert onClick={this.onPublishClick}>
              { this.state.loading ? 'Publishing..' : 'Publish' }
            </Button>
          </TextContainer>
        </FormSection>
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

  onFileInputChange = (e) => {
    const { files } = e.target
    const isTooLarge = _.some(files, f => {
      if (f.size > 1024 * 1024 * 4) {
        return true
      }

      return false;
    })

    if (isTooLarge) {
      return alert('Maximum allowed file size is 4MB.')
    }

    this.setState({
      form: _.extend(this.state.form, {
        files: _.map(files, f => ({ formFile: f, objectUrl: URL.createObjectURL(f) })),
      }),
    })
  }

  onDescriptionChange = (e) => {
    this.setState({
      form: _.merge(this.state.form, {
        description: e.target.value,
      }),
    });
  }

  isFormReady() {
    const enoughImages = this.state.form.files.length > 1
    return enoughImages && this.state.form.name && this.state.form.title && this.state.form.description
  }

  onPublishClick = () => {
    this.setState({
      loading: true,
    })

    BPromise.map(this.state.form.files, file => uploadFile(file.formFile), { concurrency: 10 })
      .then((urls) => {
        return postPoll({
          title: this.state.form.title,
          authorName: this.state.form.name,
          description: this.state.form.description,
          targets: _.map(urls, u => ({ imageUrl: u })),
        })
      })
      .then(res => {
        const poll = res.data
        const { history } = this.props
        history.push(`/polls/${poll.slug}/share`)
      })
      .catch(err => {
        this.setState({ loading: false })

        console.error(err)
        alert(err.message)
      })
  }
}

export default NewPollPage;
