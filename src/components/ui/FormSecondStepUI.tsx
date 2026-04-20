import React from 'react';

import { Button, Form, Input, Card, Layout, Tag } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';

type SecondStepFields = {
    email: string;
    password: string;
    confirmpassword: string;
}

type ErrorsState = Partial<Record<keyof SecondStepFields, string[]>>;

interface FormSecondStepUIProps {
    schema: z.ZodObject<any>;
    formData: Partial<SecondStepFields>;
    onBack: () => void;
    onSubmit: (data: SecondStepFields) => void;
}

const FormSecondStepUI: React.FC<FormSecondStepUIProps> = ({ schema, formData, onBack, onSubmit }) => {
    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<ErrorsState>({});

    const getRule = (fieldName: keyof typeof schema.shape) => {
        const fieldSchema = schema.shape[fieldName];
        const preprocessSchema = z.preprocess(
            (val) => (val === undefined ? "" : val),
            fieldSchema
        );
        return createSchemaFieldRule(z.object({ [fieldName]: preprocessSchema }));
    };

    const getHelpTags = (field: keyof SecondStepFields) => {
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

    const getValidateStatus = (field: keyof SecondStepFields) => {
        const fieldErrors = errors[field];
        return fieldErrors && fieldErrors.length > 0 ? "error" : "";
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
                    onFieldsChange={(_changedFields, allFields) => {
                        const newErrors: ErrorsState = {};
                        allFields.forEach((field) => {
                            const name = field.name[0] as keyof SecondStepFields;
                            if (field.errors && field.errors.length > 0) {
                                newErrors[name] = field.errors;
                            }
                        });
                        setErrors(newErrors);
                    }}
                    onFinish={onSubmit}
                >
                    <Form.Item<SecondStepFields>
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

                    <Form.Item<SecondStepFields>
                        label="Пароль"
                        name="password"
                        validateStatus={getValidateStatus("password")}
                        help={getHelpTags("password")}
                        rules={[getRule('password')]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<SecondStepFields>
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
            </Card>
        </Layout>
    )
}

export default FormSecondStepUI;
