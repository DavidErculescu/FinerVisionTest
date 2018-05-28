import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            firstname : '',
            surname : '',
            email : '',
            number : '',
            birth : '',
            gender : '',
            comments : '',

            errors: [],
        };

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeBirth = this.handleChangeBirth.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeComments = this.handleChangeComments.bind(this);
        this.handleValidationStep1 = this.handleValidationStep1.bind(this);
        this.handleValidationStep2 = this.handleValidationStep2.bind(this);
        this.handleDisplayValidationError = this.handleDisplayValidationError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    handleChangeSurname(e) {
        this.setState({
            surname: e.target.value
        });
    }

    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }

    handleChangeBirth(e) {
        this.setState({
            birth: e.target.value
        });
    }

    handleChangeGender (e) {
        this.setState({
            gender: e.target.value
        });
    }

    handleChangeComments(e) {
        this.setState({
            comments: e.target.value
        });
    }

    handleValidationStep1 () {
        // we are going to store errors for all fields
        // in a single array
        var ok = 1;
        const errors = {};
        const { firstname, email, surname } = this.state;

        if (firstname.length === 0) {
            ok = 0;
            errors.firstname = "First name can't be empty";
        }

        if (surname.length === 0) {
            ok = 0;
            errors.surname = "Surname should be at least 6 characters long";
        }

        if (email.length < 5) {
            ok = 0;
            errors.email = "Email should be at least 5 charcters long";
        }
        else if (email.split('').filter(x => x === '@').length !== 1) {
            ok = 0;
            errors.email = "Email should contain a @";
        }
        else if (email.indexOf('.') === -1) {
            ok = 0;
            errors.email = "Email should contain at least one dot";
        }

        if (ok ===1) {
            console.log("Step 1 is good!!!");
        }
        else {
            console.log( errors);
        }

        this.handleDisplayValidationError(errors, 'step1');

        if (ok === 1){
            $("#step1").attr("status", "closing");
            $("#step2").attr("status", "open");
            setTimeout(function() { $("#step1").attr("status", "closed");; }.bind(this), 3000);
        }
    }

    handleValidationStep2 () {
        // we are going to store errors for all fields
        // in a signle array
        var ok = 1;
        const errors = {};
        const { number, birth, gender } = this.state;

        if (number.length === 0) {
            ok = 0;
            errors.number = "Phone number can't be empty";
        }
        else if (number.length < 11) {
            ok = 0;
            errors.number = "Phone number is too short";
        }
        else if (number.length > 11) {
            ok = 0;
            errors.number = "Phone number is too long";
        }
        if (birth.length === 0) {
            ok = 0;
            errors.birth = "Date of birth can't be empty";
        }
        if (gender.length === 0) {
            ok = 0;
            errors.gender = "Gender must be selected";
        }

        if (ok === 1) {
            console.log("Step 2 is good!!!")
        }
        else {
            console.log( errors);
        }

        this.handleDisplayValidationError(errors, 'step2');

        if (ok === 1){
            $("#step2").attr("status", "closing");
            $("#step3").attr("status", "open");
            setTimeout(function() { $("#step2").attr("status", "closed");; }.bind(this), 3000);
        }
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post('/finerForm', {
                firstname: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                number: this.state.number,
                birth: this.state.birth,
                gender: this.state.gender,
                comments: this.state.comments
            })

        $("#step3").attr("status", "closing");
        setTimeout(function() { $("#step3").attr("status", "closed");; }.bind(this), 3000);
    }

    handleDisplayValidationError(errors, step) {
        $("#"+step+" .errorContainer").html("");
        for (var error in errors)
        {
            $("#"+step+" .errorContainer").html(
                $("#"+step+" .errorContainer").html() +
                "<div class='alert alert-danger'>"+errors[error]+"</div>"
            );
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="row justify-content-center container">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="step" id="step1" status="open">
                            <div className="step-title">
                                <span className="step-title-text">Step 1: Your details</span>
                            </div>
                            <div className="form-fields">
                                <div className="errorContainer">
                                </div>
                                <div className="first-input step-elements">
                                    <span>First Name</span>
                                    <input
                                        id="firstname"
                                        onChange={this.handleChangeFirstname}
                                        value={this.state.firstname}
                                        className="step-elements-input"
                                        required
                                    />
                                </div>
                                <div className="second-input step-elements">
                                    <span>Surname</span>
                                    <input
                                        id="surname"
                                        onChange={this.handleChangeSurname}
                                        value={this.state.surname}
                                        className="step-elements-input"
                                        required
                                    />
                                </div>
                                <div className="third-input step-elements">
                                    <span>Email</span>
                                    <input
                                        id="email"
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email}
                                        className="step-elements-input"
                                        type="email"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="step-elements-button" onClick={this.handleValidationStep1}>
                                Next >
                            </button>
                            <br className="clear-float"/>
                        </div>

                        <div className="step" id="step2" status="closed">
                            <div className="step-title">
                                <span className="step-title-text">Step 2: Your details</span>
                            </div>
                            <div className="form-fields">
                                <div className="errorContainer">
                                </div>
                                <div className="first-input step-elements">
                                    <span>Mobile number</span>
                                    <input
                                        id="number"
                                        onChange={this.handleChangeNumber}
                                        value={this.state.number}
                                        className="step-elements-input"
                                        required
                                    />
                                </div>
                                <div className="second-input step-elements">
                                    <span>Date of birth</span>
                                    <input
                                        id="birth"
                                        onChange={this.handleChangeBirth}
                                        value={this.state.birth}
                                        className="step-elements-input"
                                        type="date"
                                        required
                                    />
                                </div>
                                <div className="third-input step-elements">
                                    <span>Gender</span>
                                    <div className="radio">
                                        <label>
                                            <input
                                                onChange={this.handleChangeGender}
                                                checked={this.state.gender === 'Male'}
                                                type="radio"
                                                value="Male"
                                            />Male
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                                onChange={this.handleChangeGender}
                                                checked={this.state.gender === 'Female'}
                                                type="radio"
                                                value="Female"
                                            />Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="step-elements-button" onClick={this.handleValidationStep2}>
                                Next >
                            </button>
                            <br className="clear-float"/>
                        </div>

                        <div className="step" id="step3" status="closed">
                            <div className="step-title">
                                <span className="step-title-text">Step 3: Final comments</span>
                            </div>
                            <div className="step-elements">
                                <span>Comments (optional)</span>
                                <textarea
                                    onChange={this.handleChangeComments}
                                    value={this.state.comments}
                                    className="form-control step-comment-input"
                                />
                            </div>
                            <button type="submit" className="step-elements-button">
                                Submit
                            </button>
                            <br className="clear-float"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
