//@ts-ignore 
import DSB from 'dsbapi';
import { appConfig } from '#src/app';

export var sourceUrl: string;

export const fetchUrl = async () => {
    const dsbInstance = new DSB(appConfig.username, appConfig.password);
    const data = await dsbInstance.fetch();

    const timetables = DSB.findMethodInData('timetable', data);
    sourceUrl = timetables.data[0].url;
    
    console.log(`[DATA] Fetched DSB URL (${sourceUrl})`);
};
