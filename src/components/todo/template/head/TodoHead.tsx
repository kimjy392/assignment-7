import React from "react";
import styled from "styled-components";
import { useState, useEffect } from 'react'
import  moment from "moment";
const TodoHeadBlock = styled.div`
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateBlock = styled.div`
  display: flex;
  justify-content: center;
`;
const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TimeText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
  display: flex;
  justify-content: center;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const [ today, setToday ] = useState(moment())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setToday(moment())
    }, 1000)
    return () => clearInterval(intervalId)
  },[])

  return (
    <TodoHeadBlock>
      <DateBlock>
        <DayText>{today.format("dddd")}</DayText>
        <DateText>{today.format("MMMM D, YYYY")}</DateText>
      </DateBlock>
      <TimeText>{today.format("HH : mm : ss")}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
