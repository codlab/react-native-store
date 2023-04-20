'use strict';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Model from "./model";
import migrations from "./migrations";

class Store {

    private dbName: string;

    constructor(opts: any) {
        this.dbName = opts.dbName;
    }

    async _getCurrentVersion(versionKey: string) {
        var currentVersion: string|number|null = await AsyncStorage.getItem(versionKey);
        currentVersion = currentVersion || 0;
        return parseFloat(currentVersion as string);
    }

    async migrate() {
        var versionKey = `${this.dbName}_version`;
        var currentVersion = await this._getCurrentVersion(versionKey);
        var target = migrations.slice(-1)[0];
        if(currentVersion == target.version)
            return;
        for(let migration of migrations) {
            if(migration.version <= currentVersion)
                continue;
            migration.perform();
            await AsyncStorage.setItem(versionKey, migration.version.toString());
        }
    }

    model(modelName: string) {
        return new Model(modelName, this.dbName);
    }

    // clear store
    async clear() {
        await AsyncStorage.removeItem(this.dbName);
    }

}

export default Store;


// Store.model("user").get({ id:1 },{fite}).then().fail();
