/**
 * Created by nijk on 10/03/2016.
 */

export interface UserItem {
    _rev: string,
    schemas: string[],
    contactInformation: {
        telephoneNumber: string,
        emailAddress: string
    },
    _id: string,
    name: {
        familyName: string,
        givenName: string
    },
    userName: string,
    displayName: string
}

export interface UserCredentials {
    username: string;
    password: string;
}