import React, {Component} from 'react';
import classes from './QuizeCreator.css';
import Buttons from "../../components/UI/Buttons/Buttons";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from '../../form/formFramework';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuize, finisheCreateQuize} from "../../store/Actions/ActionCreateQuize";

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizeCreator extends Component {

    state = {
        isFromValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();
        const index = this.props.quize.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const questionItem = {
            id: index,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuize(questionItem);

        this.setState({
            isFromValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    };

    createQuizeHandler = (event) => {
        event.preventDefault();
        this.setState({
            isFromValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });

        this.props.finisheCreateQuize();
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;

        this.setState({
            formControls,
            isFromValid: validateForm(formControls)
        })
    };

    renderInputsControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        value={control.value}
                        valid={control.valid}
                        label={control.label}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            );
        })
    };

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {

        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />;

        return (
            <div className={classes.QuizeCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderInputsControls()}

                        {select}
                        <Buttons
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disable={!this.state.isFromValid}
                        >Добавить вопрос</Buttons>
                        <Buttons
                            type={'success'}
                            onClick={this.createQuizeHandler}
                            disable={this.props.quize.length === 0}
                        >Создать тест</Buttons>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quize: state.create.quize,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        createQuize: (item) => dispatch(createQuize(item)),
        finisheCreateQuize: () => dispatch(finisheCreateQuize())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizeCreator);
