import * as React from 'react';// パッケージのreactからReactという名前でインポート
import Square from './Square';// Scuare.tsxからScuareというクラスをインポート

interface InterfaceSquareProps{
  squares: string[];
  onClick: (i:number) => void;
}

export default class Board extends React.Component<InterfaceSquareProps, {}> { // Boardクラス(たい焼きの型)を作成しインポートしたReactからコンポーネントクラスを継承。また、このクラス内で使うstateもしくは外部から受け取ったpropsを定義。 Boardが呼び出された時はデフォルトでこのクラスをエクスポートするようにする。
  constructor(props:any) { // コンストラクタで変数の中身を決める(propsの中の値はなんでも良い。)
    super(props); // propsの中身をReactのコンポーネントクラスから継承
    this.renderSquare = this.renderSquare.bind(this); // renderSquareにthisを結びつけてそれをrenderSquareに代入
  }

  public render() { // 出力する
    // status += this.state.xIsNext ? 'X':'O';
    // const status = 'Next player: X';
    return ( // 返す
      <div>
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

  private renderSquare(i:number):any { // 数字iを引数にもつrenderSquareという関数は何かしらの型のものを返す
    return <Square value={this.props.squares[i]} onClick={this.props.onClick.bind(this, i)}/>; // Squareクラスのvalueにthis.state.squares[i]を代入、クリックするとthisとiを結びつけたthis.props.onClickを呼び出す
  }

}
