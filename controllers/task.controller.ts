import {Request, Response} from "express";
import Task from "../models/task.model";
export const index = async (req: Request,res: Response): Promise<void> => {
    interface Find {
        deleted: boolean;
        status?: string;
    }
    let find: Find = {
        deleted: false
    };

    const status = req.query.status as string;
    if(status){
        find.status = status;
    }
    const sort = {};
    const sortKey = req.query.sortKey as string;
    const sortValue = req.query.sortValue as string;
    if(sortKey && sortValue){
        sort[sortKey] = sortValue;
    }
    const tasks = await Task.find(find).sort(sort);
    res.json(tasks);
}
export const detail = async (req: Request, res: Response): Promise<void> => {
    const id: string | string[]= req.params.id;
    const task = await Task.findOne({_id: id, deleted: false});
    res.json(task);
}