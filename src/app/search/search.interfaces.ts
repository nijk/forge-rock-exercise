/**
 * Created by nijk on 11/03/2016.
 */

import { SearchFilterFieldNames, SearchFilterOperators } from './search.enums.ts';

export interface SearchFilterFields {
    contactInformation?: {
        emailAddress: string,
        telephoneNumber: string
    },
    displayName?: string,
    name?: {
        givenName: string,
        familyName: string
    },
    userName?: string
}

export interface SearchFilter {
    logical?: boolean,
    field?: SearchFilterFields,
    search?: string,
    operator: SearchFilterOperators,
}
