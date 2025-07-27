import React, { useContext } from 'react';
import UserContext from '../components/UserContext';

const UserDetails = () => {
    const userData = useContext(UserContext);

    return (
        <div>
            <h2>User Details</h2>
            {userData ? (
                <>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                </>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default UserDetails;