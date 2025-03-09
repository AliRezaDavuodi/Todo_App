import path from "node:path";
import { ITodo } from "../interfaces/ITodo";
import fs from 'node:fs'

const filePath = path.join(__dirname, '..', 'controllers', "todo", 'muck_todo.json')

export const FileRepository = {

    async readFile(): Promise<ITodo[]> {
        try {
            const data = await fs.promises.readFile(filePath, 'utf-8');

            if (!data.trim()) {
                await this.writeFile([]);
                return [];
            }

            return JSON.parse(data);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                await this.writeFile([]);
                return [];
            }

            if (error instanceof SyntaxError) {
                throw new Error('Invalid JSON format in todos file');
            }

            throw error;
        }
    },

    async writeFile(todos: ITodo[]): Promise<void> {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8');
        } catch (error) {
            throw error;
        }
    }
}