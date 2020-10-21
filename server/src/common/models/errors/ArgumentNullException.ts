import ArgumentException from "./ArgumentException";

export default class ArgumentNullException extends ArgumentException {
    constructor(argument: string) {
        super(argument, `Argument '${argument}' must not be null`);
        this.name = "ArgumentNullException";
    }
}