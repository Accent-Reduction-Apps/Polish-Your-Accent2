import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/AdmView.css';
import authHeader from '../../security/auth/auth-header';
import AdmnService from './AdmnService';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const headers = authHeader();
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
        <div className="bg-warning p-3">
            <table className="user-table">
                <thead>
                <tr>
                    <th className="user-table-header"></th>
                    <th className="user-table-header">
                        <span> USERS</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.map((item) => (
                    <tr key={item.id}>
                        <td className="user-table-cell">{item.id}</td>
                        <td>{item.username}</td>
                        <td></td>
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
                        <td> -testing-</td>
                        <td>
                            <Button
                                variant="danger"
                                onClick={() => handleToggleUser(item.id, item.enabled)}
                            >
                                DISABLE
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="success"
                                onClick={() => handleToggleUser(item.id, item.enabled)}
                            >
                                ENABLE!
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
