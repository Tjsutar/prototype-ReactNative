import { z } from 'zod';
import { VALIDATION } from '../constants';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
    username: z
        .string()
        .min(
            VALIDATION.USERNAME.MIN_LENGTH,
            `Username must be at least ${VALIDATION.USERNAME.MIN_LENGTH} characters`
        )
        .max(
            VALIDATION.USERNAME.MAX_LENGTH,
            `Username must be at most ${VALIDATION.USERNAME.MAX_LENGTH} characters`
        )
        .regex(VALIDATION.USERNAME.PATTERN, 'Username can only contain letters, numbers, underscores and dashes'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(
            VALIDATION.PASSWORD.MIN_LENGTH,
            `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`
        )
        .max(
            VALIDATION.PASSWORD.MAX_LENGTH,
            `Password must be at most ${VALIDATION.PASSWORD.MAX_LENGTH} characters`
        )
        .regex(
            new RegExp(VALIDATION.PASSWORD.PATTERN.source), // Zod regex expects RegExp object, our constant might be one but to be safe/explicit if it came from JSON or similar
            'Password must contain at least one letter, one number, and one special character'
        ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
