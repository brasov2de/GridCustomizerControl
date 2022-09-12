# GridCustomizerControl

This repository contains several examples for Power Apps Grid customizer control.

## CellRenderer

This is an example of how to render a cells with your own renderer. This example allows you to also edit the values right inside the Grid.
I've took a boolean and an optionset.
![image](https://user-images.githubusercontent.com/29977935/189729238-fdc64013-940e-4604-bb7f-e8b4426402ce.png)

## GridCustomizer

This one is not implemented to the end. It shows a way to overwrite the complete rendering: all column headers, all cells. loading aso.
But didn't found a valid use case for this until now.

## Calculated columns

This Power Apps Grid control calculated the data for a column (next visit) based on the last scheduled appointment.
For online szenarios, we can work with calculated columns in Dataverse, but this doesn't apply in offline mode. This control solves the problem and calculates the next visit. It also corrects the next visit if the last scheduled appointment is in the past, by proposing the next monday instead.
![image](https://user-images.githubusercontent.com/29977935/189730249-87c23c4d-122d-4da9-9df1-f3fd879d9688.png)


## Related records

This example of Power Apps Grid control shows the users associated to a record (many-to-many relationshio). 
The users are shown async, executing a request for each row. They are cached inside the PCF, but reloaded each time the PCF "init" method is called.
![image](https://user-images.githubusercontent.com/29977935/189729052-d8ac4da2-41ab-4176-967a-eb7126845850.png)
