import React from 'react';

import { Button, Form, Input, Select, Tag } from 'antd';
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

type ErrorsState = Partial<Record<keyof FieldsType, string[]>>;

const FormUI = () => {
    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<ErrorsState>({});

    const getRule = (fieldName: keyof typeof FormSchemas.shape) => {
        const fieldSchema = FormSchemas.shape[fieldName];
        const preprocessSchema = z.preprocess(
            (val) => (val === undefined ? "" : val),
            fieldSchema
        );
        return createSchemaFieldRule(z.object({ [fieldName]: preprocessSchema }));
    };

    const getHelpTags = (field: keyof FieldsType) => {
        const fieldErrors = errors[field];
        if (!fieldErrors || fieldErrors.length === 0) return undefined;
        
        return (
            <div style={{ marginTop: 4 }}>
                {fieldErrors.map((error, index) => (
                    <Tag key={index} color="error" style={{ marginBottom: 4 }}>
                        {error}
                    </Tag>
                ))}
            </div>
        );
    };

    const getValidateStatus = (field: keyof FieldsType) => {
        const fieldErrors = errors[field];
        return fieldErrors && fieldErrors.length > 0 ? "error" : "";
    };

    const onFinish = async (values: FieldsType) => {
        console.log("Успех:", values);
    };

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFieldsChange={(allFields) => {
                const newErrors: ErrorsState = {};
                allFields.forEach((field) => {
                    const name = field.name[0] as keyof FieldsType;
                    if (field.errors && field.errors.length > 0) {
                        newErrors[name] = field.errors;
                    }
                });
                setErrors(newErrors);
            }}
        >
            <Form.Item<FieldsType>
                label="Имя"
                name="name"
                validateStatus={getValidateStatus("name")}
                help={getHelpTags("name")}
                rules={[getRule('name')]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Фамилия"
                name="surname"
                validateStatus={getValidateStatus("surname")}
                help={getHelpTags("surname")}
                rules={[getRule('surname')]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Никнейм"
                name="nickname"
                validateStatus={getValidateStatus("nickname")}
                help={getHelpTags("nickname")}
                rules={[getRule('nickname')]}
            >
                <Input
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
                        form.setFieldValue("nickname", cleaned);
                    }}
                />
            </Form.Item>

            <Form.Item<FieldsType>
                label="Почта"
                name="email"
                validateStatus={getValidateStatus("email")}
                help={getHelpTags("email")}
                rules={[getRule('email')]}
            >
                <Input
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^a-zA-Z0-9@._\-+]/g, "");
                        form.setFieldValue("email", cleaned);
                    }}
                />
            </Form.Item>

            <Form.Item<FieldsType>
                label="Пароль"
                name="password"
                validateStatus={getValidateStatus("password")}
                help={getHelpTags("password")}
                rules={[getRule('password')]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldsType>
                label="Подтверждение пароля"
                name="confirmpassword"
                dependencies={["password"]}
                validateStatus={getValidateStatus("confirmpassword")}
                help={getHelpTags("confirmpassword")}
                rules={[
                    getRule('confirmpassword'),
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Пароли не совпадают");
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldsType>
                name="select"
                label="Кто вы?"
                validateStatus={getValidateStatus("select")}
                help={getHelpTags("select")}
                rules={[getRule('select')]}
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
