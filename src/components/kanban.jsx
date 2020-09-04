import React from "react";
import Card from './card.jsx';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4"


class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColumns: [],
      currentColumn: "",
      currentTitle: "",
      currentDescription: "",
      createColumn: "",
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
    this.createColumn = this.createColumn.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
    // this.clearAll()
  }

  updateLocalStorage() {
    // this.clearAll();
    const allColumns = this.state.allColumns;
    allColumns.forEach((ele) =>
      localStorage.setItem(ele, JSON.stringify(this.state[ele]))
    );
    localStorage.setItem("allColumns", JSON.stringify(allColumns));
  }

  async getLocalStorage() {
    if (!Object.keys(localStorage).length) {
      // localstorage of all columns instead of length??
      await this.setState({
        allColumns: ["todos", "inprog", "done"],
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
      });
      let test = {
        cards: [],
        id: uuid(),
        colName: "done",
      };
      localStorage.setItem("todos", JSON.stringify(test));
      localStorage.setItem("inprog", JSON.stringify(test));
      localStorage.setItem("done", JSON.stringify(test));
      localStorage.setItem(
        "allColumns",
        JSON.stringify(["todos", "inprog", "done"])
      );
    } else {
      let allColumns = JSON.parse(localStorage.getItem("allColumns"));

      for (let i = 0; i < allColumns.length; i++) {
        let currentColumn = allColumns[i];
        await this.setState({
          [currentColumn]: {
            cards: [],
            id: uuid(),
            colName: `${currentColumn}`,
          },
        });
        let cards = [];
        let columnItems = JSON.parse(localStorage.getItem(allColumns[i]));

        let length = columnItems.cards.length;
        for (let j = 0; j < length; j++) {
          let title = columnItems.cards[j].title;
          let description = columnItems.cards[j].description;
          let id = columnItems.cards[j].id;
          const card = { title: title, description: description, id: id };
          cards.push(card);
          await this.setState({
            [this.state[currentColumn].cards]: this.state[
              currentColumn
            ].cards.push(card),
          });
        }
      }
      this.setState({ allColumns: allColumns });
      console.log(this.state);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    let cards;
    const colName = this.state.currentColumn;
    if (localStorage.getItem(colName) === null) {
      cards = [];
    } else {
      cards = JSON.parse(localStorage.getItem(colName));
    }
    const card = {
      title: this.state.currentTitle,
      description: this.state.currentDescription,
      id: uuid(),
    };
    await this.setState({
      [this.state[colName].cards]: this.state[colName].cards.push(card),
    });
    this.updateLocalStorage();
    this.closeModal();
    this.setState({ currentTitle: "", currentDescription: "" });
  }

  clearAll() {
    localStorage.clear();
    this.setState({ allColumns: [] });
    this.getLocalStorage();
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
          <div className="mb-15">
            <label>
              <input
                placeholder="Title"
                type="text"
                value={this.state.currentTitle}
                onChange={this.update("currentTitle")}
              />
            </label>
            <label>
              <input
                placeholder="Description"
                type="text"
                value={this.state.currentDescription}
                onChange={this.update("currentDescription")}
              />
            </label>
          </div>
          <button className="submit-todo">Submit</button>
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
    this.setState({ newTodoContainer: "hidden" });
  }

  addCard(colName) {
    this.setState({ currentColumn: colName });
    this.openModal();
  }

  async deleteItem(colName, e) {
    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.id === id);
    let idx = 0;
    cards.forEach((el, index) => {
      if (el.id === deletedCard.id) {
        return (idx = index);
      }
    });
    cards.splice(idx, 1);
    await this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  async editItem(colName, e) {
    const id = e.currentTarget.parentElement.previousElementSibling.id;
    let cards = [...this.state[colName].cards];
    const deletedCard = cards.find((x) => x.id === id);
    let idx = 0;
    cards.forEach((el, index) => {
      if (el.id === deletedCard.id) {
        return (idx = index);
      }
    });
    cards.splice(idx, 1);
    await this.setState({
      [colName]: { cards, id: this.state[colName].id, colName: colName },
    });
    this.updateLocalStorage();
  }

  dragCol(result) {
    
  }

  async onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (result.type === "column") {
      const allColumns = Array.from(this.state.allColumns)
      const [removed] = allColumns.splice(source.index, 1)
      allColumns.splice(destination.index, 0, removed)
      const newState = {
        ...this.state,
        allColumns: allColumns
      }
      await this.setState(newState)
      debugger;
      this.updateLocalStorage();
      return;
    }
    const startColumn = this.state[source.droppableId].cards;
    const endColumn = this.state[destination.droppableId].cards;
    const startDupes = Array.from(startColumn);
    const endDupes = Array.from(endColumn);

    if (endColumn === startColumn) {
      let [removed] = startDupes.splice(source.index, 1);
      startDupes.splice(destination.index, 0, removed);
      this.setState({
        [source.droppableId]: {
          cards: startDupes,
          id: this.state[destination.droppableId].id,
          colName: source.droppableId,
        },
      });
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
      });
      this.updateLocalStorage();
    }
  }

  createSection(colName) {
    return (
      <div id="done-container">
        <h2>{colName}</h2>
        <button className="mb-15 blue" onClick={() => this.removeCol(colName)}>
          -
        </button>
        <button className="mb-15 blue" onClick={() => this.addCard(colName)}>
          +
        </button>
        <div>
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
                      <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                title={item.title}
                                description={item.description}
                                id={item.id}
                              />
                              <div className="item-footer lightred flex row">
                                {/* <button
                                  className="item-button"
                                  onClick={(e) => this.editItem(colName, e)}
                                >
                                  Edit
                                </button> */}
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
        </div>
      </div>
    );
  }

  removeCol(colName) {
    localStorage.removeItem(colName);

    const idx = this.state.allColumns.indexOf(colName)
    let columns = Array.from(this.state.allColumns)
    columns.splice(idx, 1)
    localStorage.setItem("allColumns", JSON.stringify(columns));
    this.getLocalStorage();
  }

  async createColumn() {
    let columns = this.state.allColumns;
    columns.push(this.state.createColumn);
    await this.setState({
      allColumns: columns,
      [this.state.createColumn]: {
        cards: [],
        id: uuid(),
        colName: this.state.createColumn,
      },
    });
    this.updateLocalStorage();
    console.log(this.state);
  }

  modal() {
    return (
      <div className="newTodoForm">
        <div className="modal-content">
          <h1>Add Todo</h1>
          {this.createTodo()}
          <button className="modal-close" onClick={this.closeModal}>Close</button>
        </div>
      </div>
    );
  }

  mapColumns() {
  return  (
    <Droppable droppableId="allColumns" direction="horizontal" type="column">
      {(provided) => {
        return (
            <div
              id={"Columns"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
            <div className="space-around flex row bg-lightgray height-100">
              {this.state.allColumns.map((column, idx) => (
                <Draggable key={idx} draggableId={idx + "Column"} index={idx}>
                  {(provided) => {
                    return (
                          <div className="draggable-col">
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                            <section className="flex column width-20" key={idx}>
                              {this.createSection(column)}
                            </section>
                          </div>
                      </div>
                      );
                    }}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        );}}
      </Droppable>
    )
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
          <h1 className="main-title">Kanban</h1>
          <div className="createColumn">
            <form className="columnForm" onSubmit={() => this.createColumn()}>

              <input
                placeholder="Add Column"
                type="text"
                value={this.state.createColumn}
                onChange={this.update("createColumn")}
              />
              <button className="createColBtn">+</button>
            </form>
            <button className="reset-button" onClick={this.clearAll}>Reset to default</button>
          </div>
          {this.mapColumns()}
        </DragDropContext>
        {this.modal()}
      </div>
    );
  }
}

export default Kanban;
