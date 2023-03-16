import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/AdmView.css';
import authHeader from '../../security/auth/auth-header';
import AdmnService from './AdmnService';
import {Link} from "react-router-dom";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const headers = authHeader();
                const response = await fetch('http://localhost:8080/users', {headers});
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleUser = async (userId, enabled) => {
        try {
            if (enabled) {
                await AdmnService.deactivate(userId);
            } else {
                await AdmnService.activate(userId);
            }
            setUsers((prevUsers) => {
                const newUsers = prevUsers.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            enabled: !enabled,
                        };
                    } else {
                        return user;
                    }
                });
                return newUsers;
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred: {error}</p>;
    }

    return (
        <>
            <div className='button-container'><h3>MANAGE ACCESS</h3></div>
        <div className="centered-container">
            <div className="bg-warning p-3">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th className="user-table-header"></th>
                        <th className="user-table-header">
                            <span> USER</span>
                        </th>
                        <th className="user-table-header">
                            <span> EMAIL</span>
                        </th>
                        <th className="user-table-header">
                            <span> STATUS</span>
                        </th>
                        <th className="user-table-header">
                            <span> SWITCH</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td className="user-table-cell">{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td className="user-table-cell">
                                {item.enabled ? (
                                    <>is already activated</>
                                ) : (
                                    <>is not yet active</>
                                )}
                            </td>
                            <td className="user-table-cell">
                                {item.enabled ? (
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleToggleUser(item.id, item.enabled)
                                        }
                                    >
                                        DISABLE
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            handleToggleUser(item.id, item.enabled)
                                        }
                                    >
                                        ENABLE!
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
            <div className="button-container">
            <Link to="/my-account">
                <Button className='form-button3' variant='secondary' size='lg'>
                    back to My account
                </Button>
            </Link>
            </div>
        </>
    );

};

export default Admin;
