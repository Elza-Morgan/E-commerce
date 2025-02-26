export interface Auth {
    
    //some of the key are optional with "?" because 
    //this interface is going to be common between 
    //signup and signin
        name?: string,
        email:string,
        password:string,
        rePassword?:string,
        phone?:string
        resetCode?:string,
        newPassword?:string
}
