import styled from "styled-components";
import BGImage from '../../images/payment_bg_image.jpg'

export const AuthWrap = styled.section`
    background-image:url(${BGImage});
    height:100vh;
    background-size:cover;
    background-repeat:no-repeat;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;

    .login-outer-body{
        width:600px;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction:column;
    }

    .auth-button-wrap{
        width:calc(191px + 191px + 20px);
        border-radius: 15px;
        border: 1px solid #DDD;
        background: #F0F0F0;
        display: flex;
        justify-content:space-between;
        overflow: hidden;
        padding:2px;

        .active-tab{
            background-color: #000000cc;
            color: #fff;
        }
    }
`

export const AuthBtn = styled.button`
    width: 191px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000cc;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
`

export const AuthBody = styled.div`
    width: 100%;
    height: auto;
    background-color:#fff;
    box-shadow: 0px 11px 21px -1px rgba(0, 0, 0, 0.04), 0px 4px 5px 0px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    margin-top: 10px;
    padding: 0 45px 45px 45px;
`

export const AuthSection = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    width:100%;
    align-items:center;

    .head-name{
        margin: 35px 0;
        color: #000000cc;
        font-size: 25px;
        letter-spacing:0.5px;
    }

    .form-field{
        margin-bottom:30px;
    }
`

export const SubmitBtn = styled.button`
    background-color:#000000cc;
    color:#fff;
    background-color: #000000cc;
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: none;
    height: 58px;
    font-size: 25px;
    margin-top: 20px;
    cursor: pointer;
`