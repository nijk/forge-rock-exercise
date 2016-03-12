/**
 * Created by nijk on 11/03/2016.
 */

export enum SearchOperators {
    sw,
    co,
    eq,
    and,
    or
}

export interface SearchQuery {
    logical?: boolean,
    search?: string,
    operator: SearchOperators
}