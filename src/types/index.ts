export interface CommonResponse<T = any> {
  ok: boolean;
  msg: string;
  data?: T;
  error?: string;
}
