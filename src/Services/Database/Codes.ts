import Database from "../Database";

import { Code } from "../../Types";

export default class Codes {
    static async getCodeById(id: number): Promise<Code | null> {
        const connection = await Database.ensureConnectionAsync();
        
        const { error, row } = await Database.querySingleAsync(`SELECT id, language, code FROM codes WHERE id = ${connection.escape(id)}`);
        
        connection.destroy();

        if(error) {
            console.error(`Fatally failed to get code by id: ${id} (code: ${error.code})`);

            return null;
        }

        if(!row) {
            console.warn(`Failed to find code by id: ${id}`);

            return null;
        }

        return row as Code;
    };
};
