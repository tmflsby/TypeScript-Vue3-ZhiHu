export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export type MessageType = 'success' | 'error' | 'default'

export interface RuleProps {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  fitUrl?: string;
  createdAt?: string;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  description?: string;
  avatar?: ImageProps;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string | ImageProps;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface ListProps<P> {
  [id: string]: P;
}

export interface LoadedPostProps {
  columnId?: string;
  currentPage?: number;
  total?: number;
}

export interface GlobalDataProps {
  columns: {
    data: ListProps<ColumnProps>;
    currentPage: number;
    total: number;
  };
  posts: {
    data: ListProps<PostProps>;
    loadedColumns: ListProps<LoadedPostProps>;
  };
  user: UserProps;
  loading: boolean;
  token: string;
  error: GlobalErrorProps;
}
