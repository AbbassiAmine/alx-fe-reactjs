// src/components/FormikForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
    // Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Initial form values
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setStatus('Registration successful!');
                resetForm();
            } else {
                setStatus('Registration failed. Please try again.');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Registration Form (Formik)</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ status }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field type="text" id="username" name="username" />
                            <ErrorMessage name="username" component="p" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="p" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="p" style={{ color: 'red' }} />
                        </div>
                        <button type="submit">Register</button>
                        {status && <p>{status}</p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormikForm;