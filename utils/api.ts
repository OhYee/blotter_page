import { request } from '@/utils/request';
import { GithubUser, GithubRepo } from '@/types/github';

export declare type RequestCallback<T> = (data: T) => void;
type PostCardWithTotal = {
  total: number;
  posts: Blotter.PostCard[];
};

export const posts = async (
  params: {
    number?: number;
    offset?: number;
    tag?: string;
    sort_field?: string;
    sort_type?: -1 | 1;
    search?: string;
    search_fields?: string;
    with_tags?: string;
    without_tags?: string;
  },
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await request('get', '/api/posts', params, callback);
};

export const indexPosts = async (
  search: string,
  search_fields: string[],
  page: number,
  size: number,
  with_tags: Blotter.Tag[],
  without_tags: Blotter.Tag[],
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await posts(
    {
      search,
      search_fields: search_fields.join(','),
      offset: (page - 1) * size,
      number: size,
      with_tags: with_tags.map((item) => item.id).join(','),
      without_tags: without_tags.map((item) => item.id).join(','),
    },
    callback,
  );
};

export const archives = async (
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal>,
) => {
  return await posts({ offset: (page - 1) * size, number: size }, callback);
};

export const tagPosts = async (
  tag: string,
  page: number,
  size: number,
  callback?: RequestCallback<PostCardWithTotal & { tag: Blotter.Tag }>,
) => {
  return request('get', '/api/tag', { tag, offset: (page - 1) * size, number: size }, callback);
};

export const adminPosts = async (
  search: string,
  search_fields: string[],
  page: number,
  size: number,
  field: string,
  up: boolean,
  with_tags: Blotter.Tag[],
  without_tags: Blotter.Tag[],
  callback?: RequestCallback<{
    total: number;
    posts: (Blotter.PostCard & { id: string; published: boolean })[];
  }>,
) => {
  return await request(
    'get',
    '/api/admin/posts',
    {
      offset: (page - 1) * size,
      number: size,
      sort_field: field,
      sort_type: up ? 1 : -1,
      search: search,
      search_fields: search_fields.join(','),
      with_tags: with_tags.map((item) => item.id).join(','),
      without_tags: without_tags.map((item) => item.id).join(','),
    },
    callback,
  );
};

export const friends = async (callback?: RequestCallback<Blotter.Friend[]>) => {
  return await request('get', '/api/friends', {}, callback);
};

export const layout = async (
  callback?: RequestCallback<{
    menus: Blotter.Menu[];
    view: number;
    beian: string;
    blog_name: string;
    qq: string;
    email: string;
    github: string;
    friends: Blotter.FriendSimple[];
  }>,
) => {
  return await request('get', '/api/layout', {}, callback);
};

export const tags = async (
  callback?: RequestCallback<{ total: number; tags: Blotter.TagWithCount[] }>,
) => {
  return await request('get', '/api/tags', {}, callback);
};

export const post = async (url: string, callback?: RequestCallback<Blotter.Post>) => {
  return await request('get', '/api/post', { url }, callback);
};

export const adminPost = async (url: string, callback?: RequestCallback<Blotter.PostAll>) => {
  return await request('get', '/api/admin/post', { url }, callback);
};

export const comments = async (
  url: string,
  callback?: RequestCallback<{ total: number; comments: Blotter.Comment[] }>,
) => {
  return await request('get', '/api/comments', { url }, callback);
};

export const avatar = async (email: string, callback?: RequestCallback<{ avatar: string }>) => {
  return await request('get', '/api/avatar', { email }, callback);
};

export declare type AddCommentArgs = {
  url: string;
  reply: string;
  email: string;
  recv: boolean;
  raw: string;
};

export const addComment = async (
  args: AddCommentArgs,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', '/api/comment/add', args, callback);
};

export const markdown = async (source: string, callback?: RequestCallback<{ html: string }>) => {
  return await request('post', '/api/markdown', { source }, callback);
};

export const tagsSearch = async (
  keyword: string,
  callback?: RequestCallback<{ total: number; tags: Blotter.Tag[] }>,
) => {
  return await request('get', '/api/tags', { keyword, number: 10, offset: 0 }, callback);
};

export const login = async (
  username: string,
  password: string,
  callback?: RequestCallback<Blotter.APIResponse & { user: Blotter.User }>,
) => {
  return await request('get', '/api/login', { username, password }, callback);
};

export const logout = async (callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', '/api/logout', {}, callback);
};

export const info = async (username?: string, callback?: RequestCallback<Blotter.User>) => {
  return await request('get', '/api/info', { username }, callback);
};

export const postExist = async (url: string, callback?: RequestCallback<{ existed: boolean }>) => {
  return await request('get', '/api/post/existed', { url }, callback);
};

export const postEdit = async (
  args: Blotter.PostAll,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('post', '/api/admin/post/edit', args, callback);
};

export const postDelete = async (id: string, callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', '/api/admin/post/delete', { id }, callback);
};

export const adminTags = async (
  keyword: string,
  page: number,
  number: number,
  sort_field: string,
  sort_inc: boolean,
  callback?: RequestCallback<{ total: number; tags: Blotter.TagWithCount[] }>,
) => {
  return await request(
    'get',
    '/api/tags',
    { keyword, number: number, offset: (page - 1) * number, sort_field, sort_inc },
    callback,
  );
};

export const tagEdit = async (
  id: string,
  name: string,
  short: string,
  color: string,
  icon: string,
  description: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request(
    'get',
    '/api/admin/tag/edit',
    { id, name, short, color, icon, description },
    callback,
  );
};

