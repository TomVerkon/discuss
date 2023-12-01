'use server';
import * as auth from '@/auth';

// These functions are optional, but highly recommended
export async function signIn() {
  return auth.signIn('github');
}
