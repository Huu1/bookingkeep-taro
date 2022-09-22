import { Text, View } from '@tarojs/components';
import * as React from 'react';
import { AtListItem } from 'taro-ui';
import CustomAtAccordion from '../../components/Accordion';
import { date_Format } from '../../util';
import BillDay from './billDay';

export const MonthList = (props) => {
  const { data=[] ,reload ,isOpenId ,setIsopenId} = props;
  return <>
    {
      data?.map(item => {
        return <React.Fragment key={item.date}>
          <AtListItem
            title={date_Format(new Date(item.date),'MM月dd日')}
            extraText={`支出：${item.expend}`}
            hasBorder={false}
            className='custom-listitem mt-12'
            iconInfo={{ size: 17, color: "#999", value: "calendar" }}
          />
          <BillDay reload={reload} list={item.list} isOpenId={isOpenId} setIsopenId={setIsopenId} />
        </React.Fragment>
      })
    }
  </>

}

const YearItem = (props) => {
  const {item ,reload ,isOpenId, setIsopenId}=props;
  const [open, setOpen] = React.useState(false);
  return <CustomAtAccordion
    open={open}
    onClick={(v) => setOpen(v)}
    isAnimation={false}
    title={date_Format(new Date(item.date),'MM月')}
    hasBorder={false}
    className='custom-accordion'
    body={<View className='w-full flex body-style '>
      <View className='expend flex-1'>
        <Text >支出</Text>
        <View >{item.expend}</View>
      </View>
      <View className='income flex-1'>
        <Text >收入</Text>
        <View >{item.income}</View>
      </View>
      <View className='balance flex-1'>
        <Text >结余</Text>
        <View >{item.balance}</View>
      </View>

    </View>}
    icon={{ size: 17, color: "#999", value: "calendar" }}
  >
    <BillDay reload={reload} list={item.list} isOpenId={isOpenId} setIsopenId={setIsopenId} />
  </CustomAtAccordion>
}

export const YearList = (props) => {
  const {isOpenId, setIsopenId} =props;
  return <>
    {
     props.data?.map(item => {
        return <React.Fragment key={item.date}>
          <YearItem reload={props.reload} item={item} isOpenId={isOpenId} setIsopenId={setIsopenId} />
        </React.Fragment>
      })
    }
  </>

}
