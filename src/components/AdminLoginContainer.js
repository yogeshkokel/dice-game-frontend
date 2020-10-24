import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { adminLogin } from '../store/users/userActions';

function AdminLoginContainer(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(state => state.user);
    const history = useHistory();
    if (user && user.user_data) {
        window.localStorage.setItem('JWT_TOKEN', user.user_data)
        history.push('/user-list');
    }
    const dispatch = useDispatch();

    const onLogin = (e) => {
        e.preventDefault();
        let payload = {
            username: username,
            password: password,
        }
        dispatch(adminLogin(payload));
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
                <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="Admin User name.." />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Admin Password.." />

                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default AdminLoginContainer;