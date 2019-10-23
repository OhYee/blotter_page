import { Request, Response } from 'express';

const comments: { [key: string]: Blotter.Comment[] } = {
  '/post/wsl2_systemd': [
    {
      id: 1,
      email: 'oyohyee@oyohyee.com',
      avatar: 'https://secure.gravatar.com/avatar/d57072b4a47209833738ecda534634da',
      date: '2018-01-11 15:32:12',
      content: '第一条回复',
      children: [
        {
          id: 2,
          email: 'oyohyee@oyohyee.com',
          avatar: 'https://secure.gravatar.com/avatar/d57072b4a47209833738ecda534634da',
          date: '2019-01-11 15:32:12',
          content: '回复回复',
          children: [
            {
              id: 3,
              email: 'oyohyee@oyohyee.com',
              avatar: 'https://secure.gravatar.com/avatar/d57072b4a47209833738ecda534634da',
              date: '2019-09-11 15:32:12',
              content: '???',
              children: [],
            },
          ],
        },
        {
          id: 4,
          email: 'oyohyee@oyohyee.com',
          avatar: 'https://secure.gravatar.com/avatar/d57072b4a47209833738ecda534634da',
          date: '2019-05-11 15:32:12',
          content: '回复回复',
          children: [],
        },
      ],
    },
    {
      id: 5,
      email: 'oyohyee@oyohyee.com',
      avatar: 'https://secure.gravatar.com/avatar/d57072b4a47209833738ecda534634da',
      date: '2018-01-11 15:32:12',
      content: '第二条回复',
      children: [],
    },
  ],
};

export default {
  'GET /api/comment': (req: Request, res: Response) => {
    var url = req.query['url'];
    var comment = comments[url];
    if (comment) {
      res.send(comment);
    } else {
      res.status(404);
    }
    res.end();
  },
};
