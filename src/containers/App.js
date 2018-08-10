import React, { Component } from 'react';
import classes from './App.css';
import Person from '../Persons/Person/Person';
import Persons from '../Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }
  //Below handler takes an event and an id, it then finds the corresponding id in our state and returns them if they match
  //If they match it takes the id we just found and creates a new object to store it in
  //We then take the corresponding name of the person(that we found) and get the target value
  //So that we only change the one name and not all of them. We then create new objects so that we dont
  //Mutate the state directly
  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    //Creates a new array that we can mutate instead of the state directly
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    let persons = null;
   

    if ( this.state.showPersons ) {
      persons = (
          <Persons persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}></Persons>
      );

      
    }

    

    return (
        <div className={classes.App}>
          <Cockpit  showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
