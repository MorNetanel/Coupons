export class CredentialsModel{
    public email : string;
    public password :string;
    public clientType : ClientTypes;

    constructor (email:string, password:string, clientType:ClientTypes){
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }


    
}

export enum ClientTypes{
    ADMIN, COMPANY, CUSTOMER
}

