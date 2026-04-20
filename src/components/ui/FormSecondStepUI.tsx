import React from 'react';

import { Button, Form, Input, Card, Layout, Typography } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';

type SecondStepFields = {
    email: string;
    password: string;
    confirmpassword: string;
}

interface FormSecondStepUIProps {
    schema: z.ZodObject<any>;
    formData: Partial<SecondStepFields>;
    onBack: () => void;
    onSubmit: (data: SecondStepFields) => void;
}

const FormSecondStepUI: React.FC<FormSecondStepUIProps> = ({ schema, formData, onBack, onSubmit }) => {
    const [form] = Form.useForm();

    const getRule = (fieldName: keyof typeof schema.shape) => {
        const fieldSchema = schema.shape[fieldName];
        const preprocessSchema = z.preprocess(
            (val) => (val === undefined ? "" : val),
            fieldSchema
        );
        return createSchemaFieldRule(z.object({ [fieldName]: preprocessSchema }));
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card 
                title="Регистрация - Шаг 2" 
                style={{ width: 500 }}
            >
                <Form
                    form={form}
                    name="secondStep"
                    layout="vertical"
                    initialValues={formData}
                    onFinish={onSubmit}
                >
                    <Form.Item<SecondStepFields>
                        label="Почта"
                        name="email"
                        rules={[getRule('email')]}
                    >
                        <Input
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^a-zA-Z0-9@._\-+]/g, "");
                                form.setFieldValue("email", cleaned);
                            }}
                        />
                    </Form.Item>

                    <Form.Item<SecondStepFields>
                        label="Пароль"
                        name="password"
                        rules={[getRule('password')]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<SecondStepFields>
                        label="Подтверждение пароля"
                        name="confirmpassword"
                        dependencies={["password"]}
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

                    <Form.Item>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button onClick={onBack} style={{ flex: 1 }}>
                                Назад
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ flex: 1 }}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <Typography.Text type="secondary">
                    Уже есть аккаунт? <Link to="/login">Вы можете в него войти!</Link>
                </Typography.Text>
            </Card>
        </Layout>
    )
}

export default FormSecondStepUI;
