import PolicyManagementApi from "./PolicyManagementApi";
import { stub, SinonStub } from "sinon";
import fetch = require("node-fetch");
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import policyExample from "./policyExample.json";
import axios, { CancelToken } from "axios";

let fetchStub: SinonStub;
let fetchStubResult: any

let axiosStub: SinonStub;
let axiosStubResult: any;

const expectAxiosPost = (stubbedAxios: SinonStub, expectedUrl: string, data: any) => {
    expect(stubbedAxios.getCalls()).toHaveLength(1);
    expect(stubbedAxios.getCall(0).args).toHaveLength(3);
    expect(stubbedAxios.getCall(0).args[0]).toEqual(expectedUrl);
    expect(stubbedAxios.getCall(0).args[1]).toEqual(data);
};

const expectAxiosGet = (stubbedAxios: SinonStub, expectedUrl: string) => {
    expect(stubbedAxios.getCalls()).toHaveLength(1);
    expect(stubbedAxios.getCall(0).args).toHaveLength(2);
    expect(stubbedAxios.getCall(0).args[0]).toEqual(expectedUrl);
};

const expectFetch = (stubbedFetch: SinonStub,
    expectedUrl: string,
    method: "GET" | "POST" | "PUT" | "DELETE") => {
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
            let error: any;
            const expectedError = new Error("Error");

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
                expect(error).toEqual(expectedError);
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
            let cancellationToken: CancelToken;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    status: 500,
                    statusText: "Error"
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicy(url, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_axios_using_GET", () => {
                expectAxiosGet(
                    axiosStub, url);
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const expectedResponse = { test: "test" };
            let cancellationToken: CancelToken;
            let result: Policy;

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: { test: "test" }
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                result = await PolicyManagementApi.getPolicy(url, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_axios_using_GET", () => {
                expectAxiosGet(axiosStub, url);
            });
        });
    });

    describe("saveDraftPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            let error: any;
            const expectedError = new Error("Error");

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

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.saveDraftPolicy(url, draftPolicy);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_PUT", () => {
                expectFetch(fetchStub, url, "PUT");
            });
        });
    });

    describe("publishPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.publishPolicy(url, policyId);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_PUT", () => {
                expectFetch(fetchStub, expectedRequestUrl, "PUT");
            });
        });
    });

    describe("distributeAdaptationPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.distributeAdaptationPolicy(url);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_PUT", () => {
                expectFetch(fetchStub, url, "PUT");
            });
        });
    });

    describe("distributeNcfsPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.distributeNcfsPolicy(url);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_PUT", () => {
                expectFetch(fetchStub, url, "PUT");
            });
        });
    });

    describe("deleteDraftPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.deleteDraftPolicy(url, policyId);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_DELETE", () => {
                expectFetch(fetchStub, expectedRequestUrl, "DELETE");
            });
        });
    });

    describe("getPolicyHistory", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            let cancellationToken: CancelToken;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                fetchStubResult = {
                    ok: false,
                    statusText: "Error"
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicyHistory(url, cancellationToken);
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
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_GET", () => {
                expectFetch(fetchStub, url, "GET");
            });
        });
    });
});