import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


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

// Log user details
const logUserName = async () => {
    const user = await fetchAuthenticatedUser();

    if (user) {
        console.log(user.user_metadata?.user_name || 'Username not found');
        console.log(user.email || 'Email not found');
    }
};

// Call the function to log user details
logUserName();