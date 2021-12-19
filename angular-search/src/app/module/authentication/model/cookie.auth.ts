import { User } from "./user.model";

export interface CookieAuth {
    token: string;
    user: User;
}