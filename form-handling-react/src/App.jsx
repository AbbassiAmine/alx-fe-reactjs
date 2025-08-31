
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';

function App() {
  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <div>
        <RegistrationForm />
      </div>
      <div>
        <FormikForm />
      </div>
    </div>
  );
}

export default App;