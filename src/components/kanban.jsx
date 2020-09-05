import React from "react";
import Card from './card.jsx';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4"
import {Button, Row, Col, Container, Navbar, Nav, NavDropdown, Form, Link} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faAngellist, faGithub, faBlogger, faReadme } from "@fortawesome/free-brands-svg-icons";





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
    debugger
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

    if (card.title === "") {
      alert('Please Enter A Valid Title')
      return; 
    }

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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              <input
                className="mt-5"
                placeholder="Title"
                type="text"
                value={this.state.currentTitle}
                onChange={this.update("currentTitle")}
              />
            </label>
            <label>
              <input
                className="mt-5"
                placeholder="Description"
                type="text"
                value={this.state.currentDescription}
                onChange={this.update("currentDescription")}
              />
            </label>
          </div>
          <Row>
            <Button className="btn-sm ml-2 mt-5 mb-2 mr-0" type="submit">
              Submit
            </Button>
            <Button className="btn-sm m-2 mt-5 ml-0" onClick={this.closeModal}>
              Close
            </Button>
          </Row>
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
      <div id="container">
        <h2>{colName}</h2>
        <Col>
          <Row>
            <Button
              className="btn-block  btn-light text-primary m-2"
              onClick={() => this.removeCol(colName)}
            >
              -
            </Button>
          </Row>
          <Row>
            <Button
              className="btn-block  btn-light text-primary m-2"
              onClick={() => this.addCard(colName)}
            >
              +
            </Button>
          </Row>
        </Col>
        <div>
          <Droppable droppableId={colName} className="dropable" direction="vertical">
            {(provided) => {
              return (
                <div
                  id={colName}
                  className="card-drag"
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
                            <Col
                              className="bg-light shadow shadow-lg mt-3 border-primary border"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              
                            >
                              <Card
                                title={item.title}
                                description={item.description}
                                id={item.id}
                              />
                              <div className=" flex flex-column justify-content-end">
                                {/* <Button
                                  
                                  onClick={(e) => this.editItem(colName, e)}
                                >
                                  Edit
                                </Button> */}
                                <Button
                                  className="btn-sm py-0 mb-2 btn-danger"
                                  onClick={(e) => this.deleteItem(colName, e)}
                                >
                                  X
                                </Button>
                              </div>
                            </Col>
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

    if (this.state.createColumn === "" || columns.includes(this.state.createColumn)) {
      alert("Please Enter a Valid Column Name")
      return;
    }

    if (this.state.allColumns.length > 10) {
      alert("Eleven columns is the max. Please delete one if you would like to create a new column.")
      return;
    }

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
        <div className="modal-content w-25 h-50">
          <h1 className=" text-secondary">Add Todo</h1>
          {this.createTodo()}
        </div>
      </div>
    );
  }

  mapColumns() {
  return (
    <Droppable
      className="dropable"
      droppableId="allColumns"
      direction="horizontal"
      type="column"
    >
      {(provided) => {
        return (
          <div
            id={"Columns"}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Row className={`justify-content-left flex-nowrap row-cols-${(this.state.allColumns.length) / 12}`}>
              {this.state.allColumns.map((column, idx) => (
                <Draggable
                  className="border-secondary border-warning"
                  key={idx}
                  draggableId={idx + "Column"}
                  index={idx}
                >
                  {(provided) => {
                    return (
                      <Container
                        className="progress-bar progress-bar-striped m-4 progress-bar-animated pb-3 justify-content-start shadow-lg shadow border-warning border p-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <section key={idx}>
                          {this.createSection(column)}
                        </section>
                      </Container>
                    );
                  }}
                </Draggable>
              ))}
            </Row>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
  }

  render() {
    return (
      <>
        <Navbar
          sticky="top"
          className="w-100 navbar navbar-dark bg-primary mb-1"
        >
          <Navbar.Brand className="main-title">Kanban</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Mackenzie Young" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <FontAwesomeIcon icon={faLinkedin} />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <FontAwesomeIcon icon={faAngellist} />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <FontAwesomeIcon icon={faGithub} />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <FontAwesomeIcon icon={faReadme} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link
              href="https://github.com/mac9330/Kantan"
              className=" nav text-white"
            >
              ReadMe <FontAwesomeIcon icon={faReadme} />
            </Nav.Link>
            <Form inline onSubmit={() => this.createColumn()}>
              <input
                type="text"
                placeholder="Add Column"
                className="mr-sm-1"
                value={this.state.createColumn}
                onChange={this.update("createColumn")}
              />
              <Button
                variant="outline-success"
                className="btn-link bg-darken-4 text-decoration-none table-hover bg-white btn-sm m-1 pl-1 pr-1 pt-0 pb-0"
                type="submit"
              >
                +
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
            <Col className="justify-content-end">
              <Button onClick={this.clearAll}>Reset to default</Button>
            </Col>
            {this.mapColumns()}
          </DragDropContext>
          {this.modal()}
        </Container>
      </>
    );
  }
}

export default Kanban;
