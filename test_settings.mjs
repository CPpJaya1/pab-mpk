import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://heigksrhoipcpdvfeple.supabase.co', 'sb_publishable_cPSy1lZ2gB82B2Czur5vfw_y_HBWY86');
supabase.from('settings').select('*').then(res => console.log(res));
