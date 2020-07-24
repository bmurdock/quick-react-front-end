import React from 'react';
import Context from '../context';
import { uuid } from '../helpers';
import TaskList from './TaskList';

const TASK_STATUSES = [ 'pending', 'complete' ];

export default class TaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            listId: props.listId || 'error',
			name: props.name || '',
			description: props.description || '',
			due: props.due || '',
			status: props.status || 'pending'
		};
	}
	changeHandler = (event) => {
		let field = event.target.getAttribute('name');
		let stateObject = {};
		stateObject[field] = event.target.value;
		this.setState(stateObject);
	};

	handleSubmit = (event) => {
		event.preventDefault();
        // and some other stuff
        let route = `http://localhost:6798/api/tasks`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        };
        fetch(route, options)
        .then((res) => { return res.json()})
        .then((data) =>
        {
            console.log('should have added a new task: ', data);
            this.context.getTasks();
        })
        .catch((err) =>
        {
            console.log('might not have added a new task: ', err);
        })
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="taskRow">

					<input name="name" value={this.state.name} onChange={this.changeHandler} placeholder='Name' />

					<input name="description" value={this.state.description} onChange={this.changeHandler} placeholder='Description' />

					<input name="due" value={this.state.due} onChange={this.changeHandler} placeholder='due' />
                    <input className="small" type="submit" value="Add Task" />
                </div>
			</form>
		);
	}
}
TaskForm.contextType = Context;
