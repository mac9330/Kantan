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
    this.state.title = this.props.title;
    this.state.description = this.props.description;
    this.state.id = this.props.id;
  }
  

  render() {
    return (
      <div className="mb-2 mt-3" id={this.state.id}>
        <div>
          <div>
            <h6 className=" pt-3 text-sm text-secondary">{this.state.title}</h6>
          </div>
          <div>
            <p className="pt-3 text-secondary">{this.state.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;