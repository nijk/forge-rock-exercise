/**
 * Created by nijk on 11/03/2016.
 */

export interface SearchFields {
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

export enum SearchFieldNames {
    'contactInformation/emailAddress',
    'contactInformation/telephoneNumber',
    'displayName',
    'name/givenName',
    'name/familyName',
    'userName'
}

export enum SearchOperators {
    sw,
    co,
    eq,
    and,
    or
}

export interface SearchQuery {
    logical?: boolean,
    field?: SearchFields,
    search?: string,
    operator: SearchOperators,
}
