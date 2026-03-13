import { createClient } from '@supabase/supabase-js'

// ВНИМАНИЕ: Этот ключ НИКОГДА не должен быть в клиентском коде!
// Используй его только в API роутах (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)