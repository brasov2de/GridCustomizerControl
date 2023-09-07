
export class EventManager{
    private target : EventTarget;

    constructor(){
        this.target = new EventTarget();
    }

    public nextAppointmentChanged(rowId: string, value: Date |null){
        window.setTimeout(() => {
            this.target.dispatchEvent(new CustomEvent("NextAppointmentChanged", {detail: {rowId, value } }));
        }, 100);
    }

    public addOnAppointementChanged(callback: any){
        this.target.addEventListener("NextAppointmentChanged", callback);
    }
    public removeOnAppointementChanged(callback : any){
        this.target.removeEventListener("NextAppointmentChanged", callback);
    }
}