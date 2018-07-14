import * as React from 'react';
import Board from './Board';

interface InterfaceHistoryState{
  squares: string[];
}

interface InterfaceGameState{
  history: InterfaceHistoryState[];
  xIsNext: boolean;
  stepNumber: number;
}

export default class Game extends React.Component<{},InterfaceGameState> {
  constructor(props:any) { // コンストラクタで変数の中身を決める(propsの中の値はなんでも良い。)
    super(props); // propsの中身をReactのコンポーネントクラスから継承
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext : true,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner  = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li  key={move}>
          <button onClick={this.jumpTo.bind(this,move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  private jumpTo(step:number):void {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  private handleClick(i:number):void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  private calculateWinner(squares: string[]):string|null {
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
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}
