import { Component } from "react";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/swipe-action.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/accordion.scss";

import "./app.less";
import "./font/iconfont.css";


class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
