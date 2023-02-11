import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string
const anonKey =  process.env.REACT_APP_ANON_KEY as string

export const supabase = createClient(supabaseUrl, anonKey)