import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";

class LoginForm extends React.Component
{
    onSubmit(values) {
        console.log(values);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="text-center">
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Username" type="text" component={renderField} />
                    <Field name="password" label="Password" type="password" component={renderField} />
                    <button type="submit" className="btn btn-primary btn-big btn-block">Log In</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
        form: 'LoginForm'
    })(LoginForm);
