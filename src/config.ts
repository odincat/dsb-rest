export class Config {
    username: string;
    password: string;
    isDemo: string;
    serverName: string;
    serverPort: number;
    refreshInterval: number;

    getConfig() {
        console.log('[CONFIG] Loading configuration from environment...');
        this.username = process.env.DSB_USERNAME ?? '';
        this.password = process.env.DSB_PASSWORD ?? '';
        this.isDemo = process.env.SERVER_IS_DEMO ?? 'true';
        this.serverName = process.env.SERVER_NAME ?? 'DSB-node',
        this.serverPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : undefined ?? 7071;
        this.refreshInterval = process.env.SERVER_REFRESH_INVERVAL ? Number(process.env.SERVER_REFRESH_INVERVAL) : undefined ?? 30;

        if(this.isDemo === 'false' && (this.username === '' && this.password === '')) {
            console.log('[CONFIG] You need to provide a valid username and password, if the demo is disabled.');
            process.exit(1);
        }
        console.log('[CONFIG] Successfully loaded configuration.');
    }
}
