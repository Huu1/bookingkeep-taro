import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import React, { useState } from "react";
import { Button, View } from "@tarojs/components";
import { useRequest } from "ahooks";
import { AtList, AtListItem } from "taro-ui";
import NavBar from "../../components/topbar";
import { deleteBill, getBillDetail } from "./service";
import "./index.less";
import { date_Format, fomatStrDate } from "../../util";



export default function Index() {
  const [dateType, setDatetype] = useState(0);

  useDidShow(() => {
    run();
    Taro.showLoading({
      title:''
    })
  })

  const { loading, data, run }: any = useRequest(() => getBillDetail(getCurrentInstance().router?.params.id), {
    manual: true,
    onFinally(){
      setTimeout(() => {
        Taro.hideLoading();
      }, 100);
    }
  });

  const toNewPage = () => {
    Taro.navigateTo({ url: '/pages/record/index' })
  }

  const onDelHandler =()=>{

    Taro.showModal({
      title: '删除',
      content: '确认要删除该账单吗?',
      success: function (res) {
        if (res.confirm) {
          Taro.showLoading();
          deleteBill(data.id).then(r=>{
            Taro.hideLoading();
            Taro.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            }).then(()=>{
              Taro.switchTab({
                url:'/pages/index/index'
              })
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

  return (
    <>
      <NavBar back title='账单详情' backgroundColorTop='#f6f9fb' />
      <View className='home-page'>
        <View className='bill-header'>
          <View className={`iconfont ${data?.category?.icon}`} />
          <View className='text'>{data?.category?.name}</View>
          <View className={`number ${data?.category?.type == 0 ? 'expend' : 'income'}`}>{data?.amount}</View>
        </View>
        <AtList className='bill-atlist'>
          <AtListItem
            className='bill-custom-item'
            note='账单类型'
            extraText={data?.type==0 ? '支出': '收入'}
          />
          <AtListItem
            className='bill-custom-item'
            note='记账日期'
            extraText={fomatStrDate(data?.payTime,'yyyy年MM月dd日')}
          />
          <AtListItem
            className='bill-custom-item'
            note='备注'
            extraText={data?.remark || '-'}
          />
          <AtListItem
            customStyle={{ marginTop: '20px' }}
            className='bill-custom-item bill-custom-date'
            note='创建日期'
            extraText={fomatStrDate(data?.created_at,'yyyy-MM-dd hh:mm:ss')}
          />
        </AtList>
      </View>
      <View className='bill-detail-bottom'>
        <Button className='bill-detail-btn' onClick={onDelHandler}>删除</Button>
        <Button className='bill-detail-btn' onClick={toNewPage}>编辑</Button>
      </View>
    </>
  );
}
