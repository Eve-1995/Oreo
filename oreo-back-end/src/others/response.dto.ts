/**
 * 响应DTO
 * code   describe
 * 200    成功
 * 500    服务端错误
 * 404    资源不存在
 * 666    请求不合法
 */
export class ResponseDTO {
    code: 200 | 201 | 404 | 500 | 666;
    message: string;
    data: any;

    constructor() {
        this.code = 200;
    }
}

export interface TipMessageDTO {
    tipType: number;
    message: string;
}