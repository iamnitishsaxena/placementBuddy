import { useState } from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const Login = () => {
    const imageURL = '/PlacementBuddyLogo.png';

    const [account, toggleAccount] = useState('login');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt='login'/>
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Enter Username" variant="standard"/>
                            <TextField label="Enter Password" variant="standard"/>
                            <LoginButton variant="contained">Login</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <SignUpButton onClick={() => toggleSignup()}>Create an Account</SignUpButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField label="Enter Name" variant="standard"/>
                            <TextField label="Enter Username" variant="standard"/>
                            <TextField label="Enter Password" variant="standard"/>
                            <SignUpButton>SignUp</SignUpButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <LoginButton onClick={() => toggleSignup()} variant="contained">Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;