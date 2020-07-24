import React from 'react';
import Context from '../context';
import {uuid} from '../helpers';
import TaskForm from './TaskForm';

Array.prototype.findById = function(id)
{
    console.log('filter array by id: ', id);
    console.log('this arg: ', this);
    let filtered = this.filter((item) =>
    {
        return item._id === id;
    });
    if (filtered.length > 1)
    {
        console.log('Why does life hate met?');
    }
    return filtered[0];
}
export default class TaskList extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tasks: [],
            taskElements: null,
        }
    }
    renderTasks = () =>
    {

        console.log('getting tasks...');
        this.setState({
            tasks: this.context.tasks.filter((task) =>
            {
                return task.listId === this.props.listId;
            })
        }, function()
        {
            this.setState({
                taskElements: this.state.tasks.map((task) =>
                {
                    return (
                    <li key={uuid()}><span>{task.name}</span> - <span>{task.due}</span>{this.statusBox(task)}</li>
                    )
                })
            }, function()
            {
                console.log('state after update: ', this.state);
            })
        })

    }
    statusBox = (task) =>
    {
        return (<input key={uuid()} id={task._id} type='checkbox' checked={(task.status === 'complete')} onChange={this.handleCheck} />)
    }
    handleCheck = (event) =>
    {
        // do not prevent default here because I actually want it to happen as normal
        let taskId = event.target.getAttribute('id');
        let task = this.state.tasks.findById(taskId);
        let fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status: task.status === 'complete' ? 'pending' : 'complete' })
        }
        fetch(`http://localhost:6798/api/tasks/${taskId}`, fetchOptions)
        .then((response) => { return response.json()})
        .then((data) =>
        {
            //check to see if it actually updated...
            console.log('update data: ', data);
            this.context.getTasks()
            .then((whatever) =>
            {
                return this.renderTasks();
            })
            .catch((err) =>
            {
                console.log('This will never error....so.....');
            })

            // why won't my checkbox re-render?!?!?
        })
        .catch((err) =>
        {
            console.log('failed to update: ', err);
        })
    }
    componentDidMount()
    {
        this.renderTasks();
    }
    render(){
        return (
            <section className="taskList">
                <ul>
                    {this.state.taskElements}
                    <li key={uuid()}><TaskForm listId={this.props.listId} /></li>
                </ul>

            </section>
        )
    }
}
TaskList.contextType = Context;