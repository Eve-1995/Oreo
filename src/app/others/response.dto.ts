/**
 * 响应DTO
 * code   describe
 * 200    成功
 * 500    服务端错误
 */
export interface ResponseDTO {
  code: 200 | 500;
  message: string;
}
