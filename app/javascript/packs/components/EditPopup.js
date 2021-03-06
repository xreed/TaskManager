import React from 'react'
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import { fetch } from './Fetch'
import UserSelect from './UserSelect'

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
    },
    isLoading: true,
    errorsListShow: false,
  }

  loadCard = cardId => {
    this.setState({ isLoading: true })
    fetch(
      'GET',
      window.Routes.api_v1_task_path(cardId, { format: 'json' })
    ).then(({ data }) => {
      this.setState({ task: data })
      this.setState({ isLoading: false })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId)
    }
  }

  handleNameChange = e => {
    this.setState({ task: { ...this.state.task, name: e.target.value } })
  }

  handleDecriptionChange = e => {
    this.setState({ task: { ...this.state.task, description: e.target.value } })
  }

  handleCardEdit = () => {
    if (
      this.state.task.name &&
      this.state.task.description &&
      this.state.task.assignee &&
      this.state.task.assignee.id
    ) {
      fetch(
        'PUT',
        window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' }),
        {
          name: this.state.task.name,
          description: this.state.task.description,
          author_id: this.state.task.author.id,
          assignee_id: this.state.task.assignee.id,
          state: this.state.task.state,
        }
      ).then(response => {
        if (response.statusText == 'OK') {
          this.setState({ errorsListShow: false })
          this.props.onClose(this.state.task.state)
        } else {
          alert(
            'Update failed! ' + response.status + ' - ' + response.statusText
          )
        }
      })
    } else {
      this.setState({ errorsListShow: true })
    }
  }

  handleCardDelete = () => {
    fetch(
      'DELETE',
      window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' })
    ).then(response => {
      if (response.statusText == 'OK') {
        this.setState({ errorsListShow: false })
        this.props.onClose(this.state.task.state)
      } else {
        alert('DELETE failed! ' + response.status + ' - ' + response.statusText)
      }
    })
  }

  handleAuthorChange = value => {
    this.setState({ task: { ...this.state.task, author: value } })
  }

  handleAssigneeChange = value => {
    this.setState({ task: { ...this.state.task, assignee: value } })
  }

  handleFormClose = () => {
    this.setState({ errorsListShow: false })
    this.props.onClose()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {this.state.task.id} [{this.state.task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="taskAuthor">
                <ControlLabel>Author:</ControlLabel>
                <UserSelect
                  id="Author"
                  isDisabled="true"
                  value={this.state.task.author}
                  onChange={this.handleAuthorChange}
                />
              </FormGroup>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="taskAssignee">
                <ControlLabel>Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={this.state.task.assignee}
                />
              </FormGroup>
              <FormGroup
                controlId="errorsList"
                hidden={!this.state.errorsListShow}
              >
                <ControlLabel className="errorsList">
                  Please fill in all fields
                </ControlLabel>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button onClick={this.handleFormClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
