import React from "react";
import { Picker, View } from "@tarojs/components";
import dayjs from "dayjs";

const isTody = day => {
  const tody = dayjs(new Date());
  const diffDay = dayjs(day);
  return (
    tody.year() === diffDay.year() &&
    tody.month() === diffDay.month() &&
    tody.date() === diffDay.date()
  );
};

const Button = props => {
  return (
    <View onClick={() => props.handelSubmit ? props.handelSubmit() : props.clickHandler(props.name)}>{props.name}</View>
  );
};

const ButtonPanel = props => {
  const { handleClick, state ,handelSubmit} = props;
  return (
    <View className='component-button-panel'>
      {/* <View> */}

      {/* <Button name='+/-' clickHandler={handleClick} /> */}
      <Button name='7' clickHandler={handleClick} />
      <Button name='8' clickHandler={handleClick} />
      <Button name='9' clickHandler={handleClick} />

      <Picker
        value={props.date}
        mode='date'
        fields='day'
        onChange={({ detail: { value } }) => {
          props.setDate(dayjs(value).format("YYYY/MM/DD"));
        }}
      >
        <View className='date'>{isTody(props.date) ? "今天" : props.date}</View>
      </Picker>

      <Button name='4' clickHandler={handleClick} />
      <Button name='5' clickHandler={handleClick} />
      <Button name='6' clickHandler={handleClick} />

      <Button name='+' clickHandler={handleClick} />

      <Button name='1' clickHandler={handleClick} />
      <Button name='2' clickHandler={handleClick} />
      <Button name='3' clickHandler={handleClick} />

      <Button name='-' clickHandler={handleClick} />

      <Button name='.' clickHandler={handleClick} />
      <Button name='0' clickHandler={handleClick} />
      <Button name='AC' clickHandler={handleClick} />
      {state.operation ? (
        <Button name='=' clickHandler={handleClick} />
      ) : (
        <Button name='完成' handelSubmit={handelSubmit} />
      )}

      {/* <Button name='%' clickHandler={handleClick} /> */}
      {/* <Button name='x' clickHandler={handleClick} />
    <Button name='÷' clickHandler={handleClick} /> */}
    </View>
  );
};

export default ButtonPanel;
