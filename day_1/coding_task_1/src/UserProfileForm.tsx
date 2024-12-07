import React, {ChangeEvent, FormEvent, FormEventHandler, JSX, useState} from 'react';

export const UserProfileForm = (_props: UserProfileFormProps): JSX.Element => {
    const emailValidationRegexp = new RegExp("^[\\w-\.]+@([\\w-]+\.)+[\\w-]{2,4}$");
    const [formData, setFormData] = useState<UserProfileFormState>({name: '', email: ''});
    const [errors, setErrors] = useState<UserProfileFormErrorsState | undefined>(undefined);

    const handleNameChange = (input: ChangeEvent<HTMLInputElement>) => {
        const name = input.target.value;
        setFormData(prevState => ({...prevState, name}));
    }

    const handleBioChange = (input: ChangeEvent<HTMLInputElement>) => {
        const bio = input.target.value;
        setFormData(prevState => ({...prevState, bio}));
    }

    const handleEmailChange = (input: ChangeEvent<HTMLInputElement>) => {
        const email = input.target.value;
        setFormData(prevState => ({
            ...prevState,
            email
        }));
    }

    const submitHandler = (event: any): void => {
        event.preventDefault();

        const email: boolean = emailValidationRegexp.test(formData.email);
        const name: boolean = formData.name.length > 0;
        setErrors({name, email});
    }

    return (
        <div>
            <form onSubmit={submitHandler} >
                <div id={'user-name'}>
                    <input required={true} placeholder={'Name'} onChange={handleNameChange}/>
                    {errors && !errors.name && <span style={{color: "red"}}>Name is not valid</span>}
                </div>

                <div id={'email'}>
                    <input required={true} placeholder={'Email'} onChange={handleEmailChange}/>
                    {errors && !errors.email && <span style={{color: "red"}}>Email is not valid</span>}
                </div>

                <div id={'bio'}>
                    <input placeholder={'Bio'} onChange={handleBioChange}/>
                </div>
                <button type={"submit"} value={'Submit'}>Submit</button>
            </form>
            {errors && !errors.email && !errors.name && <div style={{color: "green"}}>Success</div>}
        </div>
    );
}

export interface UserProfileFormProps {
}

interface UserProfileFormState {
    name: string;
    email: string;
    bio?: string;
}

interface UserProfileFormErrorsState {
    email: boolean;
    name: boolean;
}