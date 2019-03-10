import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component { 
  state = {
    persons: [
      {id:'1', name:'Max', age:28},
      {id:'2', name:'Manu', age:18},
      {id:'3', name:'Dan', age:24}
    ],
    showPersons: false
  };

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name:newName, age:28},
        {name:'Manu', age:29},
        {name:'Vicky', age:57}
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    //const person = Object.assign({}, this.state.person[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState(
      {
        showPersons: !doesShow
      }
    )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons) {
      persons =  (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              click={()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              />
          })}
        </div>
      );
      style.backgroundColor = 'red';      
    }

    const assignedclasses = [];
    if(this.state.persons.length <= 2){
      assignedclasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      assignedclasses.push(classes.bold);
    }

    return (

      <div className={classes.App}>
        <p className={assignedclasses.join(' ')}>Hooray~~</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}                
      </div>

    );  
  } 
}

export default App;

