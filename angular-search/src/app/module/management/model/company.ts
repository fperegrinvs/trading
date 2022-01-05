import {Role} from "./role";

export interface Company {
    id: number,
    name: string,
    note: string,
    roles: Role[]
}
