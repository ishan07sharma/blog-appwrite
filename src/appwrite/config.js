import conf from '../conf/conf.js'

import { Client, ID, Databases,Storage,Query} from "appwrite";


export class Service{
    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    
                    status,
                    featuredImage,
                    userId,
                    content
                }
            )
            
        } catch (error) {
            console.log("appwrite create post error",error);
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    
                    status,
                    featuredImage,
                    content
                }
            )
            
        } catch (error) {
            console.log("appwrite update error",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
            )
            return true
            
        } catch (error) {
            console.log("appwrite delete error",error);
            return false
            
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            
        } catch (error) {
            console.log("appwrite get error",error);
            return false
            
        }
    }

    async getPosts(queries){
        try {
            // console.log(queries)
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status","active"),
                 queries
                ]
                
                
            )

            
        } catch (error) {
            console.log("appwrite get error",error);
            return false
            
        }
    }


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("appwrite file error",error)
            
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("appwrite file delete error",error)
            return false
            
        }
    }

    getFilePreview(fileId){
        //console.log("file preview",fileId)
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            300,
            400
        )
    }


}


const service=new Service()

export default service;