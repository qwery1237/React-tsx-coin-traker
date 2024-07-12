import styled from 'styled-components';

interface ILoaderProps {
  height?: string;
}

const LoaderContainer = styled.div<ILoaderProps>`
  width: 100%;
  height: ${(props) => props.height || `100%`};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.span`
  display: inline-block;
  transform: translateZ(1px);

  &:after {
    content: '';
    display: inline-block;
    width: 48px;
    height: 48px;
    margin: 8px;
    border-radius: 50%;
    background: ${(props) => props.theme.accentColor};
    animation: coin-flip 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes coin-flip {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`;
export default function Loader({ height }: ILoaderProps) {
  return (
    <LoaderContainer height={height}>
      <Icon />
    </LoaderContainer>
  );
}
