// $lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	'URL',
	'ANON KEY'
)