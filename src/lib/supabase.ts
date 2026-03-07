import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://efnxsjneewsqhxcglelz.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmbnhzam5lZXdzcWh4Y2dsZWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NjMxNjIsImV4cCI6MjA4NDMzOTE2Mn0.UZ2JQ9uq9VqZ3_LtjUAYTehOHz0ia-bcfimL7sKMbAk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
