import { Controller } from "../controller";
import { substitutionDateCurrent, substitutionDateUpcoming, substitutionHeaderCurrent, substitutionHeaderUpcoming, substitutionMeta } from "#data/data";
import { HttpServer } from "#api/httpServer";


export class InfoController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/info', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "current": {
                    "date": substitutionDateCurrent,
                    "content": substitutionHeaderCurrent
                },
                "upcoming": {
                    "data": substitutionDateUpcoming,
                    "content": substitutionHeaderUpcoming
                }
            });
        });

        httpServer.get('/info/current', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateCurrent,
                "content": substitutionHeaderCurrent
            });
        });

        httpServer.get('/info/upcoming', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateUpcoming,
                "content": substitutionHeaderUpcoming
            });
        });
    }
}