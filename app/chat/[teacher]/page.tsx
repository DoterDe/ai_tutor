'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { teachers } from '@/lib/teachers';
import { supabase } from '@/lib/supabase';
import { 
  Send, ArrowLeft, MoreVertical, Mic, Image,
  Paperclip, Smile, Info, Check, Clock, Star,
  Users, BookOpen
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const teacher = teachers.find(t => t.id === teacherId);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = text.trim();
    if (!messageText || isLoading || !user || !teacher) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
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

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!teacher) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Учитель не найден</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="flex items-center justify-between px-6 h-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl">
                {teacher.avatar}
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">{teacher.name}</h1>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{teacher.subject}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {teacher.students ? teacher.students.toLocaleString() : '1.2K'} учеников
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Info size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Основной чат */}
      <div className="pt-20 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          {/* Сообщения */}
          <div className="space-y-4 py-6">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-lg mr-2 flex-shrink-0">
                      {teacher.avatar}
                    </div>
                  )}
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-2xl max-w-[80%] ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <p className={`text-xs ${m.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {m.timestamp.toLocaleTimeString()}
                      </p>
                      {m.role === 'user' && <Check size={12} className="text-blue-100" />}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-lg mr-2">
                  {teacher.avatar}
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Форма ввода */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4"
      >
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={18} />
              </button>
              <input
                className="flex-1 py-3 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Спроси ${teacher?.name}...`}
                disabled={isLoading}
              />
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Smile size={18} />
              </button>
            </div>
            
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !text.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </motion.button>
          </form>
          
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}