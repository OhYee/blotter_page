declare module '@/utils/prerender' {
  export var setSiteName: (siteName: string) => void;
  export var setTitle: (title: string) => void;
  export var getTitle: () => string;
  export var isBroswer: () => boolean;
}
