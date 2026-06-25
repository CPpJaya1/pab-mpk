import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://heigksrhoipcpdvfeple.supabase.co';
const supabaseKey = 'sb_publishable_cPSy1lZ2gB82B2Czur5vfw_y_HBWY86';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('pendaftar_mpk')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data fetched successfully!');
    if (data.length > 0) {
      console.log('Columns:', Object.keys(data[0]));
    } else {
      console.log('Table is empty. Cannot determine column names automatically.');
    }
  }
}

test();
