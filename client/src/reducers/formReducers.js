import { reducer as formReducer } from 'redux-form';
import RegisterFormReducer from './RegisterFormReducer';


const FormReducers = formReducer.plugin({
  'home-page-menu-form': RegisterFormReducer,
});


export default FormReducers;
