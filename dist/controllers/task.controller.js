"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ;
    let find = {
        deleted: false
    };
    const { status, sortKey, sortValue, page, limit, keyword } = req.query;
    if (typeof status === "string") {
        find.status = status;
    }
    const sort = {};
    if (typeof sortKey === "string" && (sortValue === "-1" || sortValue === "1")) {
        sort[sortKey] = Number(sortValue);
    }
    if (typeof keyword === "string") {
        find.title = new RegExp(keyword, "i");
    }
    ;
    let initPagi = {
        currentPage: 1,
        limit: 3
    };
    if (typeof page === "string" && typeof limit === "string") {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        if (Number.isInteger(pageNum) && Number.isInteger(limitNum) && pageNum > 0 && limitNum > 0) {
            initPagi.currentPage = pageNum;
            initPagi.limit = limitNum;
        }
    }
    initPagi.skip = (initPagi.currentPage - 1) * initPagi.limit;
    const countTasks = yield task_model_1.default.countDocuments(find);
    initPagi.totalPage = Math.ceil(countTasks / initPagi.limit);
    const tasks = yield task_model_1.default.find(find).sort(sort).limit(initPagi.limit).skip(initPagi.skip);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_model_1.default.findOne({ _id: id, deleted: false });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({ _id: id }, { $set: { status: status } });
        res.json({
            code: 200,
            message: "thanh cong"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "that bai"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const key = req.body.key;
    const value = req.body.value;
    console.log(key, value);
    let ChangeKey;
    (function (ChangeKey) {
        ChangeKey["STATUS"] = "status";
        ChangeKey["DELETE"] = "delete";
    })(ChangeKey || (ChangeKey = {}));
    switch (key) {
        case ChangeKey.STATUS:
            yield task_model_1.default.updateMany({ _id: { $in: ids } }, { $set: { status: value } });
            res.json({
                code: 200,
                message: "thanh cong"
            });
            break;
        case ChangeKey.DELETE:
            yield task_model_1.default.updateMany({ _id: { $in: ids } }, { $set: { deleted: true, deletedAt: new Date() } });
            res.json({
                code: 200,
                message: "thanh cong"
            });
            break;
        default:
            res.json({
                code: 400,
                message: "that bai"
            });
            break;
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        yield task.save();
        res.json({
            code: 200,
            message: "thanh cong"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "that bai"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield task_model_1.default.updateOne({ _id: id }, { $set: req.body });
    res.json({
        code: 200,
        message: "thanh cong"
    });
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, { $set: { deleted: true, deletedAt: new Date() } });
        res.json({
            code: 200,
            message: "thanh cong"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "that bai"
        });
    }
});
exports.deleteTask = deleteTask;
