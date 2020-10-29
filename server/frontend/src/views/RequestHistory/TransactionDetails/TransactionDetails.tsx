import React, { useEffect, useState } from "react";
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
    analysisReport: any
}

const TransactionDetails = (props: TransactionDetailsProps) => {
    const [blockExpanded, setBlockExpanded] = useState({
        issue: false,
        sanitisation: false,
        remedy: false,
        policyDetails: false,
    });
    const [issueItems, setIssueItems] = useState([]);
    const [remedyItems, setRemedyItems] = useState([]);
    const [sanitisationItems, setSanitisationItems] = useState([]);

    const clsBlockExpandend = [classes.block];

    useEffect(() => {
        props.analysisReport.documentStatistics.contentGroups.contentGroup.forEach((content: any) => {
            if (content.issueItems.itemCount > 0) {
                if (content.issueItems.issueItem.length > 1) {
                    const reduce = content.issueItems.issueItem.map((i: any) => {
                        return {
                            issueItem: i,
                            itemCount: 1
                        }
                    });

                    setIssueItems((prev: any) => [...prev, ...reduce]);
                }

                else {
                    setIssueItems((prev: any) => [...prev, content.issueItems]);
                }
            }

            if (content.remedyItems.itemCount > 0) {
                if (content.remedyItems.remedyItem.length > 1) {
                    const reduce = content.remedyItems.remedyItem.map((i: any) => {
                        return {
                            remedyItem: i,
                            itemCount: 1
                        }
                    });

                    setRemedyItems((prev: any) => [...prev, ...reduce]);
                }

                else {
                    setRemedyItems((prev: any) => [...prev, content.remedyItems]);
                }
            }

            if (content.sanitisationItems.itemCount > 0) {
                if (content.sanitisationItems.sanitisationItem.length > 1) {
                    const reduce = content.sanitisationItems.sanitisationItem.map((i: any) => {
                        return {
                            sanitisationItem: i,
                            itemCount: 1
                        }
                    });

                    setSanitisationItems((prev: any) => [...prev, ...reduce]);
                }
                else {
                    setSanitisationItems((prev: any) => [...prev, content.sanitisationItems]);
                }
            }
        })
    }, [props]);

    return (
        <>
            {issueItems.length > 0 &&
                <div className={clsBlockExpandend.join(" ")}>
                    Issue Items
                    {!blockExpanded.issue && (
                        <Badge value={issueItems.length.toString()} externalStyles={classes.badge} />
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
                                {issueItems.map(issue => {
                                    return (
                                        <TableRow key={issue.issueItem.issueId}>
                                            <TableCell>{issue.issueItem.issueId}</TableCell>
                                            <TableCell>{issue.issueItem.technicalDescription}</TableCell>
                                            <TableCell>{issue.issueItem.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }

            {remedyItems.length > 0 &&
                <div className={classes.block}>
                    Remedy Items
                    {!blockExpanded.remedy && (
                        <Badge value={remedyItems.length.toString()} externalStyles={classes.badge} />
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
                                    <TableCell>Description</TableCell>
                                    <TableCell>Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {remedyItems.map((remedy: any) => {
                                    return (
                                        <TableRow key={remedy.remedyItem.technicalDescription}>
                                            <TableCell>{remedy.remedyItem.technicalDescription}</TableCell>
                                            <TableCell>{remedy.remedyItem.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }

            {sanitisationItems.length > 0 &&
                <div className={classes.block}>
                    Sanitisation Items
                    {!blockExpanded.sanitisation && (
                        <Badge value={sanitisationItems.length.toString()} externalStyles={classes.badge} />
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
                                {sanitisationItems.map((sanitisation: any) => {
                                    return (
                                        <TableRow key={sanitisation.sanitisationItem.sanitisationId}>
                                            <TableCell>{sanitisation.sanitisationItem.sanitisationId}</TableCell>
                                            <TableCell>{sanitisation.sanitisationItem.technicalDescription}</TableCell>
                                            <TableCell>{sanitisation.sanitisationItem.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }
        </>

    )
}

export default TransactionDetails;