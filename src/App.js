/*import logo from './logo.svg';*/
import './App.css';
import React, {Component} from 'react';
import {ToDoBanner} from './ToDoBanner';
import {ToDoRow} from './ToDoRow';
import {ToDoCreator} from './ToDoCreator';
import 'bootstrap/dist/css/bootstrap.css';


export default class App extends Component{
  //  Above we have created a class called App the extends the functionality of the Component class

  //  The export keyword above makes the class available for use outside of the JS file where it is created


  constructor(){

    super();

    //React comonents ahve a specail property called "state". The "state" is used to define the state of data (props)

    this.state = {
      userName:"Nicholas Zuniga",
      todoItems:[
        {action:"Watch Anime",done:false},
        {action:"Eat Soup",done:true},
        {action:"Vacuum Lawn",done:false},
        {action:"Solve World Peace",done:false},
        {action:"Go to Zoo",done:false},
      ]
    }

  }//End Constructor

  //--Function to display Table rows----------
  todoTableRows =(doneProperty) => this.state.todoItems.filter(
    x => x.done == doneProperty).map(
      y => <ToDoRow
      key = {y.action}
      myToDoItem = {y}
      callback = {this.toggleToDo}//The callback will be invoked (executed, run) when everything in <ToDoRow> is finished AND the user clicks the input box
      // The data passed into the callback from the ToDoRow Component is passed automataically into the function defined in the callback.
      />

  );

  //Feature 4
  //--Function to toggle "done" property to true/false (opposite of what it was)
  //  .setState allows the in memory data to be updated
  //  When setState is invoked, React will make a new object with the changes.  Under the hood React will compare the new object with the DOM version of the object.  If there is a difference between those 2 objects then the DOM will get re-drawn (NOT a reload) and then we see the changes.

  toggleToDo = (checkedToDoItem) =>  this.setState(
    {
      todoItems:this.state.todoItems.map(
        x => x.action == checkedToDoItem.action ? {...x, done: !x.done} : x
      )
    }
    
  );
//  The createNewTodoCallback method below is the callback for the ToDoCreator component
  //  The "newToDoAction" parameter passed into the createNewTodoCallback method below comes from where the callback it initiated from- which is in the createNewTodo method of the ToDoCreator Component

  createNewToDoCallback = (newToDoDescription) => {
    //  The if block below checks if the newly created todo item is NOT already in the list of todos.  If it is NOT already in the list then it adds it as below.  If it is in the list already there is no else block so nothing happens - this is not too user friendly but.... :)

    if(!this.state.todoItems.find(
      x => x.action == newToDoDescription)){
        this.setState({
          todoItems:[
            ...this.state.todoItems,
            {action: newToDoDescription, done:false}
          ]
          //By default every new todo should not be done - in other words its done property shave have a value of false
        },
        () => localStorage.setItem("storedTodos", JSON.stringify(this.state))
        )//end of setState
      }//end of if block

  }

  //feature 5e
  //  The componentDidMount method below is a built in react method to handle logic for when the app "mounts" or "loads"
  //  The localStorage object is a React built in object that allows persistent local storage much like how cookies work
  //  localStorage reference: "!([{'https://programmingwithmosh.com/react/localstorage-react/'}])!"


  componentDidMount = () => {
    let storedData = localStorage.getItem("storedTodos");

    this.setState(
      storedData != null ?  JSON.parse(storedData) : 
      {
        userName: "Default UserName",
        todoItems:[
          {action: "Default todo", done: false}
        ]
      }
    );
  }

  render = () => 
  <div id="StartingPoint">
    {/*Features 1 & 2 */}
    <ToDoBanner 
    userName ={this.state.userName}
    todoItems = {this.state.todoItems}
    />

    {/* Feature 5a */}
    <ToDoCreator
    callback = {this.createNewToDoCallback}
    />

    {/*Features 3 and 4 */}
    <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Complete</th>
        </thead>
        <tbody>
          {this.todoTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">


      </div>

          {/*Features 6 and 7 */}
    <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Incomplete</th>
        </thead>
        <tbody>
          {this.todoTableRows(true)}
        </tbody>
      </table>

  </div>

}//End Class



/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
/*export default App;*/
