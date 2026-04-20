import React from 'react';

import { Button, Form, Input, Select, Card, Layout } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';

type FirstStepFields = {
    name: string;
    surname: string;
    nickname: string;
    select: string;
}

interface FormFirstStepUIProps {
    schema: z.ZodObject<any>;
    formData: Partial<FirstStepFields>;
    onNext: (data: FirstStepFields) => void;
}

const FormFirstStepUI: React.FC<FormFirstStepUIProps> = ({ schema, formData, onNext }) => {
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
                title="Регистрация - Шаг 1"
                style={{ width: 500 }}
            >
                <Form
                    form={form}
                    name="firstStep"
                    layout="vertical"
                    initialValues={formData}
                    onFinish={onNext}
                >
                    <Form.Item<FirstStepFields>
                        label="Имя"
                        name="name"
                        rules={[getRule('name')]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FirstStepFields>
                        label="Фамилия"
                        name="surname"
                        rules={[getRule('surname')]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FirstStepFields>
                        label="Никнейм"
                        name="nickname"
                        rules={[getRule('nickname')]}
                    >
                        <Input
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
                                form.setFieldValue("nickname", cleaned);
                            }}
                        />
                    </Form.Item>

                    <Form.Item<FirstStepFields>
                        name="select"
                        label="Кто вы?"
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
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Далее
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}

export default FormFirstStepUI;
