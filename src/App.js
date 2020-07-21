import React from 'react';
import TaskForm from './components/TaskForm';
import './App.css';




class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      tasks: [],
      taskList: [],
      editForm: '',
      listId: '',
      lists: [],
      listElements: [],
      listTasks: [],
      thingToDisplay: '',
    }
  }

  getTasks = () =>
  {
    fetch('http://localhost:6798/api/tasks')
    .then((response) =>
    {
      return response.json()
    })
    .then((data) =>
    {
      console.log('data from api: ', data);
      this.setState({
        tasks: data,
        taskList: data.map((item) =>
        {
          return <li 
                    key={item._id}
                    id={item._id}
                    onClick={this.updateTask}
                    >{item.username || "Unknown"}</li>
        }),
        editForm: ''
      })
    })
    .catch();
  }

  updateTask = (event) =>
  {
    // this is the id of the item i want to update
    //console.log('all tasks: ', this.state.tasks);
    const id = event.target.getAttribute('id');
    const stupidFind = (id) =>
    {
      for (let i = 0; i < this.state.tasks.length; i++)
      {
        let task = this.state.tasks[i];
        if (task._id === id)
        {
          return task;
        }
      }
      return null;
    }

    let thisTask = stupidFind(id);
    //thisTask = thisTask[0];
    //console.log('thisTask: ', thisTask);
    //console.log('id: ', id);

    this.setState({
      editForm: ''
    }, function()
    {

    });


    return;

  }
  getLists = () =>
  {
    fetch('http://localhost:6798/api/lists')
    .then((response) =>
    {
      return response.json()
    })
    .then((data) =>
    {
      console.log('data from api: ', data);
      this.setState({
        lists: data,
        listElements: data.map((item) =>
        {
          return <li 
                    key={item._id}
                    id={item._id}
                    onClick={this.getListTasks}
                    >{item.name || "Unknown"}</li>
        }),
        editForm: ''
      })
    })
    .catch();

  }

  getListTasks = (event) =>
  {
    let listId = event.target.getAttribute('id');
    let listTasks = this.state.tasks.filter((task) =>
    {
      return task.listId && task.listId === listId;
    });
    this.setState({
      listTasks: listTasks.map((item) =>
      {
        return <li 
        key={item._id}
        id={item._id}
        onClick={this.updateTask}
        >{item.name || "Unknown"}</li>
      })
    })
  }


  componentDidMount()
  {
    this.getTasks();
    this.getLists();
  }

  doCreateListThing = (event) =>
  {
    event.preventDefault();
    this.setState({
      thingToDisplay: <ListForm />,
    });

  }
  render()
  {
    return (
      <div className="App">
        <h2>Things I need to do</h2>
        <p>Show lists</p>
        <p onClick={this.doCreateListThing}>Create List</p>
        <p>Add Item To List</p>
        <p>Mark List Items Complete</p>

        <h2>Lists</h2>
        <ul>
          {this.state.listElements}
        </ul>

        <h2>Tasks For Your Selected List</h2>
        <ul>
          {this.state.listTasks}
        </ul>
        <h2>Working Area</h2>
        {this.state.thingToDisplay}
      </div>
    )
  }

}

export default App;
