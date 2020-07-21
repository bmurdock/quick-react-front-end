import React from 'react';
import Context from '../context';
import { uuid } from '../helpers';
export default class ListForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: props._id || 'new',
			name: props.name || '',
			description: props.description || ''
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
		console.log('first state: ', this.state);
		// and some other stuff
		let route = 'http://localhost:6798/api/lists';
		// we need the _id in state to make stuff work but we don't actually want to submit it
		let submitData = { ...this.state };
		delete submitData._id;
		let fetchOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(submitData)
		};
		if (this.state._id !== 'new') {
			fetchOptions.method = 'PUT';
			route += `/${this.state._id}`;
		}
		// send all of the state data to the update list api endpoint
		console.log('state: ', this.state);
		console.log('route: ', route);
		console.log('fetchOptions: ', fetchOptions);
		fetch(route, fetchOptions)
			.then((data) => {
				return data.json();
			})
			.then((result) => {
				// call get lists again to update my app
				console.log('result: ', result);
				this.context.getLists();
			})
			.catch((err) => {
				console.log('Error updating/creating list: ', err);
			});
	};
	getListTasks = (event) => {
		// Check to see if this is a JavaScript event object (making assumptions because instanceof would be a better check)
		let listId;
		if (event.target) {
			listId = event.target.getAttribute('id');
		} else if (typeof event === 'string') {
			listId = event;
		} else {
			throw new Error('I have no idea what you are trying to do...');
		}
		if (event === 'new') {
			return null;
		}
		let listTasks = this.context.tasks.filter((task) => {
			return task.listId && task.listId === listId;
		});

		return listTasks.map((item) => {
			return (
				<li key={item._id} id={item._id} onClick={this.updateTask}>
					{item.name || 'Unknown'}
				</li>
			);
		});
	};
	componentWillUnmount() {
		console.log('unmounting');
	}
	addTask = (event) => {
		event.preventDefault();
	};
	render() {
		let buttonText = 'Create';
		let taskButton = null;
		if (this.state._id !== 'new') {
			buttonText = 'Update';
			taskButton = <button onClick={this.addTask}>Add Task</button>;
		}
		return (
			<section className="forms-section">
				<form onSubmit={this.handleSubmit}>
					<div className="form-field">
						<label>Name</label>
						<input name="name" value={this.state.name} onChange={this.changeHandler} />
					</div>
					<div className="form-field">
						<label>Description</label>
						<input name="description" value={this.state.description} onChange={this.changeHandler} />
					</div>
					<input type="submit" value={buttonText} />
				</form>
				<ul>{this.getListTasks(this.state._id)}</ul>
				{taskButton}
			</section>
		);
	}
}
ListForm.contextType = Context;
