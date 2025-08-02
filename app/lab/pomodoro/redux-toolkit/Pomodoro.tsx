'use client'

import { Provider } from "react-redux";
import Counter from "./Counter";
import { store } from "./store";

export default function Pomodoro(){
  return (
    <div>
      <h1>Pomodoro</h1>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  )
}