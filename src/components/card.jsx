import React from 'react';


class Card extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      editable: false,
      title: "",
      description: "",
      id: "",
    };
    this.state.title = this.props.title; // Todo setState
    this.state.description = this.props.description;
    this.state.id = this.props.id;
  }
  

  render() {
    return (
      <div id={this.state.id}>
        <div className="flex column todo-item">
          <div className="flex row space-between">
            <h3 className="ml-10">{this.state.title}</h3>
          </div>
          <div>
            <p className="ml-10 item-description">{this.state.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;