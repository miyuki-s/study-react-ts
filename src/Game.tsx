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
    const history = this.state.history; // this.state.historyをhistoryに代入
    const current = history[this.state.stepNumber]; // currentにstepNumberの数字目の配列の中身を代入
    const winner  = this.calculateWinner(current.squares); // currentのsquaresの値をcalculateWinnerに紐づけてwinnerに代入
    const moves = history.map((step, move) => { // historyの配列をもとにmovesという変数にreturnの内容を
      const desc = move ? // moveの正誤によってdescに代入する値がちがう
        'Go to move #' + move : // true(0でない)なら'Go to move #数字'を表示
        'Go to game start'; // js的に0はfalseなので,moveが0の時こちらが呼び出される
      return (
        <li key={move}>
          <button onClick={this.jumpTo.bind(this,move)}>{desc}</button>
        </li> // keyはそのliの範囲で使われている変数を使用。ボタンをクリックするとthisとmoveを紐付けたjumpToという関数を呼び出す。ボタンの中にはdescを表示。このボタンは1つずつlistとして表示
      );
    });

    let status; // statusを宣言
    if (winner) {
      status = 'Winner: ' + winner; // もしwinnerがいるならstatusという変数に'Winner: '+winner(X or O)を代入
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // そうでないなら(null),statusに'Next player: 'の後に、xIsNextがtrueならX,falseならOを表示
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
        {/* {this.hoge()} */}
      </div> // gameというクラスの中にgame-boardとgame-infoというクラスを作る。
            //  game-boardの方には、Boardコンポーネントのsquaresにcurrent内のsquaresを代入。クリックするとthis.handleClickを呼び出す。
            // game-infoでは最初にstatusを表示。movesはリストを作り、中身はliで中身がdescのもの
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

  // private hoge():any[] {
  //   const hogeHistory = [
  //     {
  //       squares: [null,null,null,null,null,null,null,null,null]
  //     },
  //     {
  //       squares: [null,"X",null,null,null,null,null,null,null]
  //     },
  //     {
  //       squares: [null,"X",null,"o",null,null,null,null,null]
  //     },
  //   ]
  //   const hogehoge = hogeHistory.map((value, index) => {
  //     return (
  //       <div key={index}>
  //         <h1>{index}番目の動作</h1>
  //       </div>
  //     )
  //   })
  //   return hogehoge;
  // }

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
