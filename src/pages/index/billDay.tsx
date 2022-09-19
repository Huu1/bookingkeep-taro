import Taro from '@tarojs/taro';
import * as React from 'react';
import { AtListItem, AtSwipeAction } from 'taro-ui';

const BillDay = (props) => {
  const { list = [] } = props;

  const onClickHandler=(item)=>{
    Taro.navigateTo({url: '/pages/bill-detail/index?id='+item.id})
  }

  return <>
    {list.map((item, index) => (
      <AtSwipeAction
        key={item.id}
        maxDistance={80}
        areaWidth={Taro.getSystemInfoSync().windowWidth}
        className='border-box'
        options={[
          {
            text: "确认",
            className: "border-box",
            style: {
              background: "#ef817e",
              width: 80,
              isplay: "flex",
              justifyContent: "center"
            }
          }
        ]}
      >
        <AtListItem
          className={` bill-item w-full ${item.type === '0' ? 'bill-item-out' : 'bill-item-in'}`}
          title={item.categoryName}
          note={item.remark}
          onClick={()=>onClickHandler(item)}
          extraText={`${item.type === '0' ? '-' : '+'}${item.amount}`}
          iconInfo={{
            size: 25,
            color: "#78A4FA",
            value: "_",
            className: `iconfont ${item.categoryIcon}`
          }}
        />
      </AtSwipeAction>
    ))}
  </>
}

export default BillDay;
