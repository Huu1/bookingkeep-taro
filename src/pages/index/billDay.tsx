import Taro from '@tarojs/taro';
import * as React from 'react';
import { AtListItem, AtSwipeAction } from 'taro-ui';
import { deleteBill } from '../bill-detail/service';

const BillDay = (props) => {
  const { list = [] ,reload ,isOpenId ,setIsopenId} = props;

  const onClickHandler=(item)=>{
    Taro.navigateTo({url: '/pages/bill-detail/index?id='+item.id})
  }

  const onConfirmHandler=(id)=>{
    Taro.showModal({
      title: '删除',
      content: '确认要删除该账单吗?',
      success: function (res) {
        if (res.confirm) {
          Taro.showLoading();
          deleteBill(id).then(r=>{
            Taro.hideLoading();
            Taro.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            }).then(()=>{
              reload();
            })
          }).catch(error=>{
            Taro.showToast({
              title: error?.message || error,
              icon: 'none',
              duration: 2000
            })
          })
        }
      }
    })
  }

  return <>
    {list.map((item, index) => (
      <AtSwipeAction
        key={item.id}
        maxDistance={80}
        areaWidth={Taro.getSystemInfoSync().windowWidth}
        className='border-box'
        isOpened={isOpenId===item.id}
        onOpened={(e)=>{
          e.stopPropagation();
          setIsopenId(item.id)
        }}
        onClosed={(e)=>{
          e.stopPropagation();
          setIsopenId(null)
        }}
        onClick={(_,__,e)=>{
          e.stopPropagation();
          e.preventDefault();
          onConfirmHandler(item.id);
        }}
        options={[
          {
            text: "删除",
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
