import { z } from "zod";

const FormSchemas = z.object({
    name: z.string().trim().min(2, "Минимально 2 символа в вашем имени").refine((val) => !val.includes(" "), { message: "Пробелы запрещены" }),
    surname: z.string().trim().min(2, "Минимально 2 символа в вашей фамилии"),
    nickname: z.string().trim().min(3, "Минимально 3 символа в никнейме"),
    email: z.string().trim().email("Неверный формат почты"),
    password: z.string().trim().min(8, "Минимально 8 символов").regex(/[a-zA-Z]/, "Пароль должен включать буквы").regex(/[0-9]/,"Пароль должен включать цифры"),
    confirmpassword: z.string().trim().min(8, "Минимально 8 символов").regex(/[a-zA-Z]/, "Пароль должен включать буквы").regex(/[0-9]/,"Пароль должен включать цифры"),
    select: z.string().trim().min(1, "Выберите роль")
}).refine((data) => data.password === data.confirmpassword, {
    message: "Пароли не совпадают",
    path: ["confirmpassword"]
});

export default FormSchemas;
