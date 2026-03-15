'use client';
import { MapPin, Star } from 'lucide-react';

export default function NearbyList() {
  const people = [
    { id: 1, name: 'Elena R.', mode: 'Aventureira', match: 95, distance: '2km', avatar: 'https://i.pravatar.cc/150?u=elena' },
    { id: 2, name: 'Marcus T.', mode: 'Soft', match: 82, distance: '5km', avatar: 'https://i.pravatar.cc/150?u=marcus' },
    { id: 3, name: 'Sophia L.', mode: 'Aventureira', match: 78, distance: '8km', avatar: 'https://i.pravatar.cc/150?u=sophia' },
  ];

  return (
    <div className="flex flex-col gap-4 mt-6 pb-24">
      {people.map((person) => (
        <div 
          key={person.id} 
          className="group relative flex items-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-300"
        >
          {/* Glowing background effect on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00D4FF]/0 via-[#00D4FF]/10 to-[#00D4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="relative z-10 flex gap-4 w-full">
            <img 
              src={person.avatar} 
              alt={person.name} 
              className="w-14 h-14 rounded-full border border-white/20 object-cover" 
            />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-white font-semibold text-lg">{person.name}</h3>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-3 h-3 text-[#00D4FF]" />
                <span>{person.distance}</span>
                <span className="text-white/30">•</span>
                <span>{person.mode}</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <div className="flex items-center gap-1 text-[#00D4FF] font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{person.match}%</span>
              </div>
              <span className="text-xs text-white/50">Match</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
