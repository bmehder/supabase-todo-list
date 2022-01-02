import supabase from '$lib/db.js'
import { writable } from 'svelte/store'

export const user = writable(supabase.auth.user() || false)
