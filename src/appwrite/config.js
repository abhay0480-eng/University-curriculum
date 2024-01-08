/* eslint-disable no-unused-vars */
import { Client, ID, Databases,Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client()
    databases;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client)
    }

    async addProgramInfo({program,semesters,subjects}) {
        try{
           const programRes =  await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
                {program,semesters,subjects}
            )
            return programRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async updateProgramInfo({program,semesters,subjects},id){
        try{
          const programUpdateRes =   await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,id,
                {program,semesters,subjects}
            )
            return programUpdateRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    

    async deleteProgram({documentId}){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,documentId
            )
            return true
          
        }catch(error){
            console.log("Error creating account", error)
            return false
        }
    }

    async getProgramList(){
        try{
           const allPrograms = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
            )

            return allPrograms
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
}

const service  = new Service
export default service