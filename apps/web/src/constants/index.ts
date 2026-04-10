/** Базовый URL API — берётся из .env или fallback на localhost */
export const API_BASE_URL = import.meta.env.VITE_API_URL as string ?? 'http://localhost:4000/api'

/** Роли для отображения в формах */
export const USER_ROLES = [
    'Frontend Developer',
    'Backend Developer',
    'QA Engineer',
    'Designer',
    'Manager',
    'HR',
] as const

/** Типы постов для фильтрации */
export const POST_TYPES = [
    'Article',
    'News',
    'Discussion',
    'Tutorial',
    'Question',
] as const

/** Направления для фильтрации */
export const POST_DIRECTIONS = [
    'Frontend',
    'Backend',
    'QA',
    'Design',
    'Management',
    'HR',
    'General',
] as const

/** Размер страницы по умолчанию */
export const DEFAULT_PAGE_SIZE = 10
