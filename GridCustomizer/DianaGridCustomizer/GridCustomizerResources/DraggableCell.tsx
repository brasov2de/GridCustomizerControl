import * as React from 'react'
import { Icon} from "@fluentui/react/lib/Icon";

export interface IDraggableCell {
    rowId ?: string;
    rowIndex ?: any;
}

function allowDrop(event:any) {
    event.preventDefault();
  }

export function DraggableCell({rowId, rowIndex}:IDraggableCell): any{
    const dragStart = (event: any) => {
        event.dataTransfer.setData("DianamicsDraggedRow", {rowId, rowIndex});
        console.log("Started to drag the text", rowId);              
    }
    function drop(event:any) {
        event.preventDefault();
        const targetId = rowIndex;        
        const source = event.dataTransfer.getData("DianamicsDraggedRow");    
        const sourceId = source?.rowId;
        const sourceIndex = source?.rowIndex;
        console.log("The text was dropped", sourceId, sourceIndex, targetId);
      }
    return (
        <div style={{display: "inline-block"}}>
         <div onDrop={drop} onDragOver={allowDrop} style={{width: "50%", height: "100%", border: "1ps xolid black"}}>
            <div draggable={true} onDragStart={dragStart}>
            <Icon iconName="DragObject" aria-hidden="true" id={rowId}   />        
            </div>
        </div>
        <div onDrop={drop} onDragOver={allowDrop} style={{width: "50%", height: "100%", border: "1ps xolid black"}}>
            <div draggable={true} onDragStart={dragStart}>
            <Icon iconName="DragObject" aria-hidden="true" id={rowId}   />        
            </div>
        </div>
        </div>
    )        
}