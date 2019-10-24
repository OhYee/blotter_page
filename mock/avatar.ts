import { requestAsync } from './../src/utils/request';
import { Request, Response } from 'express';

export default {
  'GET /api/avatar': async (req: Request, res: Response) => {
    var email = req.query['email'];

    var data: any = await requestAsync('get', 'https://api.github.com/search/users', {
      q: `${email} in:email`,
    });
    var avatar = '';
    if (data['items'] && data['items'].length > 0) {
      avatar = data['items'][0]['avatar_url'];
    } else {
      avatar = `https://secure.gravatar.com/avatar/null`;
    }
    res.send(avatar);
    res.end();
  },
};
