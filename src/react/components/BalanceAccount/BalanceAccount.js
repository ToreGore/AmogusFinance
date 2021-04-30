import React from 'react';
import { BalanceAccountStyled } from './BalanceAccount.styled';

const BalanceAccount = (props) => {
    return (
        <BalanceAccountStyled>
            <div className={"balance"}>
                <div className={"number"}>{props.balance}</div>
                <div className={"currency"}>{props.currency}</div>
            </div>
            <text className={"text"}>{props.text}</text>
        </BalanceAccountStyled>
    )
}
export default BalanceAccount;
