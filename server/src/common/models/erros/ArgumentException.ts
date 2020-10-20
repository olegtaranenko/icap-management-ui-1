export default class ArgumentException extends Error {
    argument: string;

    constructor(argument: string, message: string) {
        super(`Argument is invalid: ${argument}.`);
        this.name = "ArgumentException";
        this.argument = argument;
        this.message = message;
    }
};