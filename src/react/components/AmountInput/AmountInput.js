import React from 'react';
import { AmountInputStyled } from './AmountInput.styled';

const AmountInput = (props) => {
    return (
        <AmountInputStyled>
            <div className={"balance"}>
                <div className={"number"}>{props.balance}</div>
                <div className={"currency"}>{props.currency}</div>
            </div>
            <text className={"text"}>{props.text}</text>
        </AmountInputStyled>
    )
}
export default AmountInput;
