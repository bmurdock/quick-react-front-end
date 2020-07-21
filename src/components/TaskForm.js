import React from 'react';
import { uuid } from '../helpers';

const TASK_STATUSES = [ 'pending', 'complete' ];

export default class TaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Name</label>
					<input name="name" value={this.state.name} onChange={this.changeHandler} />
				</div>
				<div>
					<label>Description</label>
					<input name="description" value={this.state.description} onChange={this.changeHandler} />
				</div>
				<div>
					<label>Due</label>
					<input name="due" value={this.state.due} onChange={this.changeHandler} />
				</div>
				<div>
					<input name="status" />
				</div>
			</form>
		);
	}
}
