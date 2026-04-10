import type { z } from 'zod'
import type {
    UserSchema,
    UserProfileSchema,
    RegisterRequestSchema,
    LoginRequestSchema,
    UserRoleEnum,
} from '../schemas/user'
import type {
    PostSchema,
    CreatePostRequestSchema,
    UpdatePostRequestSchema,
    PostsResponseSchema,
    PostTypeEnum,
    PostDirectionEnum,
} from '../schemas/post'

/* ───── User ───── */

/** Авторизованный пользователь (Redux store) */
export type User = z.infer<typeof UserSchema>

/** Профиль пользователя (страница профиля) */
export type UserProfile = z.infer<typeof UserProfileSchema>

/** Запрос регистрации */
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

/** Запрос логина */
export type LoginRequest = z.infer<typeof LoginRequestSchema>

/** Роль пользователя */
export type UserRole = z.infer<typeof UserRoleEnum>

/* ───── Post ───── */

/** Пост в ленте */
export type Post = z.infer<typeof PostSchema>

/** Запрос создания поста */
export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>

/** Запрос обновления поста */
export type UpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>

/** Ответ ленты с пагинацией */
export type PostsResponse = z.infer<typeof PostsResponseSchema>

/** Тип поста */
export type PostType = z.infer<typeof PostTypeEnum>

/** Направление поста */
export type PostDirection = z.infer<typeof PostDirectionEnum>
