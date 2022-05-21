import axios from 'axios';
import * as cheerio from 'cheerio';
import { setSubstitutionDateCurrent, setSubstitutionDateUpcoming, setSubstitutionMeta, substitutionDataCurrent, substitutionDataUpcoming, substitutionDateCurrent, substitutionDateUpcoming, substitutionHeaderCurrent, substitutionHeaderUpcoming, substitutionMeta } from './data';

import { sourceUrl } from './source';
import { SubstitutionColumns } from './types';

export var rawHtmlContent: string;

// cheerio instance
export var $: any;

export const fetchHtmlContent = async () => {
    const res = await axios.get(sourceUrl);
    rawHtmlContent = res.data;
};

const parseCurrentSubstitutionPlan = async () => {
    if(substitutionMeta !== '') {
        setSubstitutionMeta('');
    }
    if(substitutionDateCurrent !== '') {
        setSubstitutionDateCurrent('');
    }
    if(substitutionHeaderCurrent.length !== 0) {
        substitutionHeaderCurrent.length = 0;
    }
    if(substitutionDataCurrent.length !== 0) {
        substitutionDataCurrent.length = 0;
    }

    // last updated
    await setSubstitutionMeta($("body > table.mon_head:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > p:nth-child(1)").first().contents().eq(8).text());
    
    // substitution date
    setSubstitutionDateCurrent($("body > center:nth-child(2) > div.mon_title").text());

    // additional announcements
    // we get the first info table (0), which is always the upcoming :)
    $('center').find('table.info').eq(0).find('tbody > tr').each((index: number, element: HTMLElement) => {
        if(index === 0) return;

        const content = $(element).text();

        substitutionHeaderCurrent.push(content);
    });

    // substitution plan
    // we get the first ("mon_list" = substitution plan) table (0), which is the current :)
    $('center').find('table.mon_list').eq(0).find('tbody > tr').each((index: number, element: HTMLElement) => {
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
        
        const tableRow: SubstitutionColumns = { affectedClass, period, newSubject, originalSubject, newRoom, originalRoom, vtrVon, type, text };
        
        substitutionDataCurrent.push(tableRow);
    });
}

const parseUpcomingSubstitutionPlan = async () => {
    if(substitutionMeta !== '') {
       setSubstitutionMeta('')
    }
    if(substitutionDateUpcoming !== '') {
        setSubstitutionDateUpcoming('');
    }
    if(substitutionHeaderUpcoming.length !== 0) {
        substitutionHeaderUpcoming.length = 0;
    }
    if(substitutionDataUpcoming.length !== 0) {
        substitutionDataUpcoming.length = 0;
    }
    
    // last updated
    setSubstitutionMeta($("body > table.mon_head:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > p:nth-child(1)").first().contents().eq(8).text());
    
    // substitution date
    setSubstitutionDateUpcoming($("body > center:nth-child(6) > div.mon_title").text());

    // additional announcements
    // we get the second info table (1), which is always the upcoming :)
    $('center').find('table.info').eq(1).find('tbody > tr').each((index: number, element: HTMLElement) => {
        if(index === 0) return;

        const content = $(element).text();

        substitutionHeaderUpcoming.push(content);
    });

    // substitution plan
    // we get the second ("mon_list" = substitution plan) table (1), which is always the upcoming :)
    $('center').find('table.mon_list').eq(1).find('tbody > tr').each((index: number, element: HTMLElement) => {
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
        
        const tableRow: SubstitutionColumns = { affectedClass, period, newSubject, originalSubject, newRoom, originalRoom, vtrVon, type, text };
        
        substitutionDataUpcoming.push(tableRow);
    });
}

export const parseData = async () => {
    console.log("[DATA] Fetching data...")
    await fetchHtmlContent();
    
    $ = cheerio.load(rawHtmlContent);
    
    console.log("[DATA] Parsing current substitution plan...");
    await parseCurrentSubstitutionPlan();
    console.log("[DATA] Parsing upcoming substitution plan...");
    await parseUpcomingSubstitutionPlan();
    console.log("[DATA] Successfully fetched & parsed all data.")
}

