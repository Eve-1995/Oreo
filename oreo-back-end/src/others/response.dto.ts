/**
 * 响应DTO
 * code   describe
 * 200    成功
 * 201    成功(区分同一个功能的不同操作,如收藏与取消收藏)
 * 500    服务端错误
 * 404    资源不存在
 * 666    请求不合法
 */
export interface ResponseDTO {
    code: 200 | 201 | 404 | 500 | 666;
    message: string;
    data: any;
}
