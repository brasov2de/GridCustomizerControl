
const disableControls = (attributes, disabled) => {
    attributes.forEach(function (attr) {
        attr.controls.forEach(function (myField) {
            myField.setDisabled(disabled);
        });
    });
}

function onGridRowSelected(eventContext) {
    const attributes = eventContext.getEventSource().attributes.get().filter((attr) => attr.controls.get(0).getDisabled() === false);
    disableControls(attributes, true);
    
    const myPromise = new Promise((resolve, reject) => {
        window.setTimeout(resolve,1000);
    });
    myPromise.then(() => {
      const targetAttributes= attributes.filter((attr) => attr.getName()=== "diana_relatedusers" && attr.getValue()=="123");
       disableControls(targetAttributes, false);
    })
}

function onGridLoad(eventContext){
    console.log(eventContext);
}

/*
function onGridRowSelected(eventContext) {
    const attributes = eventContext.getEventSource().attributes.get();
    const controls = attributes.map((attr)=> attr.controls.get(0));
    const myPromise = new Promise((resolve, reject) => {
        window.setTimeout(resolve,1000);
    });
    myPromise.then(() => {
        controls.forEach(function (myField) {
                myField.setDisabled(true);
            });        
    });
}

function onGridRowSelected(eventContext) {
    const attributes = eventContext.getEventSource().attributes.get();
    const myPromise = new Promise((resolve, reject) => {
        window.setTimeout(resolve,1000);
    });
    myPromise.then(() => {
        attributes.forEach(function (attr) {
            attr.controls.forEach(function (myField) {
                myField.setDisabled(true);
            });
        });
    })
}*/

/*
function onGridRowSelected(eventContext) {
    eventContext.getEventSource().attributes.forEach(function (attr) {
        attr.controls.forEach(function (myField) {
            myField.setDisabled(true);
        });
    });
}*/
