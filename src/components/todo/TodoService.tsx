/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useState, useEffect, useRef } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  endDate: string
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const nextIdState = useRef(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData(); 
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState.current ++;
  };

  const computedNextId = (todo : Itodo[]) : number => {
    let max = 0
    todo.forEach((item) => {
      max = Math.max(item.id, max)
    })
    return max + 1
  }

  const sortTodoList = (todoList : Itodo[]) : Itodo[] => {
    return todoList.sort((preTodo : Itodo, nextTodo : Itodo) => {
      const preEndDate = moment(preTodo.endDate)
      const nextEndDate = moment(nextTodo.endDate)
      return preEndDate.diff(nextEndDate)
    })
  }

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) => 
      prevState.map((todo: Itodo) => todo.id === id ? {...todo, done : !todo.done} : todo)
    )
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    const nextId = nextIdState.current
    setTodoState((prevState) =>
      sortTodoList(prevState.concat({
        ...todo,
        id: nextId
      }))
    );
  };

  const clearDoneTodo = () => {
    setTodoState((preState) => 
      preState.filter((todo : Itodo) => !todo.done)
    )
  }

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    nextIdState.current = computedNextId(initialTodos)
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState : nextIdState.current,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    clearDoneTodo
  };
};
