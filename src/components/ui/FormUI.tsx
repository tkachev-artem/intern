import React from 'react';

import { Button, Form, Input, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import FormSchemas from "@/schemas/FormSchemas";
import { z } from 'zod';

type FieldsType = {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    confirmpassword: string;
    select: string;
}

const FormUI = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = React.useState({});

    const getRule = (fieldName: keyof typeof FormSchemas.shape) => {
        return createSchemaFieldRule(z.object({ [fieldName]: FormSchemas.shape[fieldName].optional() }));
    };

    const getStatus = (field: keyof FieldsType) => {
        const errors = form.getFieldError(field);
        return errors.length ? "error" : "";
    }

    const getHelp = (field: keyof FieldsType) => {
        const errors = form.getFieldError(field);
        return errors[0] ?? undefined;
    };

    const onFinish = async (values: FieldsType) => {
        try {
            console.log("Успех:", values);
        } catch (e) {
            console.log("Ошибка");
        }
    }

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFieldsChange={() => forceUpdate({})}
            onFinish={onFinish}
        >
            <Form.Item<FieldsType>
                label="Имя"
                name="name"
                hasFeedback
                validateStatus={getStatus("name")}
                help={getHelp("name")}
                rules={[getRule('name'), { required: true, message: "Введите имя" }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Фамилия"
                name="surname"
                hasFeedback
                validateStatus={getStatus("surname")}
                help={getHelp("surname")}
                rules={[getRule('surname'), { required: true, message: "Введите фамилию" }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Никнейм"
                name="nickname"
                hasFeedback
                validateStatus={getStatus("nickname")}
                help={getHelp("nickname")}
                rules={[getRule('nickname'), { required: true, message: "Введите никнейм" }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Почта"
                name="email"
                hasFeedback
                validateStatus={getStatus("email")}
                help={getHelp("email")}
                rules={[getRule('email'), { required: true, message: "Введите почту" }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Пароль"
                name="password"
                hasFeedback
                validateStatus={getStatus("password")}
                help={getHelp("password")}
                rules={[getRule('password'), { required: true, message: "Введите пароль" }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Подтверждение пароля"
                name="confirmpassword"
                hasFeedback
                validateStatus={getStatus("confirmpassword")}
                help={getHelp("confirmpassword")}
                rules={[getRule('confirmpassword'), { required: true, message: "Подтвердите пароль" }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldsType>
                name="select"
                label="Кто вы?"
                hasFeedback
                validateStatus={getStatus("select")}
                help={getHelp("select")}
                rules={[getRule('select'), { required: true, message: "Выберите роль" }]}
            >
                <Select
                    placeholder="Выберите роль"
                    showSearch
                    optionFilterProp="label"
                    options={[
                        { value: "frontend-user", label: "Frontend Developer"},
                        { value: "backend-user", label: "Backend Developer"},
                        { value: "qa-user", label: "QA Engineer"},
                        { value: "designer-user", label: "Designer"},
                        { value: "manager-user", label: "Manager"},
                        { value: "hr-user", label: "HR"}
                    ]}
                ></Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>

    )
}

export default FormUI;