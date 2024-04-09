import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(comment => {
        if (id === comment.id) {
          return {...comment, isLiked: !comment.isLiked}
        }
        return comment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setSate({
      comment: event.target.value,
    })
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="">Comments</h1>
          <div className="image-content">
            <form onSubmit={this.onAddComment}>
              <p>say something about 4.0 Technologies</p>

              <input
                type="text"
                placeholder="your Name"
                className="comment-input"
                onChange={this.onChangeNameInput}
                value={name}
              />
              <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                deleteComment={this.deleteComment}
                toggleIsLiked={this.toggleIsLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
