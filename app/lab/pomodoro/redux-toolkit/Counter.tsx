'use client'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, increment, RootState } from "./store"

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}