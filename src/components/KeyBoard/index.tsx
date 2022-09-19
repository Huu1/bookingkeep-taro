import React, { useState } from "react";
import { View } from "@tarojs/components";
import dayjs from "dayjs";
import "./index.less";
import calculate from "./operation";
import ButtonPanel from "./buttonpanel";
import Display from "./display";

const Keyboard = props => {
  const [state, setState] = useState({
    total: 0,
    next: null,
    operation: null
  });

  const [remark, setRemarks] = useState("");
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY/MM/DD"));

  const handleClick = buttonName => {
    const newState = calculate(state, buttonName) as any;
    setState(old => ({ ...old, ...newState }));
  };

  return (
    <View className='keyboard'>
      <Display
        value={
          (state.total || "") + (state.operation || "") + (state.next || "") ||
          0
        }
        remarks={remark}
        setRemarks={setRemarks}
      />
      <ButtonPanel
        handelSubmit={() => props.handelSubmit({
          remark,
          date,
          amount: state.total || state.next
        })}
        state={state}
        date={date}
        setDate={setDate}
        handleClick={handleClick}
      />
    </View>
  );
};

export default Keyboard;
