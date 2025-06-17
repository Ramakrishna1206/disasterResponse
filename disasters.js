import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default (io) => {
  router.post('/', async (req, res) => {
    const { title, location_name, description, tags, owner_id } = req.body;
    const { data, error } = await supabase.from('disasters').insert([{ title, location_name, description, tags, owner_id }]);
    if (error) return res.status(400).json({ error });
    io.emit('disaster_updated', data);
    res.json(data);
  });

  router.get('/', async (req, res) => {
    const tag = req.query.tag;
    const { data, error } = await supabase.from('disasters').select('*').contains('tags', [tag]);
    if (error) return res.status(400).json({ error });
    res.json(data);
  });

  return router;
};