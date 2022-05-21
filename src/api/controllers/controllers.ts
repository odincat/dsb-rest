import { InfoController } from "./impl/info";
import { PingController } from "./impl/ping";
import { PlanController } from "./impl/plan";

export const Controllers = [
    new PingController(),
    new InfoController(),
    new PlanController()
];