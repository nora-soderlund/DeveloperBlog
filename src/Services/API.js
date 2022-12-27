export default class API {
    static host = process.env.REACT_APP_API ?? "";

    static async fetchAsync(route, options) {
        const response = await fetch(`${this.host}${route}`, options);
        const result = await response.json();

        return result;
    };

    static async getAsync(route, options) {
        return await this.fetchAsync(route, { ...options, method: "GET" });
    };
};
