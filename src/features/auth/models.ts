export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
}
