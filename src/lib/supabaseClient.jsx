import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inmdodhmvwssqhavawxx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubWRvZGhtdndzc3FoYXZhd3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzU3MDIsImV4cCI6MjA3NDc1MTcwMn0.POvHRTqBuemdcejA9yORYK6vxuiQyyJaPyfKenaa5rI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);