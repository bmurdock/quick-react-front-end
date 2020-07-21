import React from 'react';
export default class ListForm extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        _id: props._id || 'new',
        name: props.name || '',
        description: props.description || '',
      }
    }
    changeHandler = (event) =>
    {
      let field = event.target.getAttribute('name');
      let stateObject = {};
      stateObject[field] = event.target.value;
      this.setState(stateObject);
    }
    handleSubmit = (event) =>
    {
      event.preventDefault();
      // and some other stuff
      if (this.state._id === 'new')
      {
        // send all of the state data to the create list api endpoint
      }
      else
      {
        // send all of the state data to the update list api endpoint
        fetch()
        .then(data =>
        {
          return data.json();
        })
      .then(result =>
        {
          // call get lists again to update my app
        })
      }
    }
    render()
    {
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
          <input type="submit" value="Create" />
        </form>
      )
    }
  }