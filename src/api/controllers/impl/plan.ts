import { HttpServer } from "#api/httpServer";
import { substitutionDataCurrent, substitutionDataUpcoming, substitutionDateCurrent, substitutionDateUpcoming, substitutionMeta } from "#data/data";
import { Controller } from "../controller";

export class PlanController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get('/plan', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "content": {
                    "current": {
                        "date": substitutionDateCurrent,
                        "content": substitutionDataCurrent
                    },
                    "upcoming": {
                        "date": substitutionDateUpcoming,
                        "content": substitutionDataUpcoming
                    }
                }
            });
        });

        // Current plan
        httpServer.get('/plan/current', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateCurrent,
                "content": substitutionDataCurrent
            });
        });
        httpServer.get('/plan/:class/current', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateCurrent,
                "content": substitutionDataCurrent.filter(object => {
                    return object.affectedClass.toLowerCase().includes(request.params.class.toLowerCase());
                })
            });
        });

        // Upcoming plan
        httpServer.get('/plan/upcoming', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateUpcoming,
                "content": substitutionDataUpcoming
            });
        });
        httpServer.get('/plan/:class/upcoming', (request, response) => {
            response.send(200, {
                "meta": substitutionMeta,
                "date": substitutionDateUpcoming,
                "content": substitutionDataUpcoming.filter(object => {
                    return object.affectedClass.toLocaleLowerCase().includes(request.params.class.toLowerCase());
                })
            });
        });
    }
}