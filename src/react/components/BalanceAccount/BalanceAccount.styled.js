import styled from 'styled-components';

export const BalanceAccountStyled = styled.button`
    
    background: ${({ theme }) => theme.side_container};
    border-width: 0;
    border-radius: 20px;
    height: 100px;
    width: 400px;
    margin: 10px;
    
    .balance {   
        display: flex;
        flex-direction: row;
        justify-content: center;
     
    }
    
    .number {   
        font-size: 45px;
        font-family: ${({ theme }) => theme.font};
        color: ${({ theme }) => theme.background};
    }
    
    
    .currency {   
        font-size: 25px;
        font-family: ${({ theme }) => theme.font};
        color: ${({ theme }) => theme.background};
    }
    
    .text {   
        font-size: 20px;
        font-family: ${({ theme }) => theme.font};
        color: ${({ theme }) => theme.background};
    }
    
`;
