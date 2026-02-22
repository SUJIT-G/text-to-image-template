"use client";
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ProductivityDashboard() {
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  // Habits State
  const [habits, setHabits] = useState([
    { id: 1, text: 'Drink 2L Water', completed: false },
    { id: 2, text: 'Read 10 Pages', completed: true },
    { id: 3, text: 'Post on LinkedIn', completed: false },
  ]);

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); setTimeLeft(25 * 60); };
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Pomodoro Timer */}
      <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col items-center justify-center min-h-[300px] shadow-2xl">
        <h3 className="text-zinc-400 font-medium mb-4 uppercase tracking-widest text-sm">Focus Session</h3>
        <div className="text-6xl font-black bg-gradient-to-br from-violet-400 to-pink-500 bg-clip-text text-transparent tabular-nums mb-8">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-4">
          <button onClick={toggleTimer} className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full transition-colors">
            {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button onClick={resetTimer} className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full transition-colors">
            <RotateCcw size={24} />
          </button>
        </div>
      </Card>

      {/* Habit Tracker */}
      <Card className="p-6 bg-zinc-900 border-zinc-800 min-h-[300px] shadow-2xl">
        <h3 className="text-zinc-400 font-medium mb-6 uppercase tracking-widest text-sm">Daily Habits</h3>
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li key={habit.id} 
                onClick={() => toggleHabit(habit.id)}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors border border-transparent hover:border-zinc-800">
              {habit.completed ? (
                <CheckCircle2 className="text-pink-500" size={24} />
              ) : (
                <Circle className="text-zinc-600" size={24} />
              )}
              <span className={`text-sm font-medium ${habit.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                {habit.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Focus Sounds */}
      <Card className="p-6 bg-zinc-900 border-zinc-800 min-h-[300px] shadow-2xl">
        <h3 className="text-zinc-400 font-medium mb-6 uppercase tracking-widest text-sm">Focus Sounds</h3>
        <div className="grid grid-cols-2 gap-4">
          {['Rain', 'Cafe', 'Waves', 'Lofi'].map((sound) => (
            <button key={sound} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-800 hover:border-violet-500 hover:bg-zinc-800/50 transition-all group">
              <Music className="text-zinc-500 group-hover:text-violet-400" size={24} />
              <span className="text-xs text-zinc-400 group-hover:text-zinc-200">{sound}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
