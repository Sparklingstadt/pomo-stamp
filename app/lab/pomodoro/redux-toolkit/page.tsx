import Counter from "./Counter";
import CounterProvider from "./CounterProvider";

export default function Page(){
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  )
}