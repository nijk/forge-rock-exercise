/**
 * Created by nijk on 14/03/2016.
 */

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
