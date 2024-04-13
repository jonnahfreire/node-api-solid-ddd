export default class Name {
    constructor(readonly value: string) {
        if (this.value.trim().length == 0) {
            throw new Error("Invalid name. Must send name and surname");
        }
    }
}