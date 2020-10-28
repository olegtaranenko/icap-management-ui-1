import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import Checkbox from "../../../components/UI/Checkbox/Checkbox";
import Badge from "../../../components/UI/Badge/Badge";

import classes from "../FileInfo/FileInfo.module.scss";

export interface TransactionDetailsProps {
    analysisReport: string
}

const TransactionDetails = (props: TransactionDetailsProps) => {
    const [blockExpanded, setBlockExpanded] = useState({
        issue: false,
        sanitisation: false,
        remedy: false,
        policyDetails: false,
    });

    const clsBlockExpandend = [classes.block];

    return (
        <>
            <div className={clsBlockExpandend.join(" ")}>
                <h3>Issue Items</h3>
                {!blockExpanded.issue && (
                    <Badge value="1" externalStyles={classes.badge} />
                )}
                <div className={classes.wrapArrow}>
                    <Checkbox
                        id="span-issue"
                        onHandleChange={() =>
                            setBlockExpanded((prevState) => ({
                                ...prevState,
                                issue: !prevState.issue,
                            }))
                        }
                        checkboxIcon={<span className={classes.arrow} />}
                        checkedIcon={
                            <span className={[classes.arrow, classes.rotate].join(" ")} />
                        }
                    />
                </div>
                {blockExpanded.issue && (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>0x05cf00ec</TableCell>
                                <TableCell>Metadata detected in Created</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className={classes.block}>
                <h3>Sanitisation Items</h3>
                {!blockExpanded.sanitisation && (
                    <Badge value="8" externalStyles={classes.badge} />
                )}
                <div className={classes.wrapArrow}>
                    <Checkbox
                        id="span-sanitisation"
                        onHandleChange={() =>
                            setBlockExpanded((prevState) => ({
                                ...prevState,
                                sanitisation: !prevState.sanitisation,
                            }))
                        }
                        checkboxIcon={<span className={classes.arrow} />}
                        checkedIcon={
                            <span className={[classes.arrow, classes.rotate].join(" ")} />
                        }
                    />
                </div>
                {blockExpanded.sanitisation && (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>0x05cf00ec</TableCell>
                                <TableCell>Metadata detected in Created</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className={classes.block}>
                <h3>Remedy Items</h3>
                {!blockExpanded.remedy && (
                    <Badge value="3" externalStyles={classes.badge} />
                )}
                <div className={classes.wrapArrow}>
                    <Checkbox
                        id="span-remedy"
                        onHandleChange={() =>
                            setBlockExpanded((prevState) => ({
                                ...prevState,
                                remedy: !prevState.remedy,
                            }))
                        }
                        checkboxIcon={<span className={classes.arrow} />}
                        checkedIcon={
                            <span className={[classes.arrow, classes.rotate].join(" ")} />
                        }
                    />
                </div>
                {blockExpanded.remedy && (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>0x05cf00ec</TableCell>
                                <TableCell>Metadata detected in Created</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className={classes.block}>
                <div className={classes.wrapArrow}>
                    <Checkbox
                        id="span-details"
                        onHandleChange={() =>
                            setBlockExpanded((prevState) => ({
                                ...prevState,
                                policyDetails: !prevState.policyDetails,
                            }))
                        }
                        checkboxIcon={<span className={classes.arrow} />}
                        checkedIcon={
                            <span className={[classes.arrow, classes.rotate].join(" ")} />
                        }
                    />
                </div>
                <h3>Content Management Policy Details</h3>
                {!blockExpanded.policyDetails && false && (
                    <Badge value="3" externalStyles={classes.badge} />
                )}
                {blockExpanded.policyDetails && (
                    <Table className={classes.table}>
                        {/*<TableHead>
									<TableRow>
										<TableCell>Issue</TableCell>
										<TableCell>Description</TableCell>
										<TableCell>Count</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>0x05cf00ec</TableCell>
										<TableCell>Metadata detected in Created</TableCell>
										<TableCell>1</TableCell>
									</TableRow>
								</TableBody>*/}
                    </Table>
                )}
            </div>
        </>

    )
}

export default TransactionDetails;