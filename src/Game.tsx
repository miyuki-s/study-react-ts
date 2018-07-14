import * as React from 'react';
import Board from './Board';

interface InterfaceHistoryState{
  squares: string[];
}

interface InterfaceGameState{
  history: InterfaceHistoryState[];
  xIsNext: boolean;
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
      xIsNext : true,
    }
  }

  public render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
