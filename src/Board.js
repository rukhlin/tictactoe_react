import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}/>
      );
    }
  
    render() {
      const rowsStartIndexes = [0, 3, 6];
      const rows = rowsStartIndexes.map((item, index) =>
        <div className="board-row" key={index}>
          {this.renderSquare(item)}
          {this.renderSquare(item + 1)}
          {this.renderSquare(item + 2)}
        </div>
      );

      return (
        <div>
            {rows}
        </div>
      );
    }
  }

  export default Board;