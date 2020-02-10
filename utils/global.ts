export declare interface InitialPropsParam {
  pathname: string;
  query: { [param: string]: string };
  asPath: string;
  req?: Request;
  res?: Response;
}

export declare interface GlobalProps {
  //   pathname: string;
  //   query: string;
  //   asPath: string;
  blog_name: string;
  token: string;
}
