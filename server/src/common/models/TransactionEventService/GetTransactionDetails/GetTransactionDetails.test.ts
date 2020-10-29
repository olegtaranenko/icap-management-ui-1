import { FileDetailsStatus } from "../../../../../frontend/src/enums/FileDetailsStatus";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "./index";

describe("GetTransactionDetails", () => {
    describe("GetTransactionDetailsRequest", () => {
        describe("constructor", () => {
            it("should_construct_with_valid_arguments", () => {
                // Arrange
                const url = "www.someurl.com";
                const transactionFileDirectory = "/test";

                // Act
                const getTransactionDetailsRequest = new GetTransactionDetailsRequest(
                    url,
                    transactionFileDirectory
                );

                // Assert
                expect(getTransactionDetailsRequest.transactionFileDirectory)
                    .toEqual(transactionFileDirectory);
            });

            it("throws_ArgumentNullException_if_url_is_empty", () => {
                // Arrange
                const url = "";
                const transactionFileDirectory = "/test";

                try {
                    // Act
                    const getTransactionsRequest = new GetTransactionDetailsRequest(
                        url,
                        transactionFileDirectory
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                        .toEqual("Argument is invalid: 'url'. Argument 'url' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_transactionFileDirectory_is_empty", () => {
                // Arrange
                const url = "www.someurl.com";
                const transactionFileDirectory = "";

                try {
                    // Act
                    const getTransactionsRequest = new GetTransactionDetailsRequest(
                        url,
                        transactionFileDirectory
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                        .toEqual("Argument is invalid: 'transactionFileDirectory'. Argument 'transactionFileDirectory' must not be null");
                }
            });
        });
    });

    describe("GetTransactionDetailsResponse", () => {
        describe("constructor", () => {
            it("should_construct_with_valid_arguments", () => {
                // Arrange
                const status = FileDetailsStatus.Success;

                // Act
                const getTransactionDetailsResponse = new GetTransactionDetailsResponse(
                    status,
                    ""
                );

                // Assert
                expect(getTransactionDetailsResponse.status).toEqual(status);
            });
        });
    });
});