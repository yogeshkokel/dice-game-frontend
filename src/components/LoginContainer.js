import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../store/users/userActions';

function LoginContainer(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const user = useSelector(state => state.user);
    const history = useHistory();
    if (user && user.user_data) {
        window.localStorage.setItem('JWT_TOKEN', user.user_data)
        history.push('/dice');
    }
    const dispatch = useDispatch();

    const onLogin = (e) => {
        e.preventDefault();
        let payload = {
            username: username,
            password: password,
            nickname: nickname
        }
        dispatch(login(payload));
    }
    return (
        <div class="login">
            {
                user && user.error
                    ? <div class="alert">
                        <strong>Error!</strong> {user.error}
                    </div>
                    : null
            }
            <form onSubmit={(e) => onLogin(e)}>
                <label htmlFor="username">User Name</label>
                <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="User name.." />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password.." />

                <label htmlFor="nickname">Nick Name</label>
                <input type="text" id="nickname" name="nickname" onChange={(e) => { setNickname(e.target.value) }} placeholder="Nick Name.." />

                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default LoginContainer;