'use client';

import { Teacher } from '@/lib/teachers';
import { useRouter } from 'next/navigation';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/chat/${teacher.id}`)}
      className="group cursor-pointer"
    >
      <div className={`bg-gradient-to-br ${teacher.color} p-8 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
        <div className="text-5xl mb-4">{teacher.avatar}</div>
        <h3 className="text-2xl font-bold mb-1">{teacher.name}</h3>
        <p className="text-white/80 mb-3">{teacher.subject}</p>
        <p className="text-sm text-white/90">{teacher.description}</p>
        
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm bg-white/20 px-4 py-2 rounded-full">
            Начать урок →
          </span>
        </div>
      </div>
    </div>
  );
}