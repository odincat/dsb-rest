import * as restify from 'restify';
import { Server, RequestHandler } from 'restify';
import { Controllers } from './controllers/controllers';
import { HttpServer } from './httpServer';

type Method = 'get' | 'post' | 'put' | 'del';

export class ApiServer implements HttpServer {
    private restify: Server;

    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }

    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }

    public del(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    }

    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }

    private addRoute(method: Method, url: string, requestHandler: RequestHandler): void {
        this.restify[method](url, async (request: restify.Request, response: restify.Response, next: restify.Next) => {
            try {
                await requestHandler(request, response, next);
            } catch (error) {
                console.log(`[API] There was an error on server ${this.restify.name} that requires further investigation: ${error}`);
                response.send(500, error);
            }
        });
        console.log(`[API] Added route ${method.toUpperCase()} ${url}`);
    }

    private addControllers(): void {
        Controllers.forEach(controller => controller.initialize(this));
    }

    public startService(port: number = 7071, name: string = "DSB-node"): void {
        this.restify = restify.createServer({
            name: name
        });

        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());

        this.restify.use(
            function crossOrigin(req,res,next){
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With");
              return next();
            }
          );

        this.addControllers();

        this.restify.listen(port, () => {
            console.log(`[API] Server ${this.restify.name} is listening at ${this.restify.url}`);
        });
    }
}