import * as React from 'react'
import { Icon} from "@fluentui/react/lib/Icon";


export interface IDraggableCell {
    rowId ?: string;
    rowIndex ?: any;
    text ?: string;   
    onDropped ?: (sourceId: string, targetId: string) => void;   
}

function allowDrop(event:any) {
    event.preventDefault();
  }

export function DraggableCell({rowId, rowIndex, text, onDropped}:IDraggableCell): any{
    const dragStart = (event: any) => {
        event.dataTransfer.setData("DianamicsDraggedRow", JSON.stringify({rowId, rowIndex}));
        console.log("Started to drag the text", rowId);              
    }
    function drop(event:any) {
        event.preventDefault();
        const targetId = rowId ?? "";        
        const source = JSON.parse(event.dataTransfer.getData("DianamicsDraggedRow") ?? "{}");    
        const sourceId = source?.rowId;
        const sourceIndex = source?.rowIndex;
        console.log("The text was dropped", sourceId, sourceIndex, targetId, rowIndex);
        if(onDropped) onDropped(sourceId, targetId);
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