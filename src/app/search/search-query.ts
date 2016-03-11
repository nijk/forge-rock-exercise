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

export enum SearchOperands {
    and,
    or
}

export interface SearchQuery {
    search?: string,
    operator: SearchOperators
}

export interface SearchOperand {
    operand: SearchOperands
}