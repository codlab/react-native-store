'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import Util from "./util";
import Filter from "./filter";
var Model = /** @class */ (function () {
    function Model(modelName, dbName) {
        this.dbName = dbName;
        this.modelName = modelName;
        this.offset = 0;
        this.limit = 10;
        this.modelFilter = new Filter();
    }
    Model.prototype.createDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.setItem(this.dbName, JSON.stringify({}))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getDatabase()];
                }
            });
        });
    };
    Model.prototype.getDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.getItem(this.dbName)];
                    case 1:
                        database = _a.sent();
                        if (database) {
                            return [2 /*return*/, Object.assign({}, JSON.parse(database))];
                        }
                        else {
                            return [2 /*return*/, this.createDatabase()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.initModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        _a.database = _b.sent();
                        this.model = this.database[this.modelName]
                            ? this.database[this.modelName]
                            : {
                                'totalrows': 0,
                                'autoinc': 1,
                                'rows': {}
                            };
                        this.database[this.modelName] = this.database[this.modelName] || this.model;
                        return [2 /*return*/];
                }
            });
        });
    };
    //destroy
    Model.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.getItem(this.dbName)];
                    case 1:
                        database = _b.sent();
                        if (!database) return [3 /*break*/, 3];
                        return [4 /*yield*/, AsyncStorage.removeItem(this.dbName)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = null;
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    // add
    Model.prototype.add = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var autoinc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initModel()];
                    case 1:
                        _a.sent();
                        autoinc = this.model.autoinc++;
                        if (this.model.rows[autoinc]) {
                            return [2 /*return*/, Util.error("ReactNativeStore error: Storage already contains _id '" + autoinc + "'")];
                        }
                        if (data._id) {
                            return [2 /*return*/, Util.error("ReactNativeStore error: Don't need _id with add method")];
                        }
                        data._id = autoinc;
                        this.model.rows[autoinc] = data;
                        this.model.totalrows++;
                        this.database[this.modelName] = this.model;
                        return [4 /*yield*/, AsyncStorage.setItem(this.dbName, JSON.stringify(this.database))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.model.rows[data._id]];
                }
            });
        });
    };
    // multi add
    Model.prototype.multiAdd = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var key, value, autoinc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initModel()];
                    case 1:
                        _a.sent();
                        for (key in data) {
                            value = data[key];
                            autoinc = this.model.autoinc++;
                            if (this.model.rows[autoinc]) {
                                return [2 /*return*/, Util.error("ReactNativeStore error: Storage already contains _id '" + autoinc + "'")];
                            }
                            if (value._id) {
                                return [2 /*return*/, Util.error("ReactNativeStore error: Don't need _id with add method")];
                            }
                            value._id = autoinc;
                            this.model.rows[autoinc] = value;
                            this.model.totalrows++;
                        }
                        this.database[this.modelName] = this.model;
                        return [4 /*yield*/, AsyncStorage.setItem(this.dbName, JSON.stringify(this.database))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.model.rows];
                }
            });
        });
    };
    // update
    Model.prototype.update = function (data, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var results, rows, filterResult, _a, _b, _i, row, _c, _d, _e, element, i;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.initModel()];
                    case 1:
                        _f.sent();
                        filter = filter || {};
                        if (data._id)
                            delete data._id;
                        results = [];
                        rows = this.model["rows"];
                        filterResult = this.modelFilter.apply(rows, filter);
                        _a = [];
                        for (_b in rows)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        row = _a[_i];
                        _c = [];
                        for (_d in filterResult)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 3;
                    case 3:
                        if (!(_e < _c.length)) return [3 /*break*/, 6];
                        element = _c[_e];
                        if (!(rows[row]['_id'] === filterResult[element]['_id'])) return [3 /*break*/, 5];
                        for (i in data) {
                            rows[row][i] = data[i];
                        }
                        results.push(rows[row]);
                        this.database[this.modelName] = this.model;
                        return [4 /*yield*/, AsyncStorage.setItem(this.dbName, JSON.stringify(this.database))];
                    case 4:
                        _f.sent();
                        _f.label = 5;
                    case 5:
                        _e++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, results.length ? results : null];
                }
            });
        });
    };
    // remove a single entry by id
    Model.prototype.updateById = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.update(data, {
                            where: {
                                _id: id
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? result[0] : null];
                }
            });
        });
    };
    // remove
    Model.prototype.remove = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var results, rowsToDelete, rows, filterResult, row, element, i, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initModel()];
                    case 1:
                        _a.sent();
                        filter = filter || {};
                        results = [];
                        rowsToDelete = [];
                        rows = this.model["rows"];
                        filterResult = this.modelFilter.apply(rows, filter);
                        for (row in rows) {
                            for (element in filterResult) {
                                if (rows[row]['_id'] === filterResult[element]['_id'])
                                    rowsToDelete.push(row);
                            }
                        }
                        for (i in rowsToDelete) {
                            row = rowsToDelete[i];
                            results.push(this.model["rows"][row]);
                            delete this.model["rows"][row];
                            this.model["totalrows"]--;
                        }
                        this.database[this.modelName] = this.model;
                        return [4 /*yield*/, AsyncStorage.setItem(this.dbName, JSON.stringify(this.database))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, results.length ? results : null];
                }
            });
        });
    };
    // remove a single entry by id
    Model.prototype.removeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.remove({
                            where: {
                                _id: id
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? result[0] : null];
                }
            });
        });
    };
    // find
    Model.prototype.find = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var results, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initModel()];
                    case 1:
                        _a.sent();
                        filter = filter || {};
                        results = [];
                        rows = this.model["rows"];
                        results = this.modelFilter.apply(rows, filter);
                        return [2 /*return*/, results.length ? results : null];
                }
            });
        });
    };
    // find a single entry by id
    Model.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find({
                            where: {
                                _id: id
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? result[0] : null];
                }
            });
        });
    };
    // get
    Model.prototype.get = function (filter) {
        filter = filter || {};
        filter.limit = 1;
        return this.find(filter);
    };
    return Model;
}());
export default Model;
//# sourceMappingURL=model.js.map