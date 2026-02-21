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
exports.infoUser = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield user_model_1.default.findOne({ deleted: false, email: req.body.email });
    if (existEmail) {
        res.json({
            code: 400,
            message: "email da ton tai"
        });
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new user_model_1.default(req.body);
    yield user.save();
    res.json({
        code: 200,
        message: "thanh cong",
        token: user.token
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ deleted: false, email: req.body.email });
    if (!user) {
        res.json({
            code: 400,
            message: "email khong ton tai"
        });
        return;
    }
    if (user.password !== (0, md5_1.default)(req.body.password)) {
        res.json({
            code: 400,
            message: "sai mat khau"
        });
        return;
    }
    res.json({
        code: 200,
        message: "thanh cong",
        token: user.token
    });
});
exports.login = login;
const infoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        message: "thanh cong",
        data: req["user"]
    });
});
exports.infoUser = infoUser;
