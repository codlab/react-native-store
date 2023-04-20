import Model from "./model";
declare class Store {
    private dbName;
    constructor(opts: any);
    _getCurrentVersion(versionKey: string): Promise<number>;
    migrate(): Promise<void>;
    model(modelName: string): Model;
    clear(): Promise<void>;
}
export default Store;
