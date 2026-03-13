'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { teachers } from '@/lib/teachers';
import { 
  LogOut, Bell, Search, Menu, Calendar, Clock,
  ChevronRight, Star, Users, Zap, Activity,
  GraduationCap, BookMarked, Trophy, Flame,
  BookOpen, TrendingUp, Award, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { TeacherCard } from '@/components/ui/TeacherCard';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SearchField } from '@/components/ui/SearchField';
import FadeIn from '@/components/animations/FadeIn';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
        
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setUserData(data);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Фильтрация учителей
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const stats = [
    { icon: <BookOpen size={20} />, label: 'Изучено тем', value: '12', trend: '+2', color: 'blue' },
    { icon: <Flame size={20} />, label: 'Дней подряд', value: '7', trend: '+1', color: 'orange' },
    { icon: <Trophy size={20} />, label: 'Уровень', value: '5', trend: '', color: 'purple' },
    { icon: <Clock size={20} />, label: 'Часов', value: '48', trend: '+5', color: 'green' }
  ];

  const subjects = ['all', 'Математика', 'Физика', 'Программирование', 'Русский язык', 'История'];

  const recentActivities = [
    { id: 1, teacher: 'Аль-Хорезми', topic: 'Квадратные уравнения', time: '2 часа назад', avatar: '🧮' },
    { id: 2, teacher: 'Мария Кюри', topic: 'Законы Ньютона', time: 'вчера', avatar: '⚛️' },
    { id: 3, teacher: 'Ада Лавлейс', topic: 'Циклы в Python', time: '2 дня назад', avatar: '💻' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <motion.div 
          className="w-12 h-12 border-2 border-gray-900 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Навигация */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Menu size={20} className="text-gray-600" />
              </button>
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="font-semibold text-gray-900">EDU AI</span>
              </Link>
            </div>

            {/* Поиск */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Поиск учителей, тем..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <Avatar 
                  name={userData?.name || user?.email?.charAt(0).toUpperCase()} 
                  size="md"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.name || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">Ученик</p>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Основной контент */}
      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* Приветствие */}
        <div className="mb-8">
          <FadeIn>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              С возвращением, {userData?.name || user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-gray-500">Вот твой прогресс за сегодня</p>
          </FadeIn>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                color={stat.color}
              />
            </FadeIn>
          ))}
        </div>

        {/* Выбор учителей */}
        <div className="mb-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Выбери учителя
              </h2>
              <Link 
                href="/teachers" 
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                Все учителя
                <ChevronRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {/* Фильтры */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedSubject === subject
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {subject === 'all' ? 'Все предметы' : subject}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Сетка учителей */}
          {filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher, index) => (
                <FadeIn key={teacher.id} delay={index * 0.1}>
                  <TeacherCard {...teacher} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">Ничего не найдено</p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('all');
                }}
                className="mt-2"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>

        {/* Две колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Твой прогресс по предметам
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Математика</span>
                      <span className="font-medium text-gray-900">78%</span>
                    </div>
                    <ProgressBar value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Физика</span>
                      <span className="font-medium text-gray-900">65%</span>
                    </div>
                    <ProgressBar value={65} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Программирование</span>
                      <span className="font-medium text-gray-900">42%</span>
                    </div>
                    <ProgressBar value={42} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Недавние занятия */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Недавние занятия
                </h3>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/chat/${activity.teacher === 'Аль-Хорезми' ? 'math-master' : 
                                                             activity.teacher === 'Мария Кюри' ? 'physics-genius' : 
                                                             'code-wizard'}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          {activity.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.topic}</p>
                          <p className="text-xs text-gray-500">{activity.teacher}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Правая колонка */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <Zap size={24} className="mb-4" />
                <h3 className="font-semibold text-lg mb-2">Отличная работа!</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Ты уже изучил 12 тем. До нового уровня осталось всего 3 урока!
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
                  </div>
                  <span className="text-sm text-gray-300">65%</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Рекомендуем
                </h3>
                <div className="space-y-3">
                  {[
                    { topic: 'Квадратные уравнения', teacher: 'Аль-Хорезми', difficulty: 'Средняя' },
                    { topic: 'Законы Ньютона', teacher: 'Мария Кюри', difficulty: 'Сложная' },
                    { topic: 'Циклы в Python', teacher: 'Ада Лавлейс', difficulty: 'Легкая' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/chat/${item.teacher === 'Аль-Хорезми' ? 'math-master' : 
                                                             item.teacher === 'Мария Кюри' ? 'physics-genius' : 
                                                             'code-wizard'}`)}
                    >
                      <p className="font-medium text-gray-900">{item.topic}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{item.teacher}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-xs text-gray-500">{item.difficulty}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button 
                variant="primary" 
                fullWidth 
                size="lg"
                onClick={() => router.push('/chat/math-master')}
              >
                Начать урок
              </Button>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}