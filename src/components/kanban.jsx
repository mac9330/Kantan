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
        colName: "todos",
      },
      inprog: {
        cards: [],
        id: uuid(),
        colName: "inprog",
      },
      done: {
        cards: [],
        id: uuid(),
        colName: "done",
      },
      allColumns: ["todos", "inprog", "done"],
      currentColumn: "todos",
      currentTitle: "",
      currentDescription: "",
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.addCard = this.addCard.bind(this);
    this.createSection = this.createSection.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.modal = this.modal.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
    // this.clearAll()
  }

  updateLocalStorage() {
    this.clearAll();
    const allColumns = this.state.allColumns;
    for (let i = 0; i < allColumns.length; i++) {
      let cards = [];
      this.state[allColumns[i]].cards.forEach((card) => {
        cards.push(card)
        localStorage.setItem(allColumns[i], JSON.stringify(cards));
      });
    }
  }

  getLocalStorage() {
    let columns = [];
    if (Object.keys(localStorage)) {
      columns = Object.keys(localStorage);
      for (let i = 0; i < columns.length; i++) {
        let currentColumn = columns[i]
        let columnItems = JSON.parse(localStorage.getItem(columns[i]));
        for (let i = 0; i < columnItems.length; i++) {
          let title = columnItems[i].title;
          let description = columnItems[i].description;
          let id = columnItems[i].id;
          const card = {title: title, description: description, id: id};
          this.setState({
            [this.state[currentColumn].cards]: this.state[
              currentColumn
            ].cards.push(card),
          });
        }
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    let cards;
    const colName = this.state.currentColumn
    if (localStorage.getItem(colName) === null) {
      cards = [];
    } else {
      cards = JSON.parse(localStorage.getItem(colName));
    }
    const card = {title: this.state.currentTitle, description: this.state.currentDescription, id: uuid()};
    await this.setState({[this.state[colName].cards]: this.state[colName].cards.push(card)})
    this.updateLocalStorage();
    this.closeModal();
    this.setState({currentTitle: "", currentDescription: ""})
  }

  clearAll() {
    localStorage.clear();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  createTodo() {
    return (
      <div className="create-todo-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              Title
              <input
                type="text"
                value={this.state.currentTitle}
                onChange={this.update("currentTitle")}
              />
            </label>
            <label>
              description
              <input
                type="text"
                value={this.state.currentDescription}
                onChange={this.update("currentDescription")}
              />
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }

  openModal() {
    const modal = document.getElementsByClassName("newTodoForm");
    modal[0].style.display = "flex";
  }

  closeModal() {
    const modal = document.getElementsByClassName("newTodoForm");
    modal[0].style.display = "none";
    this.setState({newTodoContainer: "hidden"})
  }

  addCard(colName) {
    this.setState({currentColumn: colName});
    this.openModal();
  }

  async deleteItem(colName, e) {

    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.id === id)
    let idx = 0
    cards.forEach((el, index) => {
      if (el.id === deletedCard.id) {
        return idx = index
      }
    })
    // debugger
    cards.splice(idx, 1,);
    await this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  async editItem(colName, e) {
    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.id === id)
    let idx = 0
    cards.forEach((el, index) => {
      if (el.id === deletedCard.id) {
        return idx = index
      }
    })
    // debugger
    cards.splice(idx, 1,);
    await this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  async onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if ( destination.droppableId === source.droppableId && destination.index === source.index) return;
      const startColumn = this.state[source.droppableId].cards;
      const endColumn = this.state[destination.droppableId].cards;
      const startDupes = Array.from(startColumn);
      const endDupes = Array.from(endColumn);
      
    if (endColumn === startColumn) {
        let [removed] = startDupes.splice(source.index, 1)
        startDupes.splice(destination.index, 0, removed);
        this.setState({
          [source.droppableId]: {
            cards: startDupes,
            id: this.state[destination.droppableId].id,
            colName: source.droppableId,
          }
        })
        } else {
      let [removed] = startDupes.splice(source.index, 1);
      endDupes.splice(destination.index, 0, removed);
      await this.setState({
        [source.droppableId]: {
          cards: startDupes,
          id: this.state[source.droppableId].id,
          colName: source.droppableId,
        },
        [destination.droppableId]: {
          cards: endDupes,
          id: this.state[destination.droppableId].id,
          colName: destination.droppableId,
        }, 
      })
      this.updateLocalStorage()
    }
  }

  createSection(colName) {
    console.log(this.state)
    return (
      <section id="done-container" className="flex column width-20">
        <h2>{colName}</h2>
        <button className="mb-15" onClick={() => this.addCard(colName)}>
          +
        </button>
        <Droppable droppableId={colName}>
          {(provided) => {
            return (
              <div
                id={colName}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state[colName].cards.map((item, idx) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={idx}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {/* {console.log(item.title)} */}
                            <Card 
                              title={item.title} 
                              description={item.description} 
                              id={item.id} 
                            />
                            <div className="item-footer lightred flex row">
                              <button
                                className="item-button"
                                onClick={(e) => this.editItem(colName, e)}
                              >
                                Edit
                              </button>
                              <button
                                className="item-button ml-10"
                                onClick={(e) => this.deleteItem(colName, e)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </section>
    );
  }

  modal() {
    return (
      <div className="newTodoForm">
        <div className="modal-content">
          Modal form
          {this.createTodo()}
          <button onClick={this.closeModal}>Close</button>
        </div>
      </div>
    );
  }

  render() {
    // result => onDragEnd(result, columns, setColumns)
    // this.clearAll()
    return (
      <div>
        <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
          <h1 className="main-title">Kanban</h1>
          <div className="space-around flex row bg-lightgray height-100">
            {this.createSection("todos")}
            {this.createSection("inprog")}
            {this.createSection("done")}
          </div>
        </DragDropContext>
        {/* {console.log(this.state)} */}
        {this.modal()}
      </div>
    );
  }
}

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
      // </div>>
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
      // </div>utton className="item-button" onClick={this.editItem}>
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
      //       Delete
      //     </button>
      //   </div>
      // </div>
      //       Delete
      //     </button>
      //   </div>
      // </div>
      //       Delete
      //     </button>
      //   </div>
      // </div>
      //       Delete
      //     </button>
      //   </div>
      // </div>