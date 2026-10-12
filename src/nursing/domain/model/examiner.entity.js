
export class Examiner {
    constructor({ id = null, firstName = "",  lastName = "",  nationalProviderIdentifier = ""} = {}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalProviderIdentifier = nationalProviderIdentifier;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }
}