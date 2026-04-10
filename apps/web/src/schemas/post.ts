import { z } from 'zod'

/**
 * Тип поста — для фильтрации в ленте
 */
export const PostTypeEnum = z.enum([
    'Article',
    'News',
    'Discussion',
    'Tutorial',
    'Question',
])

/**
 * Направление — для фильтрации в ленте
 */
export const PostDirectionEnum = z.enum([
    'Frontend',
    'Backend',
    'QA',
    'Design',
    'Management',
    'HR',
    'General',
])

/**
 * zod-схема: пост в ленте
 */
export const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    type: PostTypeEnum,
    direction: PostDirectionEnum,
    authorId: z.string(),
    authorName: z.string(),
    photoPreview: z.string().url().optional(),
    likesCount: z.number().int().nonnegative(),
    isLikedByMe: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
})

/**
 * zod-схема: создание поста
 */
export const CreatePostRequestSchema = z.object({
    title: z.string().min(1, 'Заголовок обязателен'),
    content: z.string().min(1, 'Содержание обязательно'),
    type: PostTypeEnum,
    direction: PostDirectionEnum,
    photoPreview: z.string().url().optional(),
})

/**
 * zod-схема: обновление поста
 */
export const UpdatePostRequestSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    type: PostTypeEnum.optional(),
    direction: PostDirectionEnum.optional(),
    photoPreview: z.string().url().optional(),
})

/**
 * zod-схема: ответ ленты (с пагинацией)
 */
export const PostsResponseSchema = z.object({
    posts: z.array(PostSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
})
