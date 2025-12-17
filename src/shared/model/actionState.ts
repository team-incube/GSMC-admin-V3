export type ActionState<T> = {
  status: 'idle' | 'success' | 'error';
  message: string | null;
  fieldErrors: { [K in keyof T]?: string[] } | null;
  data: T | null;
};
