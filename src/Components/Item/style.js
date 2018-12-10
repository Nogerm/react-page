import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export const LeftColumn = styled.div`
  flex: 1;
  justify-content: center;
  border: 3px solid green;
`;

export const MidColumn = styled.div`
  flex: 2;
  justify-content: center;
  border: 3px solid blue;
`;

export const RightColumn = styled.div`
  flex: 1;
  justify-content: center;
  border-width:3px;
  border-color:#A9A9A9;
`;

export const EditColumn = styled.div`
  flex: 1;
  justify-content: center;
  border-width:3px;
  border-color:#A9A9A9;
`;