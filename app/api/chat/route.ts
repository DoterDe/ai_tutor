// import { google } from '@ai-sdk/google';
// import { generateText } from 'ai';

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   console.log('\n=== НОВЫЙ ЗАПРОС ===');
  
//   try {
//     const body = await req.json();
//     const { messages } = body;
    
//     const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    
//     if (!lastUserMessage) {
//       return new Response(
//         JSON.stringify({ error: 'Нет сообщения пользователя' }),
//         { status: 400 }
//       );
//     }

//     const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
//     // 🔥 ИСПОЛЬЗУЕМ ПРАВИЛЬНЫЕ МОДЕЛИ ИЗ СПИСКА
//     const modelsToTry = [
//       'models/gemini-2.5-flash',        // Самая новая версия
//       'models/gemini-2.5-pro',           // Pro версия
//       'models/gemini-2.0-flash',         // Стабильная версия
//       'models/gemini-flash-latest',      // Последняя flash
//       'models/gemini-pro-latest',        // Последняя pro
//     ];

//     let lastError = null;
//     let workingModel = null;
//     let response = null;
    
//     // Пробуем каждую модель по очереди
//     for (const modelName of modelsToTry) {
//       try {
//         console.log(`🔄 Пробуем модель: ${modelName}`);
        
//         const result = await generateText({
//           model: google(modelName, { apiKey }),
//           prompt: lastUserMessage.content,
//         });
        
//         console.log(`✅ Модель ${modelName} работает!`);
//         workingModel = modelName;
//         response = result;
//         break; // Выходим из цикла если нашли рабочую модель
        
//       } catch (error: any) {
//         console.log(`❌ Модель ${modelName} не работает:`, error.message);
//         lastError = error;
//       }
//     }
    
//     // Если нашли рабочую модель
//     if (response) {
//       return new Response(
//         JSON.stringify({ 
//           role: 'assistant',
//           content: response.text,
//           model: workingModel // Показываем какая модель сработала
//         }),
//         { 
//           status: 200,
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//     }
    
//     // Если ни одна модель не сработала
//     throw new Error('Ни одна модель Gemini не доступна. Последняя ошибка: ' + lastError?.message);
    
//   } catch (error: any) {
//     console.error('❌ Ошибка:', error);
    
//     return new Response(
//       JSON.stringify({ 
//         error: error.message,
//         tip: 'Попробуй models/gemini-2.0-flash - она должна работать'
//       }), 
//       { status: 500 }
//     );
//   }
// }

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { teachers } from '../../../lib/teachers';

export const maxDuration = 30;

export async function POST(req: Request) {
  console.log('\n=== НОВЫЙ ЗАПРОС ===');
  
  try {
    const body = await req.json();
    const { messages, teacherId } = body;
    
    // Находим учителя по ID или берем первого
    const teacher = teachers.find(t => t.id === teacherId) || teachers[0];
    
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    
    if (!lastUserMessage) {
      return new Response(
        JSON.stringify({ error: 'Нет сообщения пользователя' }),
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API ключ не найден' }),
        { status: 500 }
      );
    }

    // Формируем промпт с учетом учителя
    const fullPrompt = teacherId 
      ? `${teacher.systemPrompt}\n\nВопрос ученика: ${lastUserMessage.content}`
      : lastUserMessage.content;
    
    // 🔥 ИСПРАВЛЕНО: API ключ передается через переменную окружения, а не вторым аргументом
    const modelsToTry = [
      'models/gemini-2.5-flash',
      'models/gemini-2.5-pro',
      'models/gemini-2.0-flash',
      'models/gemini-flash-latest',
      'models/gemini-pro-latest',
    ];

    let lastError = null;
    let workingModel = null;
    let response = null;
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Пробуем модель: ${modelName}`);
        
        // ✅ ПРАВИЛЬНО: API ключ уже в process.env
        const result = await generateText({
          model: google(modelName),
          prompt: fullPrompt,
        });
        
        console.log(`✅ Модель ${modelName} работает!`);
        workingModel = modelName;
        response = result;
        break;
        
      } catch (error: any) {
        console.log(`❌ Модель ${modelName} не работает:`, error.message);
        lastError = error;
      }
    }
    
    if (response) {
      return new Response(
        JSON.stringify({ 
          role: 'assistant',
          content: response.text,
          model: workingModel,
          teacher: teacher.id
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    throw new Error('Ни одна модель Gemini не доступна. Последняя ошибка: ' + lastError?.message);
    
  } catch (error: any) {
    console.error('❌ Ошибка:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}