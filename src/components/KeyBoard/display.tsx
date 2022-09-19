import { Input, View } from "@tarojs/components";
import React from "react";

const Display = props => {
  return (
    <View className='flex items-center display'>
      <View>
        备注：
      </View>
      <Input
        value={props.remarks}
        onInput={e => {
          props.setRemarks?.(e.detail.value)
        }}
      />
      <View className='number'>{props.value}</View>
    </View>
  );
};

export default Display;
