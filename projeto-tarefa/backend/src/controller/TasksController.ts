// import { getRepository } from "typeorm";
import { Tasks } from '../entity/Tasks';
import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { FindOptionsWhere } from 'typeorm';

export const getTasks = async (request: Request, response: Response) => {
    const tasks = await AppDataSource.getRepository(Tasks).find()
    return response.json(tasks);
};


export const saveTask = async (request: Request, response: Response) => {
    const task = await AppDataSource.getRepository(Tasks).save(request.body)
    return response.json(task);
};


export const getTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(request.params.id, 10)}})
    return response.json(task);
};

export const updateTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, request.body)
    if (task.affected == 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json(taskUpdated);
    }
    else {
        return response.status(404).json({ message: "Tarefa não encontrada!" })
    }
};

export const deleteTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).delete(id)
    if (task.affected == 1) {
        return response.status(200).json({message:"Tarefa excluída com sucesso!"}
           )
        }
    else {
        return response.status(404).json({ message: "Tarefa não encontrada!" })
    }
};
export const finishedTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, {
        finished: true,
    })
    if (task.affected == 1) {
        const taskFinished = await AppDataSource.getRepository(Tasks).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json(taskFinished);
    }
    else {
        return response.status(404).json({ message: "Tarefa não encontrada!" })
    }
};


// import { AppDataSource } from '../data-source'
// import { NextFunction, Request, Response } from "express"
// import { User } from "../entity/Tasks"

// export class UserController {

//     private userRepository = AppDataSource.getRepository(User)

//     async all(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.find()
//     }

//     async one(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id)


//         const user = await this.userRepository.findOne({
//             where: { id }
//         })

//         if (!user) {
//             return "unregistered user"
//         }
//         return user
//     }

//     async save(request: Request, response: Response, next: NextFunction) {
//         const { firstName, lastName, age } = request.body;

//         const user = Object.assign(new User(), {
//             firstName,
//             lastName,
//             age
//         })

//         return this.userRepository.save(user)
//     }

//     async remove(request: Request, response: Response, next: NextFunction) {
//         const id = parseInt(request.params.id)

//         let userToRemove = await this.userRepository.findOneBy({ id })

//         if (!userToRemove) {
//             return "this user not exist"
//         }

//         await this.userRepository.remove(userToRemove)

//         return "user has been removed"
//     }

// }