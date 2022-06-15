# Software Studio 2022 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 5%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Fill the shape by clicking the checkbox          | 1~5%     | Y         |
| Generate a random color by clicking the checkbox | 1~5%     | Y         |


---

### How to use 
![image](https://i.imgur.com/ahoxsbv.png)

    The toolbox is on the right, with various functions. 
    The first row contains three icons, which are brush, erase and text tool
    respectively.
    
    The second row are three shape drawing tools. Use them to draw shapes 
    in different sizes.
    
    The third row are line tool, redo and undo.
    
    The forth row are upload, download and refresh.
    
    To change the width of the stroke, drag the slider. 
    To change the color, click on the color, and a color picker will appear. 
    Also there are two checkboxes regarding color. Details will be shown later.
    
    The final tool is the font selector.
### Function description

    My bonus function is a checkbox for the fill/stroke option. 
    If the "fill" checkbox is checked, then ctx.fill() will be used, 
    instead of ctx.stroke(). 
    The other function is also a checkbox. If the "random" checkbox is checked,
    then a random color will be picked each time the mouse is down.

### Firebase page link

    https://web-canvas-af511.firebaseapp.com/

### Others (Optional)

    Anything you want to say to TAs.

<style>
table th{
    width: 100%;
}
</style>
