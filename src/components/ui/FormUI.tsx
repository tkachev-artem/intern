import React from 'react';
import FormFirstStepUI from './FormFirstStepUI';
import FormSecondStepUI from './FormSecondStepUI';
import { FirstStepSchema, SecondStepSchema } from '@/schemas/FormSchemas';

type FirstStepData = {
    name: string;
    surname: string;
    nickname: string;
    select: string;
}

type SecondStepData = {
    email: string;
    password: string;
    confirmpassword: string;
}

type FormData = Partial<FirstStepData & SecondStepData>;

const FormUI = () => {
    const [step, setStep] = React.useState<1 | 2>(1);
    const [formData, setFormData] = React.useState<FormData>({});

    const handleFirstStepSubmit = (data: FirstStepData) => {
        setFormData(prev => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleFinalSubmit = (data: SecondStepData) => {
        const finalData = { ...formData, ...data };
        console.log("Регистрация завершена:", finalData);
    };

    if (step === 1) {
        return (
            <FormFirstStepUI
                schema={FirstStepSchema}
                formData={formData}
                onNext={handleFirstStepSubmit}
            />
        );
    }

    return (
        <FormSecondStepUI
            schema={SecondStepSchema}
            formData={formData}
            onBack={handleBack}
            onSubmit={handleFinalSubmit}
        />
    );
}

export default FormUI;
