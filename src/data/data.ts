import { SubstitutionColumns } from "./types";

export var substitutionMeta: string = '';
export const setSubstitutionMeta = (meta: string) => {
    substitutionMeta = meta;
};

export const substitutionDataCurrent: Array<SubstitutionColumns> = [];
export const substitutionDataUpcoming: Array<SubstitutionColumns> = [];

export var substitutionDateCurrent: string = '';
export const setSubstitutionDateCurrent = (date: string) => {
    substitutionDateCurrent = date;
}
export var substitutionDateUpcoming: string = '';
export const setSubstitutionDateUpcoming = (date: string) => {
    substitutionDateUpcoming = date;
}

export const substitutionHeaderCurrent: Array<string> = [];
export const substitutionHeaderUpcoming: Array<string> = [];