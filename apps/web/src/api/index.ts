const API_BASE_URL = import.meta.env.VITE_API_URL as string ?? 'http://localhost:4000/api'

/**
 * Универсальный HTTP-клиент с авторизацией через JWT.
 * Бросает Error при не-2xx ответе, возвращая тело ошибки.
 */
async function request<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const token = localStorage.getItem('token')

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> ?? {}),
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    })

    if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? `HTTP ${res.status}`)
    }

    return res.json() as Promise<T>
}

/* ───── Auth ───── */

export const api = {
    /** Регистрация */
    register: (data: {
        firstName: string
        lastName: string
        nickname: string
        email: string
        password: string
        role: string
    }) =>
        request<{ user: unknown; token: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Логин */
    login: (data: { nickname: string; password: string }) =>
        request<{ user: unknown; token: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /* ───── Posts ───── */

    /** Получить ленту */
    getPosts: (params?: {
        page?: number
        pageSize?: number
        type?: string
        direction?: string
    }) => {
        const qs = new URLSearchParams()
        if (params?.page) qs.set('page', String(params.page))
        if (params?.pageSize) qs.set('pageSize', String(params.pageSize))
        if (params?.type) qs.set('type', params.type)
        if (params?.direction) qs.set('direction', params.direction)
        const query = qs.toString()
        return request<unknown>(`/posts${query ? `?${query}` : ''}`)
    },

    /** Создать пост */
    createPost: (data: unknown) =>
        request<unknown>('/posts', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Обновить пост */
    updatePost: (id: string, data: unknown) =>
        request<unknown>(`/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    /** Удалить пост */
    deletePost: (id: string) =>
        request<void>(`/posts/${id}`, { method: 'DELETE' }),

    /** Лайк / дизлайк */
    toggleLike: (id: string) =>
        request<unknown>(`/posts/${id}/like`, { method: 'POST' }),

    /* ───── Profile ───── */

    /** Получить профиль */
    getProfile: (userId: string) =>
        request<unknown>(`/users/${userId}`),

    /** Обновить профиль */
    updateProfile: (data: unknown) =>
        request<unknown>('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
}
