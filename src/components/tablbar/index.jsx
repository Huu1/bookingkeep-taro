import Taro from '@tarojs/taro'
import React from 'react'
import {
  CoverView, CoverImage
} from '@tarojs/components'
// import Intellect from '../assets/intellect.png'
import './index.less'

class CustomTabBar extends React.Component {

  // constructor(super){
  //   super();
  // }

  state = {
    selected: 0,
    color: '#666',
    selectedColor: '#ed6c00',
    list: [{
        pagePath: '/pages/index/index',
        // iconPath: '/assets/home.png',
        // selectedIconPath: '/assets/home-active.png',
        text: '明细'
      },
      {
        pagePath: '/pages/chart/index',
        // iconPath: '/assets/user.png',
        // selectedIconPath: '/assets/user-active.png',
        text: '图表'
      }
    ]
  }

  // eslint-disable-next-line react/sort-comp
  switchTab = (item) => {
    const url = item.pagePath
    Taro.switchTab({
      url
    })
  }

  jumpIntellect = () => {
    Taro.navigateTo({url: '/pages/record/index'})
  }

  componentDidMount() {
    this.setState({
      selected: this.props.ind
    })
  }

  // 自定义 tabBar的页面
  render() {
    return (
      <CoverView className='tab-bar'>
        <CoverView className='tab-bar-wrap'>
          {
            this.state.list.map((item, index) => {
              return <CoverView className='tab-bar-wrap-item'
                onClick={this.switchTab.bind(this, item)}
                data-path={item.pagePath}
                key={item.text}
              >
                <CoverImage className='tab-bar-wrap-item-icon' src={this.state.selected === index ? item.selectedIconPath : item.iconPath} />
                <CoverView className='tab-bar-wrap-item-btn'
                  style={{color: this.state.selected === index ? this.state.selectedColor : this.state.color}}
                >{item.text}
                </CoverView>
              </CoverView>
            })
          }
        </CoverView>
        <CoverImage className='intellect-icon' src=''  onClick={()=>this.jumpIntellect()} />
      </CoverView>
    )
  }
}
export default CustomTabBar
