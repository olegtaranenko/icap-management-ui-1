import { Guid } from "guid-typescript";
import { FileType } from "../../../../../frontend/src/enums/FileType";
import { Risk } from "../../../../../frontend/src/enums/Risk";
import { GetTransactionsRequest, GetTransactionsResponse } from "./index";

describe("GetTransactions", () => {
    describe("GetTransactionsRequest", () => {
        describe("constructor", () => {
            it("should_construct_with_valid_arguments", () => {
                // Arrange
                const url = "www.someurl.com";
                const filter = {
                    Filter: {
                        TimestampRangeStart: new Date(),
                        TimestampRangeEnd: new Date()
                    }
                };

                // Act
                const getTransactionsRequest = new GetTransactionsRequest(
                    url,
                    filter
                );

                // Assert
                expect(getTransactionsRequest.url).toEqual(url);
            });

            it("throws_ArgumentNullException_if_url_is_empty", () => {
                // Arrange
                const url = "";
                const filter = {
                    Filter: {
                        TimestampRangeStart: new Date(),
                        TimestampRangeEnd: new Date()
                    }
                };

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsRequest(
                        url,
                        filter
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                        .toEqual("Argument is invalid: 'url'. Argument 'url' must not be null");
                }
            });
        });
    });

    describe("GetTransactionsResponse", () => {
        describe("constructor", () => {
            it("should_construct_with_valid_arguments", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: Guid.create(),
                        detectionFileType: FileType.Bmp,
                        risk: Risk.Safe,
                        activePolicyId: Guid.create(),
                        directory: "/some/directory"
                    }
                ];

                // Act
                const getTransactionsResponse = new GetTransactionsResponse(
                    count,
                    files
                );

                // Assert
                expect(getTransactionsResponse.count).toEqual(count);
            });

            it("throws_ArgumentNullException_if_empty_timestamp_found_in_files", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: "",
                        fileId: Guid.create(),
                        detectionFileType: FileType.Bmp,
                        risk: Risk.Safe,
                        activePolicyId: Guid.create(),
                        directory: "/some/directory"
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.timestamp'. Argument 'file.timestamp' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_empty_fileId_found_in_files", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: "",
                        detectionFileType: FileType.Bmp,
                        risk: Risk.Safe,
                        activePolicyId: Guid.create(),
                        directory: "/some/directory"
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.fileId'. Argument 'file.fileId' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_empty_detectionFileType_found_in_files", () => {
                // Arrange
                const detectionFileType: number = null;
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: Guid.create(),
                        detectionFileType,
                        risk: Risk.Safe,
                        activePolicyId: Guid.create(),
                        directory: "/some/directory"
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.detectionFileType'. Argument 'file.detectionFileType' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_empty_risk_found_in_files", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: Guid.create(),
                        detectionFileType: FileType.Bmp,
                        risk: "",
                        activePolicyId: Guid.create(),
                        directory: "/some/directory"
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.risk'. Argument 'file.risk' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_empty_activePolicyId_found_in_files", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: Guid.create(),
                        detectionFileType: FileType.Bmp,
                        risk: Risk.Safe,
                        activePolicyId: "",
                        directory: "/some/directory"
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.activePolicyId'. Argument 'file.activePolicyId' must not be null");
                }
            });

            it("throws_ArgumentNullException_if_empty_directory_found_in_files", () => {
                // Arrange
                const count = 1;
                const files = [
                    {
                        timestamp: new Date(),
                        fileId: Guid.create(),
                        detectionFileType: FileType.Bmp,
                        risk: Risk.Safe,
                        activePolicyId: Guid.create(),
                        directory: ""
                    }
                ];

                try {
                    // Act
                    // tslint:disable-next-line: no-unused-expression
                    new GetTransactionsResponse(
                        count,
                        files
                    );
                }
                catch (error) {
                    // Assert
                    expect(error.message)
                    .toEqual("Argument is invalid: 'file.directory'. Argument 'file.directory' must not be null");
                }
            });
        });
    });
});