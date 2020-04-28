export declare interface Queue {
  id: string;
  leader: Blotter.User;
  password: string;
  description: string;
  create_time: number;
  finish_time: number;
  max: number;
  queue: Member[];
}

export declare interface Member {
  id: string;
  queue: string;
  user: Blotter.User;
  in_time: number;
  land_time: number;
  out_time: number;
}
