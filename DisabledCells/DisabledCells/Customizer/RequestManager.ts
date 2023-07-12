

import * as debounce from "debounce-promise"


//https://www.npmjs.com/package/debounce-promise

export class RequestManager{
    private cache = {}  as any;

    constructor(){            
    }

    private retrieveRecords = async (ids: string[]) => {
        const myCache = this.cache;
        const result = await new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                ids.forEach((id)=>{
                    if(myCache[id]==null){ //otherwise I gerenarate different values for same id if the user clicks arround
                        (myCache as any)[id] = {
                                gendercode : Math.random()>0.5,
                                diana_allowmail : Math.random()>0.5,
                            }    
                    }
                });             
                resolve(ids.map((id) => (myCache as any)[id])); 
            }, 5000);
        });


      return result;
    }

    private debouncedAccumulatedFetch = debounce(async (ids: string[])=>{           
      return this.retrieveRecords(ids);
    }, 200, {accumulate:true});
   
   
    public async getRecords(id: string){          
        if(this.cache[id]!=null){
            return Promise.resolve(this.cache[id]);
        }
        const results = await this.debouncedAccumulatedFetch([id]);    
        console.log(`RequestManager: getRecords ${id} ${JSON.stringify(results)}`); 
        return results;
    }    

    public async refresh(parentId: string){  
      this.cache[parentId] = null;               
      const records = [parentId];
      await this.retrieveRecords(records);            
      return this.cache[parentId];
   }

   public getCached(id: string){
    return this.cache[id];
   }

    /*
   public addToRefreshList(id: string){
      this.refreshList.add(id);
   }

   public async refresh(parentId: string){           
      if(this.refreshList.size>0){ 
          const records = Array.from(this.refreshList);      
          await this.retrieveRecords(records);
          this.refreshList.clear();
      }
      return this.cache[parentId];
   }
   */
  
}