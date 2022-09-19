import { Picker, Text, View } from "@tarojs/components"
import React from "react"
import { AtBadge, AtButton } from "taro-ui"
import './index.less';

const dateTypeList = ['月', '年'];
const Header = (props: {
  dateType,
  date,
  onDateTypeChange,
  setDate,
  billData
}) => {

  return (
    <View className='fix-top'>
      <View className='header'>
        <Text className='text-sm'>本{dateTypeList[props.dateType]}支出</Text>
        <View>
          <AtBadge className='mr-12'>
            <Picker mode='selector' value={props.dateType} range={dateTypeList} onChange={({ detail: { value } }) => { props.onDateTypeChange(+value) }}>
              <AtButton size='small' className='date-button' circle>{
                dateTypeList[props.dateType]
              }  <View className='iconfont icon-xiala' /></AtButton>

            </Picker>

          </AtBadge>
          <AtBadge>

            <Picker value={props.date} mode='date' fields={props.dateType === 0 ? 'month' : 'year'} onChange={({ detail: { value } }) => { props.setDate(value) }}>
              <AtButton size='small' className='date-button ' circle>{props.date} <View className='iconfont icon-xiala' /></AtButton>

            </Picker>
          </AtBadge>
        </View>
      </View>
      <View className='payNum'>
        <Text>
          {props.billData?.expend?.split('.')[0]}
        </Text>
        {
          props.billData?.expend && <Text>.</Text>
        }
        <Text>
          {props.billData?.expend?.split('.')[1]}
        </Text></View>
      <View className='flex justify-between '>
        <Text className='text-sm'>本{dateTypeList[props.dateType]}收入：<Text className='text-base'>{props.billData?.income}</Text></Text>
        <Text className='text-sm'>本{dateTypeList[props.dateType]}结余：<Text className='text-base'>{props.billData?.balance}</Text></Text>
      </View>
    </View>
  )
}

export default Header;
