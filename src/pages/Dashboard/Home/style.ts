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