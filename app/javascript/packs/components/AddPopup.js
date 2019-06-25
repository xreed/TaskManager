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

export default class AddPopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
    },
    errorsListShow: false,
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }

  handleDecriptionChange = e => {
    this.setState({ description: e.target.value })
  }

  handleCardAdd = () => {
    if (
      this.state.name &&
      this.state.description &&
      this.state.assignee &&
      this.state.assignee.id
    ) {
      fetch('POST', Routes.api_v1_tasks_path(), {
        task: {
          name: this.state.name,
          description: this.state.description,
          assignee_id: this.state.assignee.id,
        },
      }).then(response => {
        if (response.statusText == 'Created') {
          this.setState({
            name: '',
            description: '',
            assignee: null,
            errorsListShow: false,
          })
          this.props.onClose(true)
        } else {
          alert(response.status + ' - ' + response.statusText)
        }
      })
    } else {
      this.setState({ errorsListShow: true })
    }
  }

  handleAssigneeChange = value => {
    this.setState({ assignee: value })
  }

  handleFormClose = () => {
    this.setState({
      name: '',
      description: '',
      assignee: null,
      errorsListShow: false,
    })
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="taskAssignee">
                <ControlLabel>Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={this.state.assignee}
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
            <Button onClick={this.handleFormClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
