import Database from "../database";

export type Code = {
    id: number,
    language: string,
    code: string
};

export default class Codes {
    static async getCodeById(id: number): Promise<Code | null> {
        const { error, row } = await Database.querySingleAsync(`SELECT id, language, code FROM codes WHERE id = ${Database.escape(id)}`);
        
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
