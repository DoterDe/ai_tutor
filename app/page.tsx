'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Zap, Brain, Target, 
  ChevronRight, Star, Users, Clock, BookOpen,
  MessageCircle, Award, TrendingUp, CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ChatMessage } from '../components/ui/ChatMessage';
import { TeacherCard } from '../components/ui/TeacherCard';
import { StatCard } from '../components/ui/StatCard';
import FadeIn from '../components/animations/FadeIn';
import TextReveal from '../components/animations/TextReveal';
// Данные для отображения
const teachers = [
  {
    id: 'math-master',
    name: 'Аль-Хорезми',
    subject: 'Математика',
    avatar: '🧮',
    description: 'Мастер алгебры и геометрии. Объяснит любые формулы простыми словами.',
    students: 1243,
    rating: 4.9
  },
  {
    id: 'physics-genius',
    name: 'Мария Кюри',
    subject: 'Физика',
    avatar: '⚛️',
    description: 'Эксперт по физике. Разложит всё по полочкам через эксперименты.',
    students: 987,
    rating: 4.8
  },
  {
    id: 'code-wizard',
    name: 'Ада Лавлейс',
    subject: 'Программирование',
    avatar: '💻',
    description: 'Первый программист в истории. Научит мыслить алгоритмически.',
    students: 756,
    rating: 4.9
  }
];

const stats = [
  { value: '10K+', label: 'активных учеников', icon: Users },
  { value: '50K+', label: 'проведенных уроков', icon: BookOpen },
  { value: '4.9', label: 'средняя оценка', icon: Star },
  { value: '24/7', label: 'доступность', icon: Clock }
];

const features = [
  {
    icon: Brain,
    title: 'Умный AI',
    desc: 'Понимает контекст и подстраивается под твой уровень'
  },
  {
    icon: Zap,
    title: 'Мгновенно',
    desc: 'Ответы за секунды, 24/7 без ожидания'
  },
  {
    icon: Target,
    title: 'Точно в цель',
    desc: 'Объясняет сложное простыми словами'
  }
];

const reviews = [
  {
    name: 'Анна С.',
    role: 'Ученица 10 класса',
    text: 'С математикой всегда были проблемы, но Аль-Хорезми объяснил так, что я наконец поняла!',
    rating: 5,
    avatar: '👧'
  },
  {
    name: 'Дмитрий К.',
    role: 'Студент',
    text: 'Готовлюсь к экзаменам по физике. Мария Кюри — просто космос! Очень понятные объяснения.',
    rating: 5,
    avatar: '👨‍🎓'
  },
  {
    name: 'Елена В.',
    role: 'Родитель',
    text: 'Сын теперь сам просит дополнительные занятия. Спасибо за такой подход!',
    rating: 5,
    avatar: '👩'
  }
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Навигация */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <span className="text-3xl">🧠</span>
              <span className="font-semibold text-gray-900 text-lg">EDU AI</span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/teachers" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Учителя
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Тарифы
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                О платформе
              </Link>
              <Link href="/reviews" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Отзывы
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-2">
                Войти
              </Link>
              <Button 
                variant="primary" 
                size="md"
                onClick={() => router.push('/register')}
              >
                Начать бесплатно
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero секция */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Фоновый градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn>
              {/* Powered by badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 mb-8 cursor-pointer"
                onClick={() => router.push('https://ai.google.dev/gemini')}
              >
                <Zap size={16} className="text-blue-600" />
                <span>Powered by Gemini</span>
                <ChevronRight size={14} />
              </motion.div>
              
              {/* Заголовок */}
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <TextReveal text="Учись с AI" />
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  расти быстрее
                </span>
              </h1>
              
              {/* Подзаголовок */}
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                Персональные AI-учителя по любому предмету. Занимайся когда угодно, 
                получай мгновенные ответы и достигай своих целей.
              </p>

              {/* Кнопки */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                  onClick={() => router.push('/register')}
                >
                  Начать бесплатно
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => {
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Посмотреть демо
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Без карты</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>14 дней бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Отмена в любой момент</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <stat.icon size={14} />
                    <span>{stat.label}</span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Демо чат */}
      <section id="demo" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Посмотри, как это работает</h2>
              <p className="text-gray-600">Живой пример общения с AI-учителем</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="border border-gray-200 rounded-3xl p-8 bg-white shadow-lg max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  🧮
                </div>
                <div>
                  <h3 className="font-semibold">Аль-Хорезми</h3>
                  <p className="text-xs text-gray-500">Математика • онлайн</p>
                </div>
              </div>

              <ChatMessage 
                role="user" 
                content="Объясни мне производные функций простыми словами"
                timestamp="12:34"
              />
              
              <div className="mt-4">
                <ChatMessage 
                  role="assistant"
                  content={
                    <div>
                      <p className="mb-2">Представь, что едешь на машине:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>🚗 Твоя позиция на дороге — это x(t)</li>
                        <li>⚡ Твоя скорость — это производная x'(t)</li>
                        <li>📈 Чем быстрее едешь, тем больше производная</li>
                      </ul>
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                        <p className="text-blue-700 text-xs">
                          ⚡ Совет: Производная показывает, как быстро меняется функция
                        </p>
                      </div>
                      <p className="mt-3 text-blue-600 text-xs font-medium">
                        Live preview loading, interactions may not be saved
                      </p>
                      <p className="mt-2 italic text-gray-700">
                        Если позиция x(t), то скорость — это x'(t). Проще некуда!
                      </p>
                    </div>
                  }
                  timestamp="12:35"
                  avatar="🤖"
                />
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center"
              >
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => router.push('/register')}
                >
                  Попробовать самому
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Учителя */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши учителя</h2>
              <p className="text-gray-600">Выбери своего наставника</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachers.map((teacher, index) => (
              <FadeIn key={teacher.id} delay={index * 0.1}>
                <TeacherCard {...teacher} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/teachers')}
                icon={<ChevronRight size={16} />}
                iconPosition="right"
              >
                Все учителя
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
              <p className="text-gray-600">Три главные причины учиться с AI</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Что говорят ученики</h2>
              <p className="text-gray-600">Реальные отзывы наших пользователей</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white mb-4">
              Готов начать учиться?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Присоединяйся к тысячам учеников уже сегодня
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => router.push('/register')}
              >
                Создать аккаунт
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => router.push('/teachers')}
              >
                Выбрать учителя
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Бесплатно навсегда. Карта не нужна.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧠</span>
                <span className="font-semibold text-gray-900">AI Tutor</span>
              </div>
              <p className="text-sm text-gray-500">
                Персональные AI-учителя для каждого. Учись с лучшими умами человечества.
              </p>
            </div>
            
            {[
              {
                title: 'Продукт',
                links: ['Учителя', 'Тарифы', 'Как это работает', 'Отзывы']
              },
              {
                title: 'Ресурсы',
                links: ['Блог', 'Помощь', 'API', 'Статус']
              },
              {
                title: 'Компания',
                links: ['О нас', 'Карьера', 'Контакты', 'Партнерам']
              }
            ].map((column, i) => (
              <div key={i}>
                <h4 className="font-semibold text-gray-900 mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={`/${link.toLowerCase().replace(' ', '-')}`}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 AI Tutor. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-600">
                Конфиденциальность
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-600">
                Условия
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-gray-600">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}