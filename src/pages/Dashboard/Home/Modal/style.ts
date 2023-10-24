import styled from "@emotion/styled";
import { Dialog, DialogContent } from "@mui/material";

export const StyleModalBody = styled(DialogContent)`
    width:500px;

    .form-field{
        margin-bottom:25px;
    }

    @media(max-width:767px){
         width:fit-content;
    }
`