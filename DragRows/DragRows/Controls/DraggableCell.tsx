import * as React from 'react'
import { Icon} from "@fluentui/react/lib/Icon";


export interface IDraggableCell {
    rowId ?: string;
    rowIndex ?: any;
    text ?: string;   
    onDropped ?: (sourceId: string, sourceValue: number, targetId: string, targetValue: number) => void;   
}

function allowDrop(event:any) {
    event.preventDefault();
  }

export function DraggableCell({rowId, rowIndex, text, onDropped}:IDraggableCell): any{
    const dragStart = (event: any) => {
        event.dataTransfer.setData("DianamicsDraggedRow", JSON.stringify({rowId, rowIndex}));
        //console.log("Started to drag the text", rowId);              
     /*   var crt = event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement;//?.parentElement;     
        if(crt){     
          event.dataTransfer.setDragImage(crt, 0, 0); 
        }*/
    }
    function drop(event:any) {
        event.preventDefault();
        const targetId = rowId ?? "";        
        const source = JSON.parse(event.dataTransfer.getData("DianamicsDraggedRow") ?? "{}");    
        const sourceId = source?.rowId;
        const sourceIndex = source?.rowIndex;
        console.log("The text was dropped", sourceId, sourceIndex, targetId, rowIndex);
        if(onDropped) onDropped(sourceId, sourceIndex, targetId, rowIndex );
      }

    return (       
         <div onDrop={drop} onDragOver={allowDrop} style={{width: "100%", height: "100%"}}>
            <div draggable={true} onDragStart={dragStart}>
            <Icon iconName="DragObject" aria-hidden="true" id={rowId} style={{fontSize: "xx-large"}}  />
            {text}        
            </div>
        </div>       
    )        
}