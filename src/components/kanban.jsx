import React from "react";
import Card from './card.jsx';
// import { HTML5Backend } from "react-dnd-html5-backend";
// import DragDropContext from 'react-dnd';




class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inprogress: [],
      done: [],
      title: "New Task",
      description: "add description",
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.addProgress = this.addProgress.bind(this);
    this.addDone = this.addDone.bind(this);
  }

  // componentDidMount() {
  //   this.getLocalStorage();
  // }

  // getLocalStorage() {
  //   let tasks = [];
  //   let keys = Object.keys(localStorage);
  //   // let i = keys.length;
    
  //   for (let i = 0; i < keys.length; i++) {
  //     tasks.push( localStorage.getItem(keys[i]) )
  //   }

  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let newTodo = {title: this.state.title, description: this.state.description}
  //   localStorage.setItem("todo", JSON.stringify(newTodo));
  // }

  // update(field) {
  //   return (e) =>
  //     this.setState({
  //       [field]: e.currentTarget.value
  //     });
  // }

  // createTodo() {
  //   <div className="create-todo-container">
  //     <form onSubmit={this.handleSubmit.bind(this)}>
  //       <div>
  //         <label>Title
  //           <input
  //             type="text"
  //             value ={this.state.title}
  //             onChange={this.update("title")}
  //           />
  //         </label>
  //       </div>
  //     </form>
  //   </div>
  // }

  addTodo() {
    let todos = this.state.todos.concat(<Card />);
    this.setState({ todos: todos });
  }

  addProgress() {
    let inprogress = this.state.inprogress.concat(<Card />);
    this.setState({ inprogress: inprogress });
  }
  
  addDone() {
    let done = this.state.done.concat(<Card />);
    this.setState({ done: done });
  }

  deleteItem(column_name, e) {
    let array = [...this.state[column_name]];
    let index = e.currentTarget.parentElement.parentElement.parentElement.id;
    array.splice(index, 1);
    this.setState({ [column_name]: array });
  }

  editItem() {}


  render() {
    return (
      <>
        <h1 className="main-title">Kanban</h1>
        <div className="space-around flex row bg-lightgray height-100">
          <section id="todo-container" className="flex column width-20">
            <h2>To Do</h2>
            <button className="mb-15" onClick={this.addTodo}>
              +
            </button>
            <ul>
              {this.state.todos.map((todo, idx) => {
                return (
                  <li key={idx} id={idx}>
                    {todo}
                    <button className="item-button" onClick={this.editItem}>
                      Edit
                    </button>
                    <button
                      className="item-button ml-10"
                      onClick={(e) => this.deleteItem("todos", e)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="progress-container" className="flex column width-20">
            <h2>In Progress</h2>
            <button className="mb-15" onClick={this.addProgress}>
              +
            </button>
            <ul>
              {this.state.inprogress.map((inprog, idx) => {
                return (
                  <li key={idx}>
                    {inprog}
                    <div className="item-footer flex row">
                      <button className="item-button" onClick={this.editItem}>
                        Edit
                      </button>
                      <button
                        className="item-button ml-10"
                        onClick={(e) => this.deleteItem("inprogress", e)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="done-container" className="flex column width-20">
            <h2>Done</h2>
            <button className="mb-15" onClick={this.addDone}>
              +
            </button>
            <ul>
              {this.state.done.map((el, idx) => {
                return (
                  <>
                      <li key={idx}>
                        {el}
                        <button className="item-button" onClick={this.editItem}>
                          Edit
                        </button>
                        <button
                          className="item-button ml-10"
                          onClick={(e) => this.deleteItem("done", e)}
                        >
                          Delete
                        </button>
                      </li>
                  </>
                );
              })}
            </ul>
          </section>
        </div>
      </>
    );
  }
}


  /* <div className="flex row space-between todo-item">
  Todo Item #1
  <div>
    <button className="item-button" onClick={this.editItem}>
      Edit
    </button>
    <button className="item-button" onClick={this.deleteItem}>
      Delete
    </button>
  </div>
</div>; */

export default Kanban;
// export default DragDropContext(HTML5Backend)(Kanban);


//OLD ADD PROGRESS HTML 

// <div className="flex row space-between todo-item mb-15">
      //   New In Progress
      //   <div>
      //     <button className="item-button" onClick={this.editItem}>
      //       Edit
      //     </button>
      //     <button
      //       className="item-button ml-10"
      //       onClick={(e) => this.deleteItem("inprogress", e)}
      //     >
      //       Delete
      //     </button>
      //   </div>
      // </div>