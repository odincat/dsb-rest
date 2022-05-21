import 'dotenv/config'

import { ApiServer } from "#api/server";
import { parseData } from "./data/parse";
import { fetchUrl } from "./data/source";
import { Config } from './config';

export const appConfig = new Config();
appConfig.getConfig();

const refreshData = async () => {
    console.log("[DATA] Refreshing data...");
    await fetchUrl();
    await parseData();
    console.log("[DATA] Data has been refreshed successfully.");
}
const refreshInterval = setInterval(refreshData, appConfig.refreshInterval * 60 * 1000);

await fetchUrl();
await parseData();

const server = new ApiServer();

server.startService(appConfig.serverPort, appConfig.serverName);