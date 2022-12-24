import http from "http";
import { URL } from "url";

export default class Server {
    static #routes = [];
    static #server = http.createServer((request, response) => this.#onRequest(request, response));

    static async #onRequest(request, response) {
        try {
            request.server = {};

            request.server.url = new URL(request.url, `http://${request.headers.host}`);

            console.log(request.server.url.pathname);

            const route = this.#routes.find((route) => route.method == request.method && route.path == request.server.url.pathname);

            if(!route) {
                response.writeHead(404, "File Not Found");

                return response.end();
            }

            response.writeHead(200, "OK");

            const result = await route.onRequest(request, response);

            response.write(JSON.stringify(result));

            return response.end();
        }
        catch(error) {
            console.error(error);

            response.writeHead(400, "Internal Server Error");
            response.end();
        }
    };

    static register(method, path, onRequest) {
        this.#routes.push({ method, path, onRequest });
    };

    static listen(port) {
        this.#server.listen(port);
    };
};
