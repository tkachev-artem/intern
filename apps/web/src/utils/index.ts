import type { UserRole, PostType, PostDirection } from '../types'
import { USER_ROLES, POST_TYPES, POST_DIRECTIONS } from '../constants'

/** Лейблы для ролей (пока 1:1, но можно перевести) */
export const roleLabel = (role: UserRole): string => role

/** Лейблы для типов постов */
export const postTypeLabel = (type: PostType): string => type

/** Лейблы для направлений */
export const postDirectionLabel = (dir: PostDirection): string => dir

/** Валидация: совпадение паролей */
export const passwordsMatch = (p1: string, p2: string): boolean => p1 === p2

/** Форматирование даты ISO → DD.MM.YYYY */
export const formatDate = (iso: string): string => {
    const d = new Date(iso)
    return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

/** Опции для <select> ролей */
export const roleOptions = USER_ROLES.map((r) => ({ value: r, label: r }))

/** Опции для <select> типов поста */
export const postTypeOptions = POST_TYPES.map((t) => ({ value: t, label: t }))

/** Опции для <select> направлений */
export const postDirectionOptions = POST_DIRECTIONS.map((d) => ({
    value: d,
    label: d,
}))
