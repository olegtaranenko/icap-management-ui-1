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
import MainTitle from "../../hoc/MainTitle/MainTitle";
import Main from "../../hoc/Main/Main";

const Users = () => {
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
        <>
            <MainTitle title="User Management" />

            <Main>
                <section className={classes.Users}>
                    <h2 className={classes.head}>Users</h2>
                    <div className={classes.block}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Activated</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {status === "LOADING" &&
                                        <TableRow className={classes.emptyTableRow}>
                                            <TableCell colSpan={6} className={classes.emptyTableCell}>
                                                <h2>Loading...</h2>
                                            </TableCell>
                                        </TableRow>
                                    }

                                    {status === "ERROR" &&
                                        <TableRow className={classes.emptyTableRow}>
                                            <TableCell colSpan={6} className={classes.emptyTableCell}>
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
                </section>
            </Main>
        </>
    );
}

export default Users;