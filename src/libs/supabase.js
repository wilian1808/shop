import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qsmgnrdftdlsomxfjzuv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbWducmRmdGRsc29teGZqenV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxNTg3ODIsImV4cCI6MTk4MDczNDc4Mn0.LuL0XnCIYAjsqp0Koh_-owD6BfCHtC-JUsIgsAxiZk0'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  multiTab: false
})

export default supabase
