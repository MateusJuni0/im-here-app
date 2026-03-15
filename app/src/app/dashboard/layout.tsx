'use client';
import { Map, Users, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { icon: Map, label: 'Mapa', href: '/dashboard' },
    { icon: Users, label: 'Grupos', href: '/dashboard/groups' },
    { icon: MessageCircle, label: 'Chat', href: '/dashboard/chat' },
    { icon: User, label: 'Perfil', href: '/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white selection:bg-[#00D4FF]/30 font-sans">
      <main className="max-w-md mx-auto relative min-h-screen flex flex-col">
        {children}

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-md mx-auto relative flex justify-between items-center px-6 py-3 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="relative flex flex-col items-center gap-1 p-2 group"
                >
                  {isActive && (
                    <div className="absolute -top-2 w-1 h-1 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
                  )}
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-[#00D4FF]' : 'text-white/50 group-hover:text-white/80'}`} />
                  <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}
