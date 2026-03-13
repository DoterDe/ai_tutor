'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestTablesPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTables = async () => {
      const tablesToCheck = ['users', 'chats', 'messages', 'weak_topics', 'progress'];
      const results = [];

      for (const table of tablesToCheck) {
        try {
          const { error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          results.push({
            name: table,
            exists: !error,
            error: error?.message || null
          });
        } catch (e: any) {
          results.push({
            name: table,
            exists: false,
            error: e.message
          });
        }
      }

      setTables(results);
      setLoading(false);
    };

    checkTables();
  }, []);

  if (loading) return <div className="p-8">Проверка таблиц...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Проверка таблиц</h1>
      <div className="space-y-2">
        {tables.map(table => (
          <div key={table.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
            <span className="font-mono w-32">{table.name}</span>
            {table.exists ? (
              <span className="text-green-600">✅ существует</span>
            ) : (
              <span className="text-red-600">❌ {table.error || 'не существует'}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}