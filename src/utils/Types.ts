export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};


export type ApiPostResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
}