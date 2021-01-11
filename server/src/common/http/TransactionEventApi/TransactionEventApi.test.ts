import { stub, SinonStub } from "sinon";
import axios, { CancelToken } from "axios";

import TransactionEventApi, { File } from "./TransactionEventApi";

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

describe("TransactionEventApi", () => {
    describe("getTransactions", () => {
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

                axiosStub = stub(axios, "post").returns(axiosStubResult);

                // Act
                try {
                    await TransactionEventApi.getTransactions(url, {}, cancellationToken);
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
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const expectedResponse = ["test"];
            let cancellationToken: CancelToken;
            let result: { count: number, files: File[] };

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: ["test"]
                };

                axiosStub = stub(axios, "post").returns(axiosStubResult);
                // Act
                result = await TransactionEventApi.getTransactions(url, {}, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_axios_using_POST", () => {
                expectAxiosPost(axiosStub, url, JSON.stringify({}));
            });
        });
    });

    describe("getTransactionDetails", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const transactionFilePath = "/test";
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
                    await TransactionEventApi.getTransactionDetails(url, transactionFilePath, cancellationToken);
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
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const transactionFilePath = "/test";
            const expectedRequestUrl = `${url}?filePath=${transactionFilePath}`;
            const expectedResponse = ["test"];
            let cancellationToken: CancelToken;
            let result: {status: number, analysisReport: string};

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: ["test"]
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                result = await TransactionEventApi.getTransactionDetails(url, transactionFilePath, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_fetch_using_GET", () => {
                expectAxiosGet(axiosStub, expectedRequestUrl);
            });
        });
    });
});