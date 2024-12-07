import React, {JSX, useMemo, useState} from 'react';
import {QuizElement} from "./QuizElement";

export const Quiz = (props: QuizProps): JSX.Element => {

    // no need for this state at all - but this component should be used to aggregate all results and on submission
    // to propagate the selection values to the caller.
    const [checked] = useState<Map<number, boolean>>(new Map());

    const handleChange = (id: number, check: boolean) => {
        checked.set(id, check);
    }

    const answers = useMemo((): JSX.Element[] => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < props.answers.length; i++) {
            result.push(<QuizElement key={i} id={i} value={props.answers[i]} onChange={handleChange}/>);
        }

        return result;
    }, [props.answers]);

    return (<div>
        <h4>{props.question}</h4>
        <p style={{textAlign: "justify"}}>
            {answers}
        </p>
    </div>);
}

interface QuizCheckElement {
    id: number;
    checked: boolean;
}

export interface QuizProps {
    question: string;
    answers: string[];
}