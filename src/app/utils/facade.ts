"use server";

import { createClient } from './supabase/server';
import { revalidatePath } from 'next/cache';

export async function registerUser(email: string, password: string) {
    const supabase = await createClient();
    const { error} = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error("Registration failed:", error);
        return { error: "Registration failed." };
    }
    return { success: "Registration initiated. Please check your email to confirm." };
}

export async function getSession() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

export const getLoggedInUser = async () => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    if (user.error) {
        return null;
    } else {
        return user.data.user;
    }
};

export async function signInWithOAuth({ provider }: { provider: 'google' | 'facebook' }) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
        console.error("OAuth sign-in failed:", error);
        return { error: "OAuth sign-in failed." };
    }
    return { success: "OAuth sign-in initiated." };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout failed:", error);
        return { error: "Logout failed." };
    }
    revalidatePath('/login');
    return { success: "Logged out successfully." };
}

export async function loginUser(email: string, password: string) {
    const supabase = await createClient();
    const { error} = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error("Login failed:", error);
        return { error: "Login failed" };
    }
    revalidatePath('/dashboard');
    return { success: "Logged in successfully!" };
}

export async function addConversation(request: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to start a conversation." };
    }

    const conversation = {
        conversation_name: "New Conversation",
        word_count: request.split(" ").length,
        unfiltered_message_history: JSON.stringify([{ role: "user", content: request }]),
        user_id: user.id,
    };

    const { error } = await supabase.from('conversation').insert(conversation);
    if (error) {
        console.error("Supabase insert error:", error);
        return { error: "Failed to save conversation to the database." };
    }
    revalidatePath('/dashboard');
    return { success: "Successfully saved conversation." };
}
