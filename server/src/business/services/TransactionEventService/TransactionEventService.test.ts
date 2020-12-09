import { stub, SinonStub } from "sinon";
import winston from "winston";
import { FileType } from "../../../common/models/enums/FileType";
import { Risk } from "../../../common/models/enums/Risk";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import TransactionEventService from "./TransactionEventService";
import TransactionEventApi from "../../../common/http/TransactionEventApi/TransactionEventApi";
import axios, { CancelToken } from "axios";

let getTransactionsStub: SinonStub;
let getTransactionDetailsStub: SinonStub;

describe("TransactionEventService", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const logger = winston.createLogger();

            // Act
            const transactionEventService = new TransactionEventService(logger);

            // Assert
            expect(transactionEventService.logger).toEqual(logger);
        });
    });

    describe("getTransactions", () => {
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });

        let cancellationToken: CancelToken;

        const responseString = {
            count: 1,
            files: [
                {
                    timestamp: new Date(),
                    fileId: "11111111-1111-1111-1111-11111111111",
                    detectionFileType: FileType.Bmp,
                    risk: Risk.Safe,
                    activePolicyId: "11111111-1111-1111-1111-11111111111",
                    directory: "/some/directory"
                }
            ]
        };

        const expectedResponse = new GetTransactionsResponse(
            responseString.count, responseString.files);

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            getTransactionsStub = stub(TransactionEventApi, "getTransactions")
                .resolves(responseString);
        });

        afterEach(() => {
            getTransactionsStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const transactionEventService = new TransactionEventService(logger);
            const request = new GetTransactionsRequest("www.glasswall.com",
                {
                    Filter: {
                        TimestampRangeStart: new Date(),
                        TimestampRangeEnd: new Date()
                    }
                });

            // Act
            const result = await transactionEventService.getTransactions(request, cancellationToken);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

    describe("getTransactionDetails", () => {
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });

        let cancellationToken: CancelToken;

        const responseString = {
            status: 0,
            analysisReport: "test"
        };

        const expectedResponse = new GetTransactionDetailsResponse(
            responseString.status, responseString.analysisReport)

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            getTransactionDetailsStub = stub(TransactionEventApi, "getTransactionDetails")
                .resolves(responseString);
        });

        afterEach(() => {
            getTransactionDetailsStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const transactionEventService = new TransactionEventService(logger);
            const request = new GetTransactionDetailsRequest(
                "www.glasswall.com",
                "/test"
            );

            // Act
            const result = await transactionEventService.getTransactionDetails(request, cancellationToken);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });
});