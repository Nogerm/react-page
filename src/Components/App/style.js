import styled, { keyframes } from 'styled-components';

const LogoMove = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export const LeftColumn = styled.div`
	flex: 2;
	justify-content: center;
	background: #282c34;
	display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
	flex: 5;
	justify-content: center;
	display: flex;
  flex-direction: column;
`;

export const ContentText = styled.p`
	color: white;
`;

export const LogoImage = styled.img`
	height: 75px;
	width: 75px;
	animation: ${LogoMove} 20s infinite;
`;