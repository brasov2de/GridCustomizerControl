

import * as debounce from "debounce-promise"

export interface IKey{
    parentId: string;
    id: string;
    year: string;
}

//https://www.npmjs.com/package/debounce-promise

export class RequestManager{

    private cache = null  as any;    
    private webApi : ComponentFramework.WebApi;
    private opportunityId ?: string;
    private target : EventTarget;

    
    private fetchAllXml = (id: string) => ["<fetch>",
        "<entity name='diana_requestpositionscenarioyear'>",
        "<attribute name='diana_year'/>",
        "<attribute name='diana_value'/>",
        "<attribute name='diana_requestpositionscenarioyearid'/>",
        "<attribute name='diana_requestpositionszenarioid'/>",
        "<link-entity name='diana_requestpositionszenario' from='diana_requestpositionszenarioid' to='diana_requestpositionszenarioid'>",
        "<filter>",
          `<condition attribute='diana_opportunityid' operator='eq' value='${id}'/>`,
        "</filter>",
      "</link-entity>",
    "</entity>",
  "</fetch>"].join("");
  private fetchOne = (parentId: string) => ["<fetch>",  
    "<entity name='diana_requestpositionscenarioyear'>",
    "<filter>",
      `<condition attribute='diana_requestpositionszenarioid' operator='eq' value='${parentId}'/>`,
    "</filter>",
  "</entity>",
"</fetch>"].join("");


    constructor(webApi: any){   
        this.target = new EventTarget();    
        this.webApi = webApi;
    }

    public setOpportunityId(opportunityId ?: string){
        this.opportunityId = opportunityId;
    }
    public hasOpportunityId(){
        return this.opportunityId!=null;
    }

    private retrieveRecords = async (keys: IKey[]) => {
        if(this.cache==null && this.opportunityId!=null){       
            const response = await this.webApi.retrieveMultipleRecords("diana_requestpositionscenarioyear", "?fetchXml="+this.fetchAllXml(this.opportunityId));
            this.cache = {};
            response.entities.forEach((entity)=>{
                entity["diana_requestpositionszenarioid"] = entity["_diana_requestpositionszenarioid_value"];
                this.cache[entity.diana_requestpositionscenarioyearid] = entity;
            });
        }
        else{
            const parentIds = Array.from(new Set((keys).map(({parentId})=>parentId))); //distinct
            const promises : Array<Promise<ComponentFramework.WebApi.RetrieveMultipleResponse>> = parentIds.map((parentId)=> {
                return this.webApi.retrieveMultipleRecords("diana_requestpositionscenarioyear", "?fetchXml="+this.fetchOne(parentId))
                .then((response)=>{
                    response.entities.forEach((entity)=>{
                        entity["diana_requestpositionszenarioid"] = entity["_diana_requestpositionszenarioid_value"];
                        this.cache[entity.diana_requestpositionscenarioyearid] = entity;
                    });
                    return response;
                });                
            });
            await Promise.all(promises);
        }    
                  
        return keys.map(({id, parentId, year})=> {
            if(id!=null){
                this.cache[id];
            }
            else{
                const arrCache = Object.values(this.cache);
                return arrCache.find((value: any)=>{
                    return value["diana_requestpositionszenarioid"] == parentId && value["diana_year"] == year;
                });    
            }
          }); 
      
    }


    private debouncedAccumulatedFetch = debounce(async (ids : any)=>{           
      return this.retrieveRecords(ids.map((param: any[])=>param[0] ));
    }, 200, {accumulate:true});
   
   
    public async getRecords(parentId: string, id ?: string, year?: string){    
        const cached = this.getCached(parentId, id, year);              
        if(cached!=null){
            return cached;
        }
        const results = await this.debouncedAccumulatedFetch({parentId, id, year} as IKey)    
        console.log(`RequestManager: getRecords ${id} ${JSON.stringify(results)}`); 
        this.target.dispatchEvent( new CustomEvent("onSumChanged", {detail: parentId}));
        return results;
    }    


    private upsertRecordDebounced = debounce(async (id: string | undefined, parentId: string, year: string, value: string) => {
        if(id!=null){
            const updated = await this.webApi.updateRecord("diana_requestpositionscenarioyear", id, {diana_value: value})
            this.cache[id].diana_value = value;
            return this.cache[id];
        }
        else{
            const created = await this.webApi.createRecord("diana_requestpositionscenarioyear", {
                diana_year: year, 
                diana_value: value, 
                "diana_requestpositionszenarioid@odata.bind" : `/diana_requestpositionszenarios(${parentId})`
            });
            //diana_requestpositionszenarioid
            this.cache[created.id] = {
                diana_year: year,
                diana_value: value,
                diana_requestpositionszenarioid: parentId,
                diana_requestpositionscenarioyearid: created.id
            };
            return this.cache[created.id];

        }
    }, 400, {accumulate:false});

    private _onSumChanged: Event = new Event("onSumChanged");

    public addEventListener(eventName: string, handler: any): void{
        this.target.addEventListener(eventName, handler);
    }
    public removeEventListener(eventName: string, handler: any): void{
        this.target.removeEventListener(eventName, handler);
    }

    
    public async upsertRecord(id: string | undefined, parentId: string, year: string, value: string){
       const newEntity = await this.upsertRecordDebounced(id, parentId, year, value);
       this.target.dispatchEvent( new CustomEvent("onSumChanged", {detail: parentId}));
       return newEntity;
    }

    public async getSumByParent(parentId: string){
        await this.getRecords(parentId);
        return Object.values(this.cache).reduce((acc: number, curr: any)=>{
            if(curr.diana_requestpositionszenarioid == parentId){
                return acc + Number(curr.diana_value);
            }
            else{
                return acc;
            }
        }, 0);        
    }

    /*
    public async refresh(id: string){      
      this.cache[id] = null;                     
      await this.retrieveRecords([id]);            
      return this.cache[id];
   }
*/

   public getCached(parentId: string, id ?: string, year?: string){
        if(id!=null){
            return (this.cache ?? {})[id];
        }
        const arrCache = Object.values(this.cache ?? {});
        return arrCache.find((value: any)=>{
            return value["diana_requestpositionszenarioid"] == parentId && value["diana_year"] == year;
        });    
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