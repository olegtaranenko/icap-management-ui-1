import TransactionEventApi from "./TransactionEventApi";
import { stub, SinonStub } from "sinon";
import fetch = require("node-fetch");

let fetchStub: SinonStub;
let fetchStubResult: any;

describe("TransactionEventApi", () => {
    describe("getTransactions", () => {
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
                    await TransactionEventApi.getTransactions(url, {});
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

            it("called_fetch_using_POST", () => {
                expect(fetchStub.getCalls()).toHaveLength(1);
                expect(fetchStub.getCall(0).args).toHaveLength(2);
                expect(fetchStub.getCall(0).args[0]).toEqual(url);
                expect(fetchStub.getCall(0).args[1].method).toEqual("POST");
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const url = "www.glasswall.com";
            const expectedResponse = ["test"];
            let result: string;

            beforeEach(async () => {
                fetchStubResult = {
                    ok: true,
                    text: () => expectedResponse
                };

                fetchStub = stub(fetch, "default").returns(fetchStubResult);
                // Act
                result = await TransactionEventApi.getTransactions(url, {});
            });

            afterEach(() => {
                fetchStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_fetch_using_POST", () => {
                expect(fetchStub.getCalls()).toHaveLength(1);
                expect(fetchStub.getCall(0).args).toHaveLength(2);
                expect(fetchStub.getCall(0).args[0]).toEqual(url);
                expect(fetchStub.getCall(0).args[1].method).toEqual("POST");
            });
        });
    });
});