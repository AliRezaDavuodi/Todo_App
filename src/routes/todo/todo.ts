import { Router } from "express";
import fs from 'node:fs'
import { ITodo } from "../../interfaces/ITodo";
import { resolve } from "node:path";
import { sendSuccess } from "../../helper/sendSuccess";

export const todo: Router = Router()

const dataPath = resolve(`${__dirname}/muck_todo.json`)

const todos: { data: ITodo } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

todo.get('/', (_req, res) => {
    sendSuccess(res, todos.data)
})

todo.post('/', (_req, res) => {
    res.end('post method called')
})

todo.patch('/', (_req, res) => {
    res.end('post method called')
})

todo.delete('/', (_req, res) => {
    res.end('delete method called')
})
