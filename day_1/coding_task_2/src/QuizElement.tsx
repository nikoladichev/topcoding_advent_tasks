import React, {ChangeEvent, JSX, useState} from 'react';

export const QuizElement = (props: QuizElementProps): JSX.Element => {

    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const val = event.target.checked;
        setChecked(val)

        props.onChange(props.id, val);
    }

    return <div>
        <input type={'checkbox'} checked={checked} onChange={handleChange}/>
        <span>{props.value}</span>
    </div>
}

export interface QuizElementProps {
    id: number;
    value: string;
    onChange: (id: number, checked: boolean) => void;
}