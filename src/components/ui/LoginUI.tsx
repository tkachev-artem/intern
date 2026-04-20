import { Button, Form, Input, Card, Layout, Typography } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { LoginSchema } from '@/schemas/FormSchemas';
import { z } from 'zod';
import { Link } from 'react-router-dom';

type LoginFields = {
    nickname: string;
    password: string;
}

const LoginUI = () => {
    const [form] = Form.useForm();

    const getRule = (fieldName: keyof typeof LoginSchema.shape) => {
        const fieldSchema = LoginSchema.shape[fieldName];
        const preprocessSchema = z.preprocess(
            (val) => (val === undefined ? "" : val),
            fieldSchema
        );
        return createSchemaFieldRule(z.object({ [fieldName]: preprocessSchema }));
    };

    const onFinish = (values: LoginFields) => {
        console.log("Авторизация:", values);
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card 
                title="Авторизация"
                style={{ width: 500 }}
            >
                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<LoginFields>
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

                    <Form.Item<LoginFields>
                        label="Пароль"
                        name="password"
                        rules={[getRule('password')]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Text type="secondary">
                    Нет аккаунта? <Link to="/register">Создайте его!</Link>
                </Typography.Text>
            </Card>
        </Layout>
    )
}

export default LoginUI;
