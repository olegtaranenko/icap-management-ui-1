import PolicyManagementApi from "./PolicyManagementApi";
import { stub, SinonStub } from "sinon";
import fetch = require("node-fetch");
import { Guid } from "guid-typescript";

let fetchStub: SinonStub;
let fetchStubResult: any

const expectFetch = (stubbedFetch: SinonStub,
    expectedUrl: string,
    method: "GET" | "POST") => {
        expect(stubbedFetch.getCalls()).toHaveLength(1);
        expect(stubbedFetch.getCall(0).args).toHaveLength(2);
        expect(stubbedFetch.getCall(0).args[0]).toEqual(expectedUrl);
        expect(stubbedFetch.getCall(0).args[1].method).toEqual(method);
};

describe("PolicyManagementApi", () => {
    describe("getPolicyById", () => {
        describe("response_status_not_ok", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            let error: any;

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicyById(url, policyId);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                fetchStub.restore();
            });

            // Assert
            it("response_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual("Error");
            });

            it("called_fetch_using_GET", () => {
                expectFetch(fetchStub, expectedRequestUrl, "GET");
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            const expectedResponse = { test: "test" };
            let result: string;

            beforeEach(async () => {
                fetchStubResult = {
                    ok: true,
                    text: () => { return { test: "test" } }
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                result = await PolicyManagementApi.getPolicyById(url, policyId);
            });

            afterEach(() => {
                fetchStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_fetch_using_GET", () => {
                expectFetch(fetchStub, expectedRequestUrl, "GET");
            });
        });
    });

    describe("getPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            let error: any;

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicy(url);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                fetchStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual("Error");
            });

            it("called_fetch_using_GET", () => {
                expectFetch(fetchStub, url, "GET");
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const expectedResponse = { test: "test" };
            let result: string;

            beforeEach(async () => {
                fetchStubResult = {
                    ok: true,
                    text: () => { return { test: "test" } }
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                result = await PolicyManagementApi.getPolicy(url);
            });

            afterEach(() => {
                fetchStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_fetch_using_GET", () => {
                expectFetch(fetchStub, url, "GET");
            });
        });
    });
});