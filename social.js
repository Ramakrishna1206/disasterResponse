import express from 'express';

const router = express.Router();

export default (io) => {
  router.get('/:id/social-media', (req, res) => {
    const mockPosts = [
      { user: 'citizen1', post: '#floodrelief Need food in NYC' },
      { user: 'citizen2', post: '#earthquake Need help in LA' }
    ];
    io.emit('social_media_updated', mockPosts);
    res.json(mockPosts);
  });

  return router;
};