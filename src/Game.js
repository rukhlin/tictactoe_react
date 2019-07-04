import React from 'react';
import Board from './Board.js';
import Switcher from './Switcher.js'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getCoords(i) {
  return ('(' + (i % 3 + 1) + ', ' + Math.floor(i / 3 + 1) + ')')
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        currentStep: null  
      }],
      xIsNext: true,
      stepNumber: 0,
      hasStepChosen: false,
      isSorterAsc: true
    }
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,        
        currentStep: i
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      hasStepChosen: false
    });
  }

  onSortingChange() {
    this.setState({
      isSorterAsc: !this.state.isSorterAsc
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      hasStepChosen: true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to step #' + move :
        'Reset';
      let liClassName = '';
      if (this.state.hasStepChosen) {
        liClassName = 'active-step';
      }
      return (
        <li key={move}>
          <button 
            onClick={() => this.jumpTo(move)}
            className={(move === this.state.stepNumber ? liClassName : '')}>
              {desc}
          </button>
          <label>{
            history[move]['currentStep'] !== null && (' Step in ' + getCoords(history[move]['currentStep']) + ' with ' + (move % 2 === 0 ? 'X' : 'O'))
            }
           </label>
        </li>
      );
    });

    let status;
    if (winner) {
      status = winner + ' win!';
    } else {
      status = 'Next player is: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Switcher 
            isSorterAsc={this.state.isSorterAsc} 
            onClick={() => this.onSortingChange()}  
          />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;