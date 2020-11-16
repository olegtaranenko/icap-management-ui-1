import { stub, SinonStub } from "sinon";
import winston from "winston";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";

import PolicyManagementService from "./PolicyManagementService";

import policyExample from "../../../common/http/PolicyManagementApi/policyExample.json";

let getPolicyStub: SinonStub;
let getCurrentPolicyStub: SinonStub;

describe("PolicyManagementService", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const logger = winston.createLogger();

            // Act
            const policyManagementService = new PolicyManagementService(logger);

            // Assert
            expect(policyManagementService.logger).toEqual(logger);
        });
    });

    describe("getPolicy", () => {
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });

        const responseString = policyExample;

        const expectedResponse = new Policy(
            responseString.id,
            responseString.policyType,
            responseString.published,
            responseString.lastEdited,
            responseString.created,
            responseString.ncfsPolicy,
            responseString.adaptionPolicy,
            responseString.updatedBy
        );

        beforeEach(() => {
            getPolicyStub = stub(PolicyManagementApi, "getPolicyById")
                .resolves(JSON.stringify(responseString));
        });

        afterEach(() => {
            getPolicyStub.restore();
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
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });

        const responseString = policyExample;

        const expectedResponse = new Policy(
            responseString.id,
            responseString.policyType,
            responseString.published,
            responseString.lastEdited,
            responseString.created,
            responseString.ncfsPolicy,
            responseString.adaptionPolicy,
            responseString.updatedBy
        );

        beforeEach(() => {
            getCurrentPolicyStub = stub(PolicyManagementApi, "getPolicy")
                .resolves(JSON.stringify(responseString));
        });

        afterEach(() => {
            getCurrentPolicyStub.restore();
        });

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
})