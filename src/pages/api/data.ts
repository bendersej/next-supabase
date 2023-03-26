import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../lib/supabase/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const { data } = await supabaseServerClient.from('data').select('*');

  res.status(200).json({ data });
}
