"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Pin } from 'lucide-react';

// Mock Data matching the D1 Schema
const mockPosts = [
  { id: '1', date: 15, platform: 'instagram', status: 'scheduled', preview: 'Product Launch 🚀' },
  { id: '2', date: 18, platform: 'pinterest', status: 'posted', preview: 'Design Inspo' },
];

export function ContentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const daysInMonth = new Date(2026, currentMonth + 1, 0).getDate();
  
  const renderPlatformIcon = (platform: string) => {
    if (platform === 'instagram') return <Instagram size={14} className="text-pink-500" />;
    if (platform === 'pinterest') return <Pin size={14} className="text-red-500" />;
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-100">Content Calendar</h2>
        <div className="flex gap-2">
          <button className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-800" onClick={() => setCurrentMonth(prev => prev - 1)}>
            <ChevronLeft size={20} className="text-zinc-400"/>
          </button>
          <button className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-800" onClick={() => setCurrentMonth(prev => prev + 1)}>
            <ChevronRight size={20} className="text-zinc-400"/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-zinc-950 p-3 text-xs font-medium text-zinc-500 text-center uppercase tracking-wider">
            {day}
          </div>
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayPosts = mockPosts.filter(p => p.date === i + 1);
          return (
            <div key={i} className="bg-zinc-900 min-h-[120px] p-2 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
              <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">{i + 1}</span>
              <div className="mt-2 space-y-2">
                {dayPosts.map(post => (
                  <div key={post.id} className="flex items-center gap-2 text-xs p-2 rounded-md bg-zinc-950 border border-zinc-800 truncate">
                    {renderPlatformIcon(post.platform)}
                    <span className="text-zinc-300 truncate">{post.preview}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
