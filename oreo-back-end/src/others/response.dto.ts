export interface TipMessageDTO {
    tipType?: TipType;
    message: string; // 弹窗内容
}

export enum TipType {
    SUCCESS = 1,
    WARING,
    DANGER,
    INFO
}
