import Taro, { useDidShow } from "@tarojs/taro";
import React, { useEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import { useRequest, useUpdateEffect } from "ahooks";
import { AtListItem } from "taro-ui";
import dayjs, { Dayjs } from "dayjs";
import NavBar from "../../components/topbar";
import "./index.less";
import Header from "./header";
import BillDay from "./billDay";
import CustomTabBar from "../../components/tablbar/index";
import { getBillList, getStatement } from "./service";
import { MonthList, YearList } from "./billList";

export const yearFormat = "YYYY";
export const monthFormat = "YYYY-MM";
export const dayFormat = "YYYY-MM-DD";

export default function Index() {
  const [dateType, setDatetype] = useState(0);
  const [date, setDate] = useState(dayjs(new Date()).format(monthFormat));

  useDidShow(() => {
    run();
    runList();
  })


  useUpdateEffect(() => {
    run();
    runList();
  }, [dateType, date]);

  const { loading, data: billSummary=[], run } = useRequest(() => getStatement({ dateType, date }), {
    refreshDeps: [dateType, date],
    manual: true
  });
  const { run: runList, data: dateSummary = [] }: any = useRequest(() => getBillList({ dateType, date }), {
    refreshDeps: [dateType, date],
    manual: true,
  });


  const onDateTypeChange = v => {
    const _date = dayjs(new Date());
    const newDate = v === 0 ? _date.format(monthFormat) : _date.format(yearFormat)
    setDatetype(v);
    setDate(newDate);
  };


  return (
    <>
      <NavBar title='首页' backgroundColorTop='#f6f9fb' extraHeight={110}>
        <Header
          dateType={dateType}
          date={date}
          billData={billSummary}
          onDateTypeChange={onDateTypeChange}
          setDate={setDate}
        />
      </NavBar>
      <View className='home-page'>
        {
          dateType === 0 ? <MonthList data={dateSummary} /> : <YearList data={dateSummary} />
        }
      </View>
      <CustomTabBar />
    </>
  );
}
