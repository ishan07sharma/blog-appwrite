import conf from '../conf/conf.js'

import { Client, Account,ID} from "appwrite";



export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.account=new Account(this.client)

    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(
                ID.unique(),
                email,
                password, // password
                name // name (optional)
            );
            if(userAccount){
                return this.login({email,password});

            }else{
                return userAccount;

            }
        } catch (error) {
            throw error;
            
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            throw error;
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("appwrite error",error);
            
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(error)
            
        }
    }

}

const authService=new AuthService();

export default authService
