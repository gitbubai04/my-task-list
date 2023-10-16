import LoadingImage from '../images/loader.gif';
import styled from 'styled-components';

const LoaderWrap = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffffd9;
    z-index: 9999;
`

export default function Loader() {
  return (
    <LoaderWrap>
      <img src={LoadingImage} alt='appLoading' />
    </LoaderWrap>
  )
}