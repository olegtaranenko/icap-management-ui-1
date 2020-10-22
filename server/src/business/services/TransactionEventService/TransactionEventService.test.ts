import { stub, SinonStub } from "sinon";
import winston from "winston";
import TransactionEventApi from "../../../common/http/TransactionEventApi/TransactionEventApi";
import GetTransactionsRequest from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import { FileType } from "../../../../frontend/src/enums/FileType";
import { Risk } from "../../../common/models/enums/Risk";
import TransactionEventService from "./TransactionEventService";
import GetTransactionsResponse from "../../../common/models/TransactionEventService/GetTransactions/GetTransactionsResponse";

let getTransactionsStub: SinonStub;

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
            getTransactionsStub = stub(TransactionEventApi, "getTransactions")
                .resolves(JSON.stringify(responseString));
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
            const result = await transactionEventService.getTransactions(request);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });
});