
 
//presume the items are sorted from 1...N
export class SortableIndex{
    private items: string[] = [];
    private webAPI : ComponentFramework.WebApi;
    private tableName : string;
    private orderColumnName : string;
    private isMoving = false;
    constructor(webAPI: ComponentFramework.WebApi, tableName : string, orderColumnName: string){
        this.webAPI = webAPI;
        this.tableName = tableName;
        this.orderColumnName = orderColumnName;
    }
    public push(id: string, value : number){
        console.log(value);
        
        if(this.items.includes(id)){
            const index = this.items.indexOf(id);
            if(index >= 0 && index+1 != value){
                this.items.splice(index,1);
                this.items.splice(value, 0, id);                
            }
            return;
        }
        this.items.push(id);
    }
    public move(sourceId : string, targetId : string) : Promise<void[]>{
        if(this.isMoving) return;
        this.isMoving = true;
        const sourceIndex = this.items.indexOf(sourceId);
        const targetIndex = this.items.indexOf(targetId);       
        const startIndex = Math.min(sourceIndex, targetIndex);
        const endIndex = Math.max(sourceIndex, targetIndex);
        const movedItems = sourceIndex<targetIndex 
                ? this.items.slice(startIndex + 1, endIndex + 1)
                : this.items.slice(startIndex, endIndex);
        if(sourceIndex<targetIndex){
            movedItems.push(sourceId);
        }
        else{
            movedItems.unshift(sourceId);
        }                
        this.items.splice(startIndex, endIndex-startIndex, ...movedItems);
        const promises = movedItems.map((id : string, index: number) => {
            this.webAPI.updateRecord(this.tableName, id, {[this.orderColumnName]: startIndex + index + 1 })
        });
        return Promise.all(promises).then((args) => {
            this.isMoving = true;
            return args;
        });
        
    }
}