export const tagDelete = async (id: string, callback?: RequestCallback<Blotter.APIResponse>) => {
  return await request('get', '/api/admin/tag/delete', { id }, callback);
};

export const tagExisted = async (
  id: string,
  short: string,
  callback?: RequestCallback<{ existed: boolean }>,
) => {
  return await request('get', '/api/tag/existed', { id, short }, callback);
};

export const friendsSet = async (
  friends: Blotter.Friend[],
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('post', '/api/admin/friends/set', { friends }, callback);
};

export const view = async (url?: string, callback?: RequestCallback<void>) => {
  return await request('get', '/api/view', { url }, callback);
};

export const menus = async (callback?: RequestCallback<Blotter.Menu[]>) => {
  return await request('get', '/api/menus', {}, callback);
};

export const menusSet = async (
  menus: Blotter.Menu[],
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('post', '/api/admin/menus/set', { menus }, callback);
};

export const githubUser = async (username: string, callback?: RequestCallback<GithubUser>) => {
  return await request('get', `https://api.github.com/users/${username}`, {}, callback);
};

export const githubRepos = async (
  username: string,
  callback?: RequestCallback<{ repos: GithubRepo[] }>,
) => {
  return await request('get', `/api/github/repos`, { username }, callback);
};

export const githubRepo = async (
  username: string,
  repo: string,
  callback?: RequestCallback<GithubRepo>,
) => {
  return await request('get', `https://api.github.com/repos/${username}/${repo}`, {}, callback);
};

export const about = async (
  callback?: RequestCallback<{
    qq: string;
    github: string;
    email: string;
    zhihu: string;
    author: string;
    quote: string;
    description: string;
    edu: { name: string; major: string; time: string }[];
    awards: { name: string; level: string; count: number }[];
  }>,
) => {
  return await request('get', `/api/about`, {}, callback);
};

export const variables = async (callback?: RequestCallback<Blotter.Variable[]>) => {
  return await request('get', `/api/admin/variables`, {}, callback);
};

export const variablesSet = async (
  data: Blotter.Variable[],
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('post', `/api/admin/variables/set`, { data }, callback);
};

export const commentsAdmin = async (
  page: number,
  size: number,
  callback?: RequestCallback<{
    total: number;
    comments: (Blotter.Comment & {
      reply_comment: Blotter.Comment;
      title: string;
      url: string;
    })[];
  }>,
) => {
  return await request(
    'get',
    `/api/admin/comments`,
    { number: size, offset: (page - 1) * size },
    callback,
  );
};

export const commentSet = async (
  id: string,
  ad: boolean,
  recv: boolean,
  show: boolean,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', `/api/admin/comment/set`, { id, ad, recv, show }, callback);
};

export const userSet = async (
  username: string,
  email: string,
  avatar: string,
  ns_id: string,
  ns_name: string,
  ac_name: string,
  ac_island: string,
  qq: string,
  password: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request(
    'get',
    `/api/user/set`,
    { username, email, avatar, ns_id, ns_name, ac_name, ac_island, qq, password },
    callback,
  );
};

export const checkUsername = async (
  username: string,
  callback?: RequestCallback<{ existed: boolean }>,
) => {
  return await request('get', `/api/user/username`, { username }, callback);
};

export const register = async (
  username: string,
  password: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', `/api/user/register`, { username, password }, callback);
};

export const users = async (
  page: number,
  size: number,
  search?: string,
  sort_field?: string,
  sort_type?: number,
  callback?: RequestCallback<{ total: number; users: Blotter.User[] }>,
) => {
  return await request(
    'get',
    '/api/users',
    {
      offset: (page - 1) * size,
      number: size,
      search,
      sort_type,
      sort_field,
    },
    callback,
  );
};

export const reset_password = async (
  id: string,
  callback?: RequestCallback<{ password: string }>,
) => {
  return await request('get', '/api/admin/user/reset_password', { id }, callback);
};

export const travels_get = async (
  callback?: RequestCallback<{ total: number; travels: Blotter.City[] }>,
) => {
  return await request('get', '/api/travels', {}, callback);
};

export const travels_set = async (
  travels: Blotter.City[],
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('post', '/api/travels/set', { travels }, callback);
};

export const travels_get_url = async (
  url: string,
  callback?: RequestCallback<{ exist: boolean; travel: Blotter.Travel }>,
) => {
  return await request('get', '/api/travels/url', { url }, callback);
};

export const qiniu_get_buckets = async (
  callback?: RequestCallback<{ buckets: string[]; prefix: string[] }>,
) => {
  return await request('get', '/api/qiniu/buckets', {}, callback);
};

export const qiniu_get_images = async (
  bucket: string,
  prefix: string,
  marker: string,
  number: number,
  callback?: RequestCallback<{
    files: Blotter.File[];
    marker: string;
    has_next: boolean;
  }>,
) => {
  return await request('get', '/api/qiniu/images', { bucket, prefix, marker, number }, callback);
};

export const qiniu_get_token = async (callback?: RequestCallback<{ token: string }>) => {
  return await request('get', '/api/qiniu/token', {}, callback);
};

export const qiniu_delete_image = async (
  bucket: string,
  key: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', '/api/qiniu/image/delete', { bucket, key }, callback);
};

export const qiniu_rename_image = async (
  bucket: string,
  key: string,
  new_key: string,
  callback?: RequestCallback<Blotter.APIResponse>,
) => {
  return await request('get', '/api/qiniu/image/rename', { bucket, key, new_key }, callback);
};
