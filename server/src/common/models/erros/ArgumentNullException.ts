import ArgumentException from "./ArgumentException";

export default class ArgumentNullException extends ArgumentException {
    constructor(argument: string) {
        super(argument, `Argument must not be null: ${argument}`);
        this.name = "ArgumentNullException";
    }
}