import { HttpServer } from "../httpServer";

export interface Controller {
    initialize(httpServer: HttpServer): void;
}