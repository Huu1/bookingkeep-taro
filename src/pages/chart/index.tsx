import React, { Component, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import CustomTabBar from "../../components/tablbar";

export default function Index() {
  useEffect(() => {
    console.log('xxx');

   }, []);
  return <View className='index'>
    <CustomTabBar />
  </View>;
}
