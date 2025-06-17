import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { description } = req.body;
  const locationPrompt = `Extract location from: ${description}`;

  const geminiRes = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY, {
    contents: [{ parts: [{ text: locationPrompt }] }]
  });

  const locationName = geminiRes.data.candidates[0].content.parts[0].text;

  const geoRes = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${process.env.MAPBOX_API_KEY}`);

  const [lng, lat] = geoRes.data.features[0].center;
  res.json({ locationName, lat, lng });
});

export default router;