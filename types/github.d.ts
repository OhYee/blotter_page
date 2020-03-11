export declare interface GithubUser {
  login: string; // 'OhYee'
  id: number; // 13498329
  node_id: string; // 'MDQ6VXNlcjEzNDk4MzI5'
  avatar_url: string; // 'https://avatars1.githubusercontent.com/u/13498329?v=4'
  gravatar_id: string; // ''
  url: string; // 'https://api.github.com/users/OhYee'
  html_url: string; // 'https://github.com/OhYee'
  followers_url: string; // 'https://api.github.com/users/OhYee/followers'
  following_url: string; // 'https://api.github.com/users/OhYee/following{/other_user}'
  gists_url: string; // 'https://api.github.com/users/OhYee/gists{/gist_id}'
  starred_url: string; // 'https://api.github.com/users/OhYee/starred{/owner}{/repo}'
  subscriptions_url: string; // 'https://api.github.com/users/OhYee/subscriptions'
  organizations_url: string; // 'https://api.github.com/users/OhYee/orgs'
  repos_url: string; // 'https://api.github.com/users/OhYee/repos'
  events_url: string; // 'https://api.github.com/users/OhYee/events{/privacy}'
  received_events_url: string; // 'https://api.github.com/users/OhYee/received_events'
  type: string; // 'User'
  site_admin: boolean; // false
  name: string; // 'OhYee'
  company: string | null; // null
  blog: string; // 'https://www.oyohyee.com/'
  location: string; // 'China'
  email: string | null; // null
  hireable: string | null; // null
  bio: string | null; // null
  public_repos: number; // 52
  public_gists: number; // 6
  followers: number; // 58
  following: number; // 40
  created_at: string; // '2015-07-25T15:34:26Z'
  updated_at: string; // '2020-03-03T11:49:45Z'
}

export declare interface GithubRepo {
  id: number; // 123648570
  node_id: string; // 'MDEwOlJlcG9zaXRvcnkxMjM2NDg1NzA='
  name: string; // 'documentDownloader'
  full_name: string; // 'OhYee/documentDownloader'
  private: boolean; // false
  owner: {
    login: string; // 'OhYee'
    id: number; // 13498329
    node_id: string; // 'MDQ6VXNlcjEzNDk4MzI5'
    avatar_url: string; // 'https://avatars1.githubusercontent.com/u/13498329?v=4'
    gravatar_id: string; // ''
    url: string; // 'https://api.github.com/users/OhYee'
    html_url: string; // 'https://github.com/OhYee'
    followers_url: string; // 'https://api.github.com/users/OhYee/followers'
    following_url: string; // 'https://api.github.com/users/OhYee/following{/other_user}'
    gists_url: string; // 'https://api.github.com/users/OhYee/gists{/gist_id}'
    starred_url: string; // 'https://api.github.com/users/OhYee/starred{/owner}{/repo}'
    subscriptions_url: string; // 'https://api.github.com/users/OhYee/subscriptions'
    organizations_url: string; // 'https://api.github.com/users/OhYee/orgs'
    repos_url: string; // 'https://api.github.com/users/OhYee/repos'
    events_url: string; // 'https://api.github.com/users/OhYee/events{/privacy}'
    received_events_url: string; // 'https://api.github.com/users/OhYee/received_events'
    type: string; // 'User'
    site_admin: bool; // false
  };
  html_url: string; // 'https://github.com/OhYee/documentDownloader'
  description: string; // 'download document from book118 for free'
  fork: bool; // false
  url: string; // 'https://api.github.com/repos/OhYee/documentDownloader'
  forks_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/forks'
  keys_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/keys{/key_id}'
  collaborators_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/collaborators{/collaborator}'
  teams_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/teams'
  hooks_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/hooks'
  issue_events_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/issues/events{/number}'
  events_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/events'
  assignees_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/assignees{/user}'
  branches_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/branches{/branch}'
  tags_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/tags'
  blobs_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/git/blobs{/sha}'
  git_tags_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/git/tags{/sha}'
  git_refs_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/git/refs{/sha}'
  trees_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/git/trees{/sha}'
  statuses_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/statuses/{sha}'
  languages_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/languages'
  stargazers_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/stargazers'
  contributors_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/contributors'
  subscribers_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/subscribers'
  subscription_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/subscription'
  commits_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/commits{/sha}'
  git_commits_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/git/commits{/sha}'
  comments_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/comments{/number}'
  issue_comment_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/issues/comments{/number}'
  contents_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/contents/{+path}'
  compare_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/compare/{base}...{head}'
  merges_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/merges'
  archive_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/{archive_format}{/ref}'
  downloads_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/downloads'
  issues_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/issues{/number}'
  pulls_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/pulls{/number}'
  milestones_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/milestones{/number}'
  notifications_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/notifications{?since,all,participating}'
  labels_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/labels{/name}'
  releases_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/releases{/id}'
  deployments_url: string; // 'https://api.github.com/repos/OhYee/documentDownloader/deployments'
  created_at: string; // '2018-03-03T01:29:36Z'
  updated_at: string; // '2020-03-01T16:44:38Z'
  pushed_at: string; // '2020-01-16T11:54:09Z'
  git_url: string; // 'git://github.com/OhYee/documentDownloader.git'
  ssh_url: string; // 'git@github.com:OhYee/documentDownloader.git'
  clone_url: string; // 'https://github.com/OhYee/documentDownloader.git'
  svn_url: string; // 'https://github.com/OhYee/documentDownloader'
  homepage: string; // 'https://www.oyohyee.com/tag/documentdownloader'
  size: number; // 14
  stargazers_count: number; // 53
  watchers_count: number; // 53
  language: string; // 'Python'
  has_issues: boolean; // true
  has_projects: boolean; // true
  has_downloads: boolean; // true
  has_wiki: boolean; // true
  has_pages: boolean; // false
  forks_count: number; // 11
  mirror_url: string | null; // null
  archived: boolean; // false
  disabled: boolean; // false
  open_issues_count: number; // 0
  license: {
    key: string; // 'lgpl-3.0'
    name: string; // 'GNU Lesser General Public License v3.0'
    spdx_id: string; // 'LGPL-3.0'
    url: string; // 'https://api.github.com/licenses/lgpl-3.0'
    node_id: string; // 'MDc6TGljZW5zZTEy'
  };
  forks: number; // 11;
  open_issues: number; // 0;
  watchers: number; // 53;
  default_branch: string; // 'master';
  temp_clone_token: string | null; // null;
  network_count: number; // 11;
  subscribers_count: number; // 5;
}
