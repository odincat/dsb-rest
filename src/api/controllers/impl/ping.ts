import { HttpServer } from "#api/httpServer";
import { Controller } from "../controller";

export class PingController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/ping', (request, response) => {
            response.send(200, 'Hello world!');
        });
    }
}