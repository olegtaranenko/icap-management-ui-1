import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

// import UsersIconSelected from "../../assets/users-icon-selected.svg";
import UserRow from "./UserRow/UserRow";
// import UsersIcon from "../../assets/users-icon.svg";

import { UserContext } from "../../context/user/UserContext";
// import User from "../../../../src/common/models/IdentityManagementService/User/User";

import classes from "./Users.module.scss";

const Users = () => {
    // const { users, setUser, saveChanges, cancelChanges } = useContext(UserContext);
    const { status, users, getUsers } = useContext(UserContext);
    const cancellationTokenSource = axios.CancelToken.source();

    useEffect(() => {
        const getUsersAsync = async () => {
            await getUsers(cancellationTokenSource.token);
        }

        getUsersAsync();

        return () => {
            if (status === "LOADING") {
                cancellationTokenSource.cancel();
            }
        }

        // eslint-disable-next-line
    }, []);

    return (
        <section className={classes.Users}>
            <div className={classes.wrap}>
                <h2 className={classes.head}>Users</h2>
                <div className={classes.block}>
                    {status === "LOADING" &&
                        <div>Loading...</div>
                    }

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>User Group</TableCell>
                                <TableCell>Confirmed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <>
                                {status === "ERROR" &&
                                    <TableRow className={classes.emptyTableRow}>
                                        <TableCell colSpan={4} className={classes.emptyTableCell}>
                                            <h2>Error Getting Users</h2>
                                        </TableCell>
                                    </TableRow>
                                }

                                {status === "LOADED" &&
                                    <>
                                        {users.map((user) => {
                                            return (<UserRow key={user.id} user={user} />);
                                        })}
                                    </>
                                }
                            </>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}

export default Users;