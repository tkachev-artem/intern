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

    const getRule = (fieldName: keyof typeof FormSchemas.shape) => {
        return createSchemaFieldRule(z.object({ [fieldName]: FormSchemas.shape[fieldName] }));
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
            onFinish={onFinish}
        >
            <Form.Item<FieldsType>
                label="Имя"
                name="name"
                rules={[getRule('name'), { required: true }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Фамилия"
                name="surname"
                rules={[getRule('surname'), { required: true }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Никнейм"
                name="nickname"
                rules={[getRule('nickname'), { required: true }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Почта"
                name="email"
                rules={[getRule('email'), { required: true }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Пароль"
                name="password"
                rules={[getRule('password'), { required: true }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldsType>
                label="Подтверждение пароля"
                name="confirmpassword"
                rules={[getRule('confirmpassword'), { required: true }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldsType>
                name="select"
                label="Кто вы?"
                rules={[getRule('select'), { required: true }]}
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