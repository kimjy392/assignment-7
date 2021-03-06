import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled, { css } from "styled-components";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 2;
  height: 100%;
  font-size: 16px;
  white-space: nowrap;
  color: #119955;
  overflow: hidden;
  text-overflow: ellipsis; 
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const DateText = styled.div<{ done: boolean }>`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const done = todo.done;
  const handleToggle = (id : number) => {
    toggleTodo(id)
  };

  const handleRemove = (id: number) => {
    removeTodo(id)
  };

  const onOpenModal = (todo: Itodo) => {
    Modal.info({
      title : "Todo",
      content: todo.text,
      okText: "Cancel"
    })
  }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={() => handleToggle(todo.id)}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <Text onClick={() => onOpenModal(todo)} done={done}>{todo.text}</Text>
      <DateText done={done}>{todo.endDate}</DateText>
      <Remove onClick={() => {handleRemove(todo.id)}}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
