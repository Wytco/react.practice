import React, {Component} from 'react';
import classes from './Auth.css';
import Buttons from "../../components/UI/Buttons/Buttons";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import {connect} from "react-redux";
import {auth} from "../../store/Actions/ActionAuth";

// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

    state = {
        isFromValid: false,
        formControls: {
            email: {
                value: '',
                type: "email",
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validate: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: "password",
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validate: {
                    required: true,
                    minLength: 6
                }
            },
        }
    };

    loginHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );

        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // };
        //
        // try{
        //     const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDU7hijI-JE3vGZ-GJqKFk-OF9L3EBB7ao',authData)
        //     console.log(response)
        // } catch (e) {
        //     console.log(e)
        // }
    };

    registerHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // };
        //
        // try{
        //     const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDU7hijI-JE3vGZ-GJqKFk-OF9L3EBB7ao',authData)
        //     console.log(response)
        // } catch (e) {
        //     console.log(e)
        // }
    };
    submitHandler = (event) => {
        event.preventDefault();
    };

    validateControl(value, validate) {
        if (!validate) {
            return true;
        }

        let isValid = true;

        if (validate.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validate.email) {
            // isValid = validateEmail(value) && isValid
            isValid = is.email(value) && isValid
        }

        if (validate.minLength) {
            isValid = value.length >= validate.minLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validate)

        formControls[controlName] = control;

        let isFromValid = true;

        Object.keys(formControls).forEach(name => {
            isFromValid = formControls[name].valid && isFromValid
        });

        this.setState({
            formControls, isFromValid
        })
    };


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    label={control.label}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validate}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Buttons
                            type={'success'}
                            onClick={this.loginHandler}
                            disable={!this.state.isFromValid}
                        >Войти</Buttons>
                        <Buttons
                            type={'primary'}
                            onClick={this.registerHandler}
                            disable={!this.state.isFromValid}
                        >Зарегистрироватся</Buttons>
                    </form>
                </div>
            </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password,isLogin) => dispatch(auth(email, password,isLogin))
    }
}

export default connect(null,mapDispatchToProps)(Auth)