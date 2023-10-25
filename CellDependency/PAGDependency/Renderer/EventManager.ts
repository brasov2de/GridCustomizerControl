export class EventManager{
    private target : EventTarget;
    private eventName: string;

    constructor(eventName: string){
        this.target = new EventTarget();
        this.eventName = eventName;
    }

    public publish(rowId: string, value: any | null ){        
        this.target.dispatchEvent(new CustomEvent(this.eventName, {detail: {rowId, value } }));        
    }
    
    public subscribe(callback: any){
        this.target.addEventListener(this.eventName, callback);
    }
    public unsubscribe(callback : any){
        this.target.removeEventListener(this.eventName, callback);
    }
}