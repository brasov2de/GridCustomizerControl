function SortOrderChanged(executionContext){

   const retrieveRecords = (sourceIndex, targetIndex) => {
      const parentId = executionContext.getFormContext().data.entity.getId();
      return Xrm.WebApi.retrieveMultipleRecords("diana_sortable", 
         `?$select=diana_sortableid,diana_sortorder&$filter=(_diana_accountid_value eq '${parentId}'` +
         `and Microsoft.Dynamics.CRM.Between(PropertyName='diana_sortorder',PropertyValues=['${sourceIndex}','${targetIndex}']))&$orderby=diana_sortorder asc`)
   }

   const refreshGrid = () => {
      executionContext.getFormContext().ui.controls.get("Sortables")?.refresh();
      Xrm.Utility.closeProgressIndicator();
   }

   const move = (sourceId, sourceValue, targetId, targetValue)=> {
      Xrm.Utility.showProgressIndicator("updating sort order");

      retrieveRecords(Math.min(sourceValue, targetValue), Math.max(sourceValue, targetValue)).then((response)=>{
         const delta = sourceValue<targetValue ? -1 : 1;
         //update currentValue + delta
         const updates = response.entities.map((record)=> {
            if(record.diana_sortableid!=sourceId){
               return Xrm.WebApi.updateRecord("diana_sortable", record.diana_sortableid, {"diana_sortorder": record.diana_sortorder + delta});
            }
            return Promise.resolve();
         })         
         //update source mit targetValue
         updates.push(Xrm.WebApi.updateRecord("diana_sortable", sourceId, {"diana_sortorder": targetValue}))            
         return Promise.all(updates).then(refreshGrid, refreshGrid)
         });           
   }



    
    window.addEventListener("message", (e) => { 			
       console.log("registered OnMessage", e);
       if (e.data?.messageName === "Dianamics.DragRows") {		
         const data = e.data.data;
         move(data.sourceId, data.sourceValue, data.targetId, data.targetValue);
        
        //console.log(e);
        }
     })
    }