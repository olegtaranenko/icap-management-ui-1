import classes from "*.module.css";
import React, { useContext, useEffect, useState } from "react";
import { PolicyContext } from "../../../context/policy/policy-context";

const DraftPolicy = () => {
    const {
        draftPolicy
    } = useContext(PolicyContext);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Adaption Policy");

    const tabs = [
        { testId: "buttonCurrentAdaptionPolicyTab", name: "Adaption Policy" },
        { testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
    ];

    useEffect(() => {
        if (draftPolicy !== null) {
            setIsLoading(false);
        }
    }, [draftPolicy]);

    return (
        <div className={classes.Draft}>
            {isLoading &&
                <div>Loading...</div>
            }

            {!isLoading &&
                <>
                    <div className={classes.header}></div>
                </>
            }
        </div>
    )
}