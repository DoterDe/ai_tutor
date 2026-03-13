export interface Teacher {
  id: string;
  name: string;
  subject: string;
  description: string;
  avatar: string;
  rating: number;
  students: number;
  lessons: number;
  languages: string[];
  tags: string[];
  online: boolean;
  price: number;
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Анна Соколова",
    subject: "Математика",
    description: "Кандидат математических наук, 8 лет опыта преподавания. Специализируюсь на подготовке к ЕГЭ и олимпиадам.",
    avatar: "https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.9,
    students: 1240,
    lessons: 3580,
    languages: ["Русский", "English"],
    tags: ["Алгебра", "Геометрия", "ЕГЭ"],
    online: true,
    price: 1500,
  },
  {
    id: "2",
    name: "Михаил Петров",
    subject: "Физика",
    description: "Профессор кафедры теоретической физики. Делаю сложное простым. Работаю со школьниками и студентами.",
    avatar: "https://images.unsplash.com/photo-1584554376766-ac0f2c65e949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.8,
    students: 890,
    lessons: 2100,
    languages: ["Русский"],
    tags: ["Механика", "Термодинамика", "Квантовая физика"],
    online: false,
    price: 2000,
  },
  {
    id: "3",
    name: "София Ли",
    subject: "Английский язык",
    description: "Носитель языка, преподаватель с сертификатом CELTA. Помогу достичь уровня C1 за 6 месяцев.",
    avatar: "https://images.unsplash.com/photo-1758525863847-9b904854d747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5.0,
    students: 2100,
    lessons: 8900,
    languages: ["English", "中文"],
    tags: ["Разговорный", "IELTS", "Бизнес English"],
    online: true,
    price: 1800,
  },
  {
    id: "4",
    name: "Джеймс Ким",
    subject: "Программирование",
    description: "Senior Software Engineer в Google. Преподаю Python, JavaScript и алгоритмы. Подготовка к техническим собеседованиям.",
    avatar: "https://images.unsplash.com/photo-1758600431229-191932ccee81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.9,
    students: 3400,
    lessons: 12000,
    languages: ["English", "한국어"],
    tags: ["Python", "JavaScript", "Алгоритмы"],
    online: true,
    price: 2500,
  },
  {
    id: "5",
    name: "Мария Иванова",
    subject: "Химия",
    description: "Выпускница МГУ, аспирант. Провожу онлайн-уроки для школьников и студентов. Эксперт по подготовке к ЕГЭ по химии.",
    avatar: "https://images.unsplash.com/photo-1758685848006-1bc450061624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.7,
    students: 560,
    lessons: 1200,
    languages: ["Русский", "English"],
    tags: ["Органика", "Неорганика", "ЕГЭ"],
    online: false,
    price: 1200,
  },
  {
    id: "6",
    name: "Давид Мартин",
    subject: "История",
    description: "Историк, автор книг по мировой истории. Рассказываю историю как захватывающий рассказ. 12 лет педагогического стажа.",
    avatar: "https://images.unsplash.com/photo-1673515334717-da4d85aaf38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4.8,
    students: 780,
    lessons: 2800,
    languages: ["Русский", "Español", "English"],
    tags: ["Всеобщая история", "ЕГЭ", "Олимпиады"],
    online: true,
    price: 1400,
  },
];

export const chatHistory: Record<string, Message[]> = {
  "1": [
    { id: "1", role: "ai", text: "Привет! Я Анна, твой AI-репетитор по математике. Чем могу помочь сегодня?", time: "10:00" },
    { id: "2", role: "user", text: "Привет! Мне нужна помощь с производными.", time: "10:01" },
    { id: "3", role: "ai", text: "Отлично! Производные — фундаментальная тема математического анализа. С чего начнём — с определения или сразу к правилам вычисления?", time: "10:01" },
    { id: "4", role: "user", text: "Давай с правил. Я уже знаю определение.", time: "10:02" },
    { id: "5", role: "ai", text: "Хорошо! Вот основные правила:\n\n1. (С)' = 0 — производная константы равна нулю\n2. (xⁿ)' = n·xⁿ⁻¹ — степенная функция\n3. (u+v)' = u'+v' — производная суммы\n4. (u·v)' = u'·v + u·v' — произведение\n\nХочешь разобрать каждое на примерах?", time: "10:03" },
  ],
  "3": [
    { id: "1", role: "ai", text: "Hello! I'm Sofia, your English AI tutor. Ready to practice today? 😊", time: "09:30" },
    { id: "2", role: "user", text: "Hi Sofia! Yes, I want to improve my speaking.", time: "09:31" },
    { id: "3", role: "ai", text: "Great choice! Speaking is often the most challenging skill. Let's start with a simple topic — tell me about your last vacation or a memorable trip. Don't worry about mistakes, just speak freely!", time: "09:31" },
  ],
};

export interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

export const recentLessons = [
  { id: "1", teacher: "Анна Соколова", subject: "Математика", topic: "Производные функций", date: "Сегодня", duration: "60 мин", avatar: "https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "2", teacher: "София Ли", subject: "Английский", topic: "Business English - Presentations", date: "Вчера", duration: "45 мин", avatar: "https://images.unsplash.com/photo-1758525863847-9b904854d747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "3", teacher: "Джеймс Ким", subject: "Программирование", topic: "Алгоритм сортировки слиянием", date: "2 дня назад", duration: "90 мин", avatar: "https://images.unsplash.com/photo-1758600431229-191932ccee81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
];
