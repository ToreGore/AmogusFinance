import styled from 'styled-components';

export const RightBoxStyled = styled.button`
    
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.border};
    border-width: 0.5px;
    border-radius: 20px;
    height: 400px;
    width: 400px;
    
`;
