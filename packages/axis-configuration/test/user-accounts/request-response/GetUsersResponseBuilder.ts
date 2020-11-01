import { AccessRights } from '../../../src';

export class GetUsersResponseBuilder {
    private readonly admins: string[] = [];
    private readonly operators: string[] = [];
    private readonly viewers: string[] = [];
    private readonly ptz: string[] = [];

    addUser(name: string, accessRights: AccessRights, ptz: boolean): GetUsersResponseBuilder {
        switch (accessRights) {
            case AccessRights.Administrator:
                this.admins.push(name);
                this.operators.push(name);
                this.viewers.push(name);
                break;

            case AccessRights.Operator:
                this.operators.push(name);
                this.viewers.push(name);
                break;

            case AccessRights.Viewer:
                this.viewers.push(name);
                break;
        }

        if (ptz) {
            this.ptz.push(name);
        }

        return this;
    }

    build(): string {
        return (
            `admin="${this.admins.join(',')}"\r\n` +
            `operator="${this.operators.join(',')}"\r\n` +
            `viewer="${this.viewers.join(',')}"\r\n` +
            `ptz="${this.ptz.join(',')}"`
        );
    }
}
