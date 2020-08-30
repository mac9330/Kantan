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
    let tasks = [];
    let columns = [];
    const colName = this.state.currentColumn;
    if (Object.keys(localStorage)) {
      columns = Object.keys(localStorage);
      for (let i = 0; i < columns.length; i++) {
        let currentColumn = columns[i]
        let columnItems = JSON.parse(localStorage.getItem(columns[i]));
        for (let i = 0; i < columnItems.length; i++) {
          let title = columnItems[i].props.title;
          let description = columnItems[i].props.description;
          let id = columnItems[i].props.id;
          const card = (
            <Card
              title={title}
              description={description}
              id={id}
            ></Card>
          );
          // this.setState({[this.state[currentColumn].cards]: this.state[currentColumn].cards.concat(card)})
          this.setState({
            [this.state[currentColumn].cards]: this.state[
              currentColumn
            ].cards.push(card),
          });
          // console.log({[this.state[currentColumn].cards]: this.state[currentColumn].cards.concat(card)})
        }
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let cards;
    const colName = this.state.currentColumn
    if (localStorage.getItem(colName) === null) {
      cards = [];
    } else {
      cards = JSON.parse(localStorage.getItem(colName));
    }
    const card = (<Card
      title={this.state.currentTitle}
      description={this.state.currentDescription}
      id={uuid()}
    ></Card>);
    this.setState({[this.state[colName].cards]: this.state[colName].cards.push(card)})
    this.updateLocalStorage();
    // localStorage.setItem(colName, JSON.stringify(cards.concat(card)));
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
    let currentColumn = this.state.currentColumn
    let title = "";
    let description = "";
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

  deleteItem(colName, e) {

    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.props.id === id)
    let idx = 0
    cards.forEach((el, index) => {
      if (el.props.id === deletedCard.props.id) {
        return idx = index
      }
    })
    // debugger
    cards.splice(idx, 1,);
    this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  editItem(colName, e) {
    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.props.id === id)
    let idx = 0
    cards.forEach((el, index) => {
      if (el.props.id === deletedCard.props.id) {
        return idx = index
      }
    })
    // debugger
    cards.splice(idx, 1,);
    this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;
    const endColName = Object.values(this.state).find(
      (x) => x.id === destination.droppableId
    ).colName;
    const startColName = Object.values(this.state).find(
      (x) => x.id === source.droppableId
    ).colName;
    // console.log(endColName);
    const cardDupes = [...this.state[endColName].cards];
    let [removed] = cardDupes.splice(source.index, 1);
    if (endColName === startColName) {
      cardDupes.splice(destination.index, 0, removed);
      this.setState({
        [endColName]: {
          cards: cardDupes,
          id: this.state[endColName].id,
          colName: endColName,
        },
      });
    } else {
      const startColCards = this.state[startColName].cards;
      const startColDupes = [...startColCards]; // source items
      const endColCards = this.state[endColName].cards;
      const endColDupes = [...endColCards]; // dest items
      let [removed] = startColDupes.splice(source.index, 1);
      endColDupes.splice(destination.index, 0, removed);
      this.setState({
        [startColName]: {
          cards: startColDupes,
          id: this.state[startColName].id,
          colName: startColName,
        },
        [endColName]: {
          cards: endColDupes,
          id: this.state[endColName].id,
          colName: endColName,
        },
      });
    }
    this.updateLocalStorage()
  }

  createSection(colName) {
    // debugger
    return (
      <section id="done-container" className="flex column width-20">
        <h2>{colName}</h2>
        <button className="mb-15" onClick={() => this.addCard(colName)}>
          +
        </button>
        <Droppable droppableId={this.state[colName].id}>
          {(provided) => {
            return (
              <div
                id={colName}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state[colName].cards.map((item, idx) => {

                  // console.log("START")
                  console.log(item)
                  return (
                    <Draggable
                      key={idx + colName}
                      draggableId={idx + colName}
                      index={idx}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {console.log(item.title)}
                            <Card 
                              title={item.props.title} 
                              description={item.props.description} 
                              id={item.props.id} 
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