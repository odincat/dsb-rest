import DSB from "dsbapi";
import axios from "axios";
import * as cheerio from 'cheerio';

const dsbInstance = new DSB('213061', 'dsbgak');

var tableUrl;
var rawHtmlContent;
const scrapedData = [];
var $;


const fetchUrl = async () => {
    const data = await dsbInstance.fetch();
    const timetables = DSB.findMethodInData('timetable', data);
    tableUrl = timetables.data[0].url;
};

const fetchHtmlContent = async () => {
    const res = await axios.get(tableUrl);
    rawHtmlContent = res.data;
};

const parseHtmlContent = async () => {
    // parsedHtmlContent = new JSDOM(rawHtmlContent);
    $ = cheerio.load(rawHtmlContent);
    
    if(scrapedData.length !== 0) {
        scrapedData.length = 0;
    }

    $("body > center:nth-child(2) > p:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr").each((index, element) => {
        if(index === 0) return;
        const tds = $(element).find("td");
        
        const affectedClass = $(tds[0]).text();
        const period = $(tds[1]).text();
        const newSubject = $(tds[2]).text();
        const originalSubject = $(tds[3]).text();
        const newRoom = $(tds[4]).text();
        const originalRoom = $(tds[5]).text();
        const vtrVon = $(tds[6]).text();
        const type = $(tds[7]).text();
        const text = $(tds[8]).text();
        
        const tableRow = { affectedClass, period, newSubject, originalSubject, newRoom, originalRoom, vtrVon, type, text };
        
        scrapedData.push(tableRow);
    });
}

await fetchUrl();
await fetchHtmlContent();
await parseHtmlContent();

console.log(scrapedData)
console.log(tableUrl)