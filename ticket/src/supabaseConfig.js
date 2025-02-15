import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sfpgcjkmpqijniyzykau.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmcGdjamttcHFpam5peXp5a2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5ODY0ODgsImV4cCI6MjA0MzU2MjQ4OH0.WiT1sOtfobReGst9Rf56EsqXNziMUWigLUG6VxhKQZs"
console.log('Supabase Anon Key:', supabaseAnonKey); 



export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const fetchAuthenticatedUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
  
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return user;
  };
  
  
  const logUserName = async () => {
    const user = await fetchAuthenticatedUser();
  
    if (user) {
      console.log(user.user_metadata?.user_name || 'Username not found');
      console.log(user.email || 'Email not found');
    }
  };
  
  
  logUserName();

