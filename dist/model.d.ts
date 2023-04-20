declare class Model {
    constructor(modelName: any, dbName: any);
    createDatabase(): any;
    getDatabase(): any;
    initModel(): Promise<void>;
    destroy(): Promise<void | null>;
    add(data: any): Promise<any>;
    multiAdd(data: any): Promise<any>;
    update(data: any, filter: any): Promise<any[] | null>;
    updateById(data: any, id: any): Promise<any>;
    remove(filter: any): Promise<any[] | null>;
    removeById(id: any): Promise<any>;
    find(filter: any): Promise<any>;
    findById(id: any): Promise<any>;
    get(filter: any): Promise<any>;
}
export default Model;
