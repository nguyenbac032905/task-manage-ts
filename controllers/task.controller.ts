import {Request, Response} from "express";
import Task from "../models/task.model";
export const index = async (req: Request,res: Response): Promise<void> => {
    interface Find {
        deleted: boolean;
        status?: string;
        title? : RegExp
    };
    let find: Find = {
        deleted: false
    };

    const {status, sortKey, sortValue,page,limit,keyword} = req.query;
    if(typeof status === "string"){
        find.status = status;
    }

    const sort: Record<string, 1|-1> = {};
    if(typeof sortKey === "string" && (sortValue === "-1" || sortValue === "1")){
        sort[sortKey] = Number(sortValue) as 1|-1;
    }

    if(typeof keyword === "string"){
        find.title = new RegExp(keyword, "i");
    }
    
    interface Pagi{
        currentPage: number,
        limit: number,
        skip?: number,
        totalPage?: number
    };
    let initPagi:Pagi = {
        currentPage: 1,
        limit: 3
    };
    if(typeof page === "string" && typeof limit === "string"){
        const pageNum = Number(page);
        const limitNum = Number(limit);
        if(Number.isInteger(pageNum) && Number.isInteger(limitNum) && pageNum > 0 && limitNum > 0){
            initPagi.currentPage = pageNum;
            initPagi.limit = limitNum;
        }
    }
    initPagi.skip = (initPagi.currentPage - 1)*initPagi.limit;
    const countTasks = await Task.countDocuments(find);
    initPagi.totalPage = Math.ceil(countTasks/initPagi.limit);

    const tasks = await Task.find(find).sort(sort).limit(initPagi.limit).skip(initPagi.skip);
    res.json(tasks);
}
export const detail = async (req: Request, res: Response): Promise<void> => {
    const id: string | string[]= req.params.id;
    const task = await Task.findOne({_id: id, deleted: false});
    res.json(task);
}
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id as string;
        const status = req.body.status as string;

        await Task.updateOne({_id: id},{$set: {status: status}});
        res.json({
            code: 200,
            message: "thanh cong"
        });
    }catch(error){
        res.json({
            code: 400,
            message: "that bai"
        });
    }
}
export const changeMulti = async (req: Request, res: Response): Promise<void> => {
    const ids = req.body.ids as string[];
    const key = req.body.key as string;
    const value = req.body.value as string;
    console.log(key, value)
    enum ChangeKey {
        STATUS = "status",
        DELETE = "delete"
    }

    switch (key) {
        case ChangeKey.STATUS:
            await Task.updateMany({_id: {$in: ids}}, {$set: {status: value}});
            res.json({
                code: 200,
                message: "thanh cong"
            })
            break;
        case ChangeKey.DELETE:
            await Task.updateMany({_id: {$in: ids}}, {$set: {deleted: true, deletedAt: new Date()}});
            res.json({
                code: 200,
                message: "thanh cong"
            })
            break;
        default:
            res.json({
                code: 400,
                message: "that bai"
            })
            break;
    }
}
export const create = async (req: Request, res: Response): Promise<void> => {
    try{
        const task = new Task(req.body);
        await task.save();
        res.json({
            code: 200,
            message: "thanh cong"
        })
    }catch(error){
        res.json({
            code: 400,
            message: "that bai"
        })
    }
}
export const edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    await Task.updateOne({_id: id}, {$set: req.body});
    res.json({
        code: 200,
        message: "thanh cong"
    })
}
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id as string;
        await Task.updateOne({_id: id}, {$set: {deleted: true,deletedAt: new Date()}});
        res.json({
            code: 200,
            message: "thanh cong"
        })
    }catch(error){
        res.json({
            code: 400,
            message: "that bai"
        })
    }
}