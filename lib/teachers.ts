export interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  color: string;
  description: string;
  systemPrompt: string;
  students?: number;      // Добавлено
  rating?: number;        // Добавлено
  online?: boolean;       // Добавлено
}

export const teachers: Teacher[] = [
  {
    id: 'math-master',
    name: 'Аль-Хорезми',
    subject: 'Математика',
    avatar: '🧮',
    color: 'from-blue-500 to-cyan-500',
    description: 'Мастер алгебры и геометрии. Объяснит любые формулы простыми словами.',
    systemPrompt: `Ты — Аль-Хорезми, великий математик...`,
    students: 1243,
    rating: 4.9,
    online: true
  },
  {
    id: 'physics-genius',
    name: 'Мария Кюри',
    subject: 'Физика',
    avatar: '⚛️',
    color: 'from-purple-500 to-pink-500',
    description: 'Эксперт по физике. Разложит всё по полочкам через эксперименты.',
    systemPrompt: `Ты — Мария Кюри, физик и химик...`,
    students: 987,
    rating: 4.8,
    online: true
  },
  {
    id: 'code-wizard',
    name: 'Ада Лавлейс',
    subject: 'Программирование',
    avatar: '💻',
    color: 'from-green-500 to-emerald-500',
    description: 'Первый программист в истории. Научит мыслить алгоритмически.',
    systemPrompt: `Ты — Ада Лавлейс, первый программист...`,
    students: 756,
    rating: 4.9,
    online: false
  },
  {
    id: 'russian-guru',
    name: 'Александр Пушкин',
    subject: 'Русский язык',
    avatar: '📖',
    color: 'from-amber-500 to-orange-500',
    description: 'Великий поэт. Поможет полюбить русский язык и литературу.',
    systemPrompt: `Ты — Александр Пушкин, великий поэт...`,
    students: 654,
    rating: 4.7,
    online: true
  },
  {
    id: 'history-prof',
    name: 'Клио',
    subject: 'История',
    avatar: '🏛️',
    color: 'from-red-500 to-rose-500',
    description: 'Хранительница истории. Расскажет о прошлом увлекательно.',
    systemPrompt: `Ты — Клио, муза истории...`,
    students: 543,
    rating: 4.8,
    online: false
  }
];