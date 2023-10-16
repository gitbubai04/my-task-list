import styled from "styled-components";

export const DashboardStyle = styled.div`
    width:60%;
    margin:50px auto;

    @media(max-width:1399px){
        width:80%;
    }

    .header_part{
        display: flex;
        justify-content:space-between;
        align-items:center;

        h1{
            font-size: 30px;
            font-weight: 600;
        }

        .head-right{
            display: flex;
            gap:20px;
            align-items:center;
        }
    }

    .list_part{
        margin-top:55px;
    }

    .pagination{
        margin-top:35px;
        display:flex;
        justify-content:end;
    }

    .card{
        height: fit-content;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 15px;
        padding: 25px 55px;

        .details-wrap{
            display: flex;
            align-items: center;
            height: 100%;
        }

        .back-button{
            display:flex;
            justify-content:end;
            margin-top:25px;
        }

        .left{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
            width:30%;
            .e-name{
                font-size: 35px;
                text-transform: capitalize;
                font-weight: 600;
                letter-spacing: 1px;
                color:#1976d2;  
                margin-bottom:15px; 
            }
            .name{
                font-size: 18px;
                text-transform: capitalize;
                font-weight: 600;
                letter-spacing: 1px;
                color:#1976d266;  
                margin-bottom:15px; 
            }

            .MuiAvatar-root{
                font-size: 45px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
        }

        .right{
            width:70%;

            .right-divs{
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items:center;
                .child{
                    width:48%;
                }
            }

            .text{
                font-size: 18px;
                color: #000000cc;
                margin-bottom:10px;

                span{
                    color: #000000a6;
                }
            }
        }
       
    }

    @media(max-width:999px){
        width:95%;

        .header_part{
            flex-direction:column;
            gap:30px;

            h1{
                text-align: start;
                width: 100%;
            }

            .head-right{
                width: 100%;
                justify-content: space-between;
            }

        }
        .list_part{
            margin-top:25px;
        }
    }

    @media(max-width:599px){
        width:100%;
        .header_part{
            .head-right{
                width: 100%;
                justify-content: space-between;
                flex-direction:column-reverse;

                button{
                    width:100%;
                }

                .MuiFormControl-root ,
                .MuiInputBase-root{
                    width:100%;
                }
            }

        }
    }
`