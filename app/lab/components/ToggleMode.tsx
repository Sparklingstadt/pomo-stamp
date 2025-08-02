'use client';

import { useState, useEffect } from 'react';
import { PomodoroMode, TimerDirection } from '../lib/types';
import { getNextMode, getInitialSeconds } from '../lib/utils';

export default function Pomodoro() {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [direction, setDirection] = useState<TimerDirection>('down');
  const [seconds, setSeconds] = useState(getInitialSeconds(mode));

  useEffect(() => {
    if (direction === 'down' && seconds === 0) {
      const next = getNextMode(mode);
      setMode(next);
      setSeconds(getInitialSeconds(next));
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (direction === 'down') return prev > 0 ? prev - 1 : 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, mode, direction]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div>
      <h1>Pomodoro Mode: {mode}</h1>
      <h2>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </h2>
      <button
        onClick={() => {
          const next = getNextMode(mode);
          setMode(next);
          setSeconds(getInitialSeconds(next));
        }}
      >
        Toggle Mode
      </button>
      <button
        onClick={() => {
          setDirection((prev) => (prev === 'down' ? 'up' : 'down'));
          setSeconds(0); // カウントアップは0から開始
        }}
      >
        Switch to {direction === 'down' ? 'Count Up' : 'Count Down'}
      </button>
    </div>
  );
}
