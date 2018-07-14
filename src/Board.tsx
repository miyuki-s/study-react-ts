import * as React from 'react';// パッケージのreactからReactという名前でインポート
import Square from './Square';// Scuare.tsxからScuareというクラスをインポート

interface InterfaceBoardState{ // InterfaceBoardStateという名前のinterface(たい焼きの具の中身の種類)を作り
  squares: string[]; // squaresという変数の型を文字列の配列と定義
  xIsNext: boolean; // xIsNextという変数の型をboolean(正誤判断のやつ)に定義
}

export default class Board extends React.Component<{}, InterfaceBoardState> { // Boardクラス(たい焼きの型)を作成しインポートしたReactからコンポーネントクラスを継承。また、このクラス内で使うstateもしくは外部から受け取ったpropsを定義。 Boardが呼び出された時はデフォルトでこのクラスをエクスポートするようにする。
  constructor(props:any) { // コンストラクタで変数の中身を決める(propsの中の値はなんでも良い。)
    super(props); // propsの中身をReactのコンポーネントクラスから継承
    this.state = {
      squares: Array(9).fill(null),
      xIsNext : true,
    }; // stateの中をsquareを長さが9で全て空の配列に、xIsNextをtrueに指定

    this.renderSquare = this.renderSquare.bind(this); // renderSquareにthisを結びつけてそれをrenderSquareに代入
  }

  public render() { // 出力する
    const winner = this.calculateWinner(this.state.squares); // winnerという変数にthis.state.squaresを引数にとるcalculateWinnerを代入(constなので今後変化しない)
    let status; // statusという関数を今後変化する変数で置く
    if (winner) {
      status = 'Winner: ' + winner; // もしwinnerならstatusに'Winner: 'winner と代入
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // そうでなければ'Next player: 'XまたはO と表示。(xIsNextがtrueならX, falseならOと表示)
    }
    // status += this.state.xIsNext ? 'X':'O';
    // const status = 'Next player: X';
    return ( // 返す
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div> // 一番上にstatusを表示。その下に3*3の格子を作る。左上から012,345,678という番号が裏では振られている
    );
  }

  private handleClick(i:number):void { // handleClickという関数をiを数字の引数として
    const bufferSquares = this.state.squares.slice(); // this.state.squaresの配列の中身をコピーしてbufferSquaresに代入(constなので固定)
    // bufferSquares[i] = "X";
    if (this.calculateWinner(this.state.squares) || this.state.squares[i]) {
     return; // もしthis.state.squaresを引数にとるcalculateWinnerまたはthis.state.squares[i]が空でないならここで処理を終了する

   }
    bufferSquares[i] = this.state.xIsNext ? 'X' : 'O'; // bufferSquares[i]にthis.state.xIsNextがtrueならX,falseならOを代入
    this.setState({
      squares: bufferSquares,
      xIsNext: !this.state.xIsNext,
    }); // squaresにbufferSquares,xIsNextにthis.state.xIsNextじゃない方をセット
  }

  private renderSquare(i:number):any { // 数字iを引数にもつrenderSquareという関数は何かしらの型のものを返す
    return <Square value={this.state.squares[i]} onClick={this.handleClick.bind(this, i)}/>; // Squareクラスの{}this.state.squares[i]
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
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //     return squares[a];
    //   }
    // }
    for (const line of lines) {
      const [a, b, c] = line;
      if (this.state.squares[a] && this.state.squares[a] === this.state.squares[b] && this.state.squares[a] === this.state.squares[c]) {
        return this.state.squares[a];
      }
    }
    return null;
  }

}
