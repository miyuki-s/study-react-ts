import * as React from 'react'; // パッケージのreactからReactという名前でインポート

interface InterfaceSquareProps { // InterfaceSquarePropsという名前のinterface(たい焼きの具の中身の種類)を作り
  value: string; // valueの型をstring(文字)に
  onClick: () => void; // クリックすると何も受け取らないし何も返さない
}

// interface InterfaceSquareState {
//   value: string;
// }

// export default class Square extends React.Component<InterfaceSquareProps, InterfaceSquareState> {
// export default class Square extends React.Component<{}, InterfaceSquareState> {
export default class Square extends React.Component<InterfaceSquareProps, {}> { // Squareクラス(たい焼きの型)を作成しインポートしたReactからコンポーネントクラスを継承。また、このクラス内で使うstateもしくは外部から受け取ったpropsを定義。 Squareが呼び出された時はデフォルトでこのクラスをエクスポートするようにする。
  // constructor(props: any) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this)
  //   // this.state = {
  //   //   value: "wa",
  //   // }
  // }



  public render() { // 出力する
    return ( // 返す
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button> // ボタンを設置。クリックするとthis.props.onClickを呼び出す。ボタンにはthis.props.valueを表示
    );
  }


  // private handleClick():void {
  //   this.setState({value: "X"})
  //   // alert(this.props.value);
  // }
}
