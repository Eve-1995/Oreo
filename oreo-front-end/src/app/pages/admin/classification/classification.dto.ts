export class Classification {
    id?: number;
    name?: string;
    createTime?: Date;
    updateTime?: Date;
    keywords?: string;
}

export interface CreateClassification {
    id?: number;
    name: string;
    keywords?: string;
}
