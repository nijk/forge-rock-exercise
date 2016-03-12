/**
 * Created by nijk on 11/03/2016.
 */

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

export enum SearchFilterFieldNames {
    'contactInformation/emailAddress',
    'contactInformation/telephoneNumber',
    'displayName',
    'name/givenName',
    'name/familyName',
    'userName'
}

export enum SearchFilterOperators {
    sw,
    co,
    eq,
    and,
    or
}

export interface SearchFilter {
    logical?: boolean,
    field?: SearchFilterFields,
    search?: string,
    operator: SearchFilterOperators,
}
