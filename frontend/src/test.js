import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from './slice/user';

function Test() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    console.log(user)
    return (
        <div>
            { user === null ?<h1 style={{ color: 'white' }}>Nonevhvhkvhkhvhvhkvhvvkhvhk</h1>
            : <ul style={{ color: 'white' }}>
                <li>{user.cin_personnel}</li>
                <li>{user.full_name}</li>
                <li>{user.date_of_birth}</li>
                <li>{user.personnel_type}</li>
                <li>{user.service}</li>
                <li>{user.phone_number}</li>
                <li>{user.email}</li>
                <li>{user.password}</li>
            </ul>
        }
            <button onClick={() => dispatch(deleteUser())} style={{ color: 'black', width: '200px', height: '200px' }}>delelte</button>
        </div>
    )
}

export default Test