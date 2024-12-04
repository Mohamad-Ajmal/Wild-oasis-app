
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rdsdlbpdkrdyuijcrclk.supabase.co'
// eslint-disable-next-line no-undef
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkc2RsYnBka3JkeXVpamNyY2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODcxNjAsImV4cCI6MjA0ODg2MzE2MH0.ZGwM7YoU-Koi3SNuclAtyaWbD7Zv7FQOT1-p7yTJwFM";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase