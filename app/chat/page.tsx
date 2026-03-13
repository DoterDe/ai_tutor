'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { teachers } from '@/lib/teachers';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function TeacherChatPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacher as string;
  
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Находим учителя по ID
  const teacher = teachers.find(t => t.id === teacherId);

  // Проверяем авторизацию
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  // Если учитель не найден
  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Учитель не найден</h1>
          <Link href="/dashboard" className="text-[#0071e3] hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = text.trim();
    if (!messageText || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    setText('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          teacherId: teacher.id
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content
      };

      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err: any) {
      console.error('Ошибка:', err);
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Шапка */}
      <header className="bg-white border-b border-[#d2d2d7]/30 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[#86868b] hover:text-[#0071e3]">
              ← Назад
            </Link>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-white text-xl`}>
              {teacher.avatar}
            </div>
            <div>
              <h1 className="font-semibold">{teacher.name}</h1>
              <p className="text-sm text-[#86868b]">{teacher.subject}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Чат */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl border border-[#d2d2d7]/30 shadow-sm min-h-[600px] flex flex-col">
          
          {/* Сообщения */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-white text-4xl mb-4`}>
                  {teacher.avatar}
                </div>
                <h2 className="text-xl font-semibold mb-2">{teacher.name}</h2>
                <p className="text-[#86868b]">{teacher.description}</p>
                <p className="text-sm text-[#86868b] mt-4">
                  Напиши свой первый вопрос!
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-white text-sm mr-2`}>
                    {teacher.avatar}
                  </div>
                )}
                <div className={`p-4 rounded-2xl max-w-[80%] ${
                  m.role === 'user' 
                    ? 'bg-[#0071e3] text-white rounded-br-none' 
                    : 'bg-[#f5f5f7] text-[#1d1d1f] rounded-bl-none'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-white text-sm mr-2`}>
                  {teacher.avatar}
                </div>
                <div className="bg-[#f5f5f7] p-4 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#86868b] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#86868b] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#86868b] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ввод */}
          <div className="p-4 border-t">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Спроси ${teacher.name}...`}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#0071e3] text-white px-6 py-3 rounded-xl disabled:bg-gray-300"
                disabled={isLoading || !text.trim()}
              >
                {isLoading ? '...' : '→'}
              </button>
            </form>
            
            {error && (
              <div className="mt-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}