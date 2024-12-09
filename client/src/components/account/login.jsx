import { useContext, useState } from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

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

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {
    const imageURL = '/PlacementBuddyLogo.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (event) => {
        setSignup({...signup, [event.target.name]: event.target.value});
    }

    const signupUser = async() => {
        let response = await API.userSignup(signup);
        console.log('response', response);
        if(response.isSuccess){
            setError('')
            setSignup(signupInitialValues)
            toggleAccount('login')
        }else {
            setError('Something went wrong, Please try again later');
        }
    }

    const onValueChange = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value})
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        console.log('response of loginUser', response)
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username: response.data.username, name: response.data.name });
            isUserAuthenticated(true);
            navigate('/');
        }else {
            setError('Something went wrong, Please try again later');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt='login'/>
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Enter Username" value={login.username} onChange={(event) => onValueChange(event)} name="username" variant="standard"/>
                            <TextField label="Enter Password" value={login.password} onChange={(event) => onValueChange(event)} name="password" variant="standard"/>
                            { error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <SignUpButton onClick={() => toggleSignup()}>Create an Account</SignUpButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField label="Enter Name" onChange={(event) => onInputChange(event)} name='name' variant="standard"/>
                            <TextField label="Enter Username" onChange={(event) => onInputChange(event)} name= 'username' variant="standard"/>
                            <TextField label="Enter Password" onChange={(event) => onInputChange(event)} name= 'password' variant="standard"/>
                            { error && <Error>{error}</Error>}
                            <SignUpButton onClick={() => signupUser()}>SignUp</SignUpButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <LoginButton onClick={() => toggleSignup()} variant="contained">Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;