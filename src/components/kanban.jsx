import React from "react";
import Card from './card.jsx';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4"


class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {
        cards: [],
        id: uuid(),
        colName: "todos"
      },
      inprog: {
        cards: [],
        id: uuid(),
        colName: "inprog"
      },
      done: {
        cards: [],
        id: uuid(),
        colName: "done"
      },
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.addCard = this.addCard.bind(this);
    this.createSection = this.createSection.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
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

  addCard(colName) {
    let cards = this.state[colName].cards.concat(<Card />);
    this.setState({ [colName]: {cards, id: this.state[colName].id, colName: colName}});
  }

  deleteItem(colName, e) {
    let cards = [...this.state[colName].cards];
    let index = e.currentTarget.parentElement.parentElement.parentElement.id;
    cards.splice(index, 1);
    this.setState({ [colName]: {cards, id: this.state[colName].id, colName: colName}});
  }

  editItem(colName, e) {
    let cards = [...this.state[colName].cards];
    let index = e.currentTarget.parentElement.parentElement.parentElement.id;
    cards.splice(index, 1);
    this.setState({ [colName]: {cards, id: this.state[colName].id, colName: colName}});
  }

  onDragEnd(result) {
    const {destination, source} = result
    if(!destination) return;
    const endColName = Object.values(this.state).find(x => x.id === destination.droppableId).colName
    const startColName = Object.values(this.state).find(x => x.id === source.droppableId).colName
    const cardDupes = [...this.state[endColName].cards]
    let [removed] = cardDupes.splice(source.index, 1)
    if(endColName === startColName) {
      cardDupes.splice(destination.index, 0, removed)
      this.setState({...this.state,
        [endColName]: {cards: cardDupes, id: this.state[endColName].id, colName: endColName},
      });
    } else {
      const startColCards = this.state[startColName].cards 
      const startColDupes = [...startColCards] // source items
      const endColCards = this.state[endColName].cards 
      const endColDupes = [...endColCards] // dest items
      let [removed] = startColDupes.splice(source.index, 1)
      endColDupes.splice(destination.index, 0, removed)
      this.setState({
        [startColName]: {cards: startColDupes, id: this.state[startColName].id, colName: startColName},
        [endColName]: {cards: endColDupes, id: this.state[endColName].id, colName: endColName},
      })
    }
  }

  createSection(colName) {
    return(
      <section id="done-container" className="flex column width-20">
        <h2>{colName}</h2>
        <button className="mb-15" onClick={() => this.addCard(colName)}>+</button>
        <Droppable droppableId={this.state[colName].id}>
          {(provided) => {
            return(
              <div id={colName} {...provided.droppableProps} ref={provided.innerRef}>
                {this.state[colName].cards.map((item, idx)=> {
                  return (
                    <Draggable key={idx + colName} draggableId={idx + colName} index={idx}>
                      {(provided) => {
                        return(
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                            {item}
                            <div className="item-footer lightred flex row">
                            <button
                                className="item-button"
                                onClick={(e) => this.editItem(colName, e)}
                              >
                                Edit
                              </button>
                              <button
                                className="item-button ml-10"
                                onClick={(e) =>
                                  this.deleteItem(colName, e)
                                }
                              >
                                Delete
                              </button>
                            </div>
                      </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          } }
        </Droppable>
      </section>
    )
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h1 className="main-title">Kanban</h1>
          <div className="space-around flex row bg-lightgray height-100">
          {this.createSection("todos")}
          {this.createSection("inprog")}
          {/* {this.createSection("done")} */}
        </div>
        </DragDropContext>
      </div>
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