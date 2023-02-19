function SortOrderChanged(executionContext){
    
    window.addEventListener("message", (e) => { 			
       console.log("registered OnMessage", e);
       if (e.data?.messageName === "Dianamics.DragRows") {		
        executionContext.getFormContext().ui.controls.get("Sortables")?.refresh();
        //console.log(e);
        }
     })
    }