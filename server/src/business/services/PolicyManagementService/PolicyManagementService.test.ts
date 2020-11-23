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

    describe("saveDraftPolicy", () => {
        let saveDraftPolicyStub: SinonStub;

        const saveDraftPolicyUrl = "www.glasswall.com";
        const draftPolicy = new Policy(
            policyExample.id,
            policyExample.policyType,
            policyExample.published,
            policyExample.lastEdited,
            policyExample.created,
            policyExample.ncfsPolicy,
            policyExample.adaptionPolicy,
            policyExample.updatedBy
        );
        const expectedHeaders = { "Content-Type": "application/json" };

        beforeEach(() => {
            saveDraftPolicyStub = stub(PolicyManagementApi, "saveDraftPolicy")
                .resolves();
        });

        afterEach(() => {
            saveDraftPolicyStub.restore();
        });

        it("called_PolicyManagementApi_saveDraftPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "saveDraftPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.saveDraftPolicy(
                saveDraftPolicyUrl, draftPolicy);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(saveDraftPolicyUrl, draftPolicy, expectedHeaders);
        });
    });

    describe("publishPolicy", () => {
        let publishPolicyStub: SinonStub;
        let distributeAdaptationPolicyStub: SinonStub;
        let distributeNcfsPolicyStub: SinonStub;

        const publishPolicyUrl = "www.glasswall.com";
        const distributeAdaptationPolicyUrl = "www.glasswall.com/adaptation";
        const distributeNcfsPolicyUrl = "www.glasswall.com/ncfs";
        const policyId = Guid.create();
        const expectedHeaders = { "Content-Type": "application/json" };

        publishPolicyStub = stub(PolicyManagementApi, "publishPolicy")
            .resolves();
        distributeAdaptationPolicyStub = stub(PolicyManagementApi, "distributeAdaptationPolicy")
            .resolves();
        distributeNcfsPolicyStub = stub(PolicyManagementApi, "distributeNcfsPolicy")
            .resolves();

        it("called_PolicyManagementApi_publishPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "publishPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(publishPolicyUrl, policyId, expectedHeaders);
        });

        it("called_PolicyManagementApi_distributeAdaptationPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "distributeAdaptationPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(distributeAdaptationPolicyUrl, expectedHeaders);
        });

        it("called_PolicyManagementApi_distributeNcfsPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "distributeNcfsPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(distributeNcfsPolicyUrl, expectedHeaders);
        });
    });

    describe("deleteDraftPolicy", () => {
        let deleteDraftPolicyStub: SinonStub;

        const deleteDraftPolicyUrl = "www.glasswall.com";
        const policyId = Guid.create();
        const expectedHeaders = { "Content-Type": "application/json" };

        beforeEach(() => {
            deleteDraftPolicyStub = stub(PolicyManagementApi, "deleteDraftPolicy")
                .resolves();
        });

        afterEach(() => {
            deleteDraftPolicyStub.restore();
        });

        it("called_PolicyManagementApi_deleteDraftPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "deleteDraftPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.deleteDraftPolicy(
                deleteDraftPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(deleteDraftPolicyUrl, policyId, expectedHeaders);
        });
    });
});