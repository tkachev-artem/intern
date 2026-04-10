import { z } from 'zod'

/**
 * Роли пользователя — соответствуют требованию из README
 */
export const UserRoleEnum = z.enum([
    'Frontend Developer',
    'Backend Developer',
    'QA Engineer',
    'Designer',
    'Manager',
    'HR',
])

/**
 * zod-схема: авторизованный пользователь (хранится в Redux + localStorage)
 */
export const UserSchema = z.object({
    id: z.string(),
    nickname: z.string(),
    role: UserRoleEnum,
    token: z.string(),
})

/**
 * zod-схема: профиль пользователя (страница профиля)
 */
export const UserProfileSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    nickname: z.string(),
    role: UserRoleEnum,
    workplace: z.string().optional(),
    description: z.string().optional(),
    avatar: z.string().url().optional(),
    portfolio: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            link: z.string().url().optional(),
        }),
    ).optional(),
})

/**
 * zod-схема: запрос регистрации
 */
export const RegisterRequestSchema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    nickname: z.string().min(3, 'Минимум 3 символа'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string(),
    role: UserRoleEnum,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
})

/**
 * zod-схема: запрос логина
 */
export const LoginRequestSchema = z.object({
    nickname: z.string().min(1, 'Введите никнейм'),
    password: z.string().min(1, 'Введите пароль'),
})
