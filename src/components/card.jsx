import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  render() {
    return (
      <>
        <div className="flex column todo-item">
          <div className="flex row space-between">
            <h3 className="ml-10">New Done</h3>
          </div>
          <div>
            <p className="ml-10 item-description"> Test Text</p>
          </div>
        </div>
      </>
    );
  }
}

export default Card;