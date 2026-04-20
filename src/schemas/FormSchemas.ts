import { z } from "zod";

const FirstStepSchema = z.object({
    name: z.string().trim()
        .min(1, "Введите имя")
        .min(2, "Минимально 2 символа")
        .max(50, "Максимум 50 символов")
        .regex(/^[а-яёА-ЯЁa-zA-Z-]+$/, "Только буквы и дефис"),

    surname: z.string().trim()
        .min(1, "Введите фамилию")
        .min(2, "Минимально 2 символа")
        .max(50, "Максимум 50 символов")
        .regex(/^[а-яёА-ЯЁa-zA-Z-]+$/, "Только буквы и дефис"),

    nickname: z.string().trim()
        .min(1, "Введите никнейм")
        .min(3, "Минимально 3 символа")
        .max(20, "Максимум 20 символов")
        .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Начинается с буквы, только латиница, цифры и _"),

    select: z.string().trim()
        .min(1, "Выберите роль"),
});

const SecondStepSchema = z.object({
    email: z.string().trim()
        .min(1, "Введите почту")
        .email("Неверный формат почты")
        .max(100, "Максимум 100 символов"),

    password: z.string().trim()
        .min(1, "Введите пароль")
        .min(8, "Минимально 8 символов")
        .max(64, "Максимум 64 символа")
        .regex(/[a-zA-Z]/, "Пароль должен включать буквы")
        .regex(/[0-9]/, "Пароль должен включать цифры"),

    confirmpassword: z.string().trim()
        .min(1, "Подтвердите пароль")
        .min(8, "Минимально 8 символов")
        .max(64, "Максимум 64 символа"),
});

const LoginSchema = z.object({
    nickname: z.string().trim()
        .min(1, "Введите никнейм")
        .min(3, "Минимально 3 символа")
        .max(20, "Максимум 20 символов")
        .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Начинается с буквы, только латиница, цифры и _"),

    password: z.string().trim()
        .min(1, "Введите пароль")
        .min(8, "Минимально 8 символов")
        .max(64, "Максимум 64 символа"),
});

export { FirstStepSchema, SecondStepSchema, LoginSchema };
