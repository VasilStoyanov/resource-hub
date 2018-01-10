import { reducer as formReducer } from 'redux-form';
import RegisterFormReducer from './RegisterFormReducer';


const FormReducers = formReducer.plugin({
    'register-form': RegisterFormReducer
});


export default FormReducers;
