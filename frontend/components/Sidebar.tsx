import { LayoutDashboard, Calendar, Sparkles, Share2, BarChart3, Settings, Clock } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: 'Home', icon: LayoutDashboard, href: '/' },
  { name: 'Productivity', icon: Clock, href: '/productivity' },
  { name: 'Content Calendar', icon: Calendar, href: '/social/calendar' },
  { name: 'AI Post Generator', icon: Sparkles, href: '/social/generate' },
  { name: 'Social Accounts', icon: Share2, href: '/social/accounts' },
  { name: 'Analytics', icon: BarChart3, href: '/analytics' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#09090b] border-r border-zinc-800 p-4 hidden md:flex flex-col">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
          OmniToolz AI
        </h1>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all"
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
