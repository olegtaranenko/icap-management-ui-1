import { stub, SinonStub } from "sinon";
import winston from "winston";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";

import PolicyManagementService from "./PolicyManagementService";

import policyExample from "../../../common/http/PolicyManagementApi/policyExample.json";

let getPolicyByIdStub: SinonStub;
let getPolicyStub: SinonStub;
let saveDraftPolicyStub: SinonStub;

const setupGetPolicyTest = () => {
    const responseString = policyExample;

    beforeEach(() => {
        getPolicyStub = stub(PolicyManagementApi, "getPolicy")
            .resolves(JSON.stringify(responseString));
    });

    afterEach(() => {
        getPolicyStub.restore();
    });
};

const expectedResponse = new Policy(
    policyExample.id,
    policyExample.policyType,
    policyExample.published,
    policyExample.lastEdited,
    policyExample.created,
    policyExample.ncfsPolicy,
    policyExample.adaptionPolicy,
    policyExample.updatedBy
);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.cli()
        })
    ]
});

describe("PolicyManagementService", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Act
            const policyManagementService = new PolicyManagementService(logger);

            // Assert
            expect(policyManagementService.logger).toEqual(logger);
        });
    });

    describe("getPolicy", () => {
        const responseString = policyExample;

        beforeEach(() => {
            getPolicyByIdStub = stub(PolicyManagementApi, "getPolicyById")
                .resolves(JSON.stringify(responseString));
        });

        afterEach(() => {
            getPolicyByIdStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const request = new GetPolicyByIdRequest("www.glasswall.com", Guid.create());

            // Act
            const result = await policyManagementService.getPolicy(request);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

    describe("getCurrentPolicy", () => {
        setupGetPolicyTest();

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const getCurrentPolicyUrl = "www.glasswall.com";

            // Act
            const result = await policyManagementService.getCurrentPolicy(getCurrentPolicyUrl);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

    describe("getDraftPolicy", () => {
        setupGetPolicyTest();

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const getDraftPolicyUrl = "www.glasswall.com";

            // Act
            const result = await policyManagementService.getDraftPolicy(getDraftPolicyUrl);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

    // TODO: Finish saveDraftPolicy test
    // describe("saveDraftPolicy", () => {
    //     const responseString = "OK";

    //     beforeEach(() => {
    //         saveDraftPolicyStub = stub(PolicyManagementApi, "saveDraftPolicy")
    //             .resolves();
    //     });

    //     afterEach(() => {
    //         saveDraftPolicyStub.restore();
    //     });
    // });

    // TODO: Add test for publish draft
});