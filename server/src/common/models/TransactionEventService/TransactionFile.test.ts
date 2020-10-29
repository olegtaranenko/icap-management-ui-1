import { Guid } from "guid-typescript";
import { FileType } from "../../../../frontend/src/enums/FileType";
import { Risk } from "../../../../frontend/src/enums/Risk";
import TransactionFile from "./TransactionFile";

    describe("TransactionFile", () => {
        describe("constructor", () => {
            it("should_construct_with_valid_arguments", () => {
                // Arrange
                const timestamp = new Date();
                const transactionFile = new TransactionFile(
                    timestamp,
                    Guid.create(),
                    FileType.Bmp,
                    Risk.Safe,
                    Guid.create(),
                    "/some/dir"
                );

                // Act
                // Assert
                expect(transactionFile.timestamp).toEqual(timestamp);
            });
        });
    });

