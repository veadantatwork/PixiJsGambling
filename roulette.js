var rollateText = []; //THis is used to display numebr and text on oval and rect table
var rollateNumber = [];//this is use to show text on past numer on top
let rollateTable = new PIXI.Graphics();// this user to create graphics object for make roulette and oval table rect and polygone
let container = new PIXI.Container();//container used for roullete table all object of table(oval /rect);
let colorRed = 0xb71e04;
let colorBlock = 0x19171a;
let colorGreen = 0x3c9247;
let colorLine = 0xf8db74;
let colorWhite = 0xfafafa;
let val_Oval_right = ["16", "33", " 1", "20", "14", "31", " 9", "22", "18", "29", " 7", "28", "12"];//oval right side number
let val_Oval_Left = ["11", "36", "13", "27", " 6", "34", "17", "25", " 2", "21", " 4", "19", "15"];//oval left side number
let val_Oval_top = ["30", "8", "23", "10", " 5", "24"];//oval top number
let val_Ovalbottom = ["32", " 0", "26", " 3", "35"];//oval bottom number
let val_OvalCenter = ["TIER", "ORPH.", "VOISINS", "ZERO"];//oval center text
let polyPts = [145, 125, 300, 100, 455, 125, 455, 155, 145, 155];//this poit used to make polygone for zero in rext table
let rolletCoin = new Roulette();//all coin strip that used to place on table
let blockNumber = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28, 29, 31, 33, 35];//this is used to find number those are black
let newNumber;//this is used to show new roulette text 
let newNumberColor = 0xff0000;//new number rect color
let polyRedDimond = [45, 460,55, 430,65, 460,55, 490];//Red dimond poly point for rect table
let polyBleckDimond = [45, 580, 55, 550, 65, 580, 55, 610];//Black dimond poly point for rect table
//Bottom poly points for oval table
let polyBottom = [
    [60, 800, 148, 800, 163, 824, 97, 872],
    [97, 872, 163, 824, 202, 845, 174, 910],
    [174, 910, 202, 845, 258, 845, 286, 910],
    [286, 910, 258, 845, 296, 825, 363, 872],
    [363, 872, 296, 825, 310, 800, 398, 800]];
//Top poly points for oval table
let polyTop = [
    [60, 240, 86, 172, 163, 216, 148, 240],
    [86, 172, 144, 135, 191, 196, 163, 216],
    [144, 135, 230, 119, 230, 188, 191, 196],
    [230, 119, 315, 135, 268, 196, 230, 188],
    [315, 135, 374, 172, 298, 215, 268, 196],
    [374, 172, 396, 240, 310, 240, 298, 215]]

let itsOval = false;//Flag to get which table is active now rect(false), oval(true)



//Load all related object at the time app start
function loadRollate() {
    container.addChild(rollateTable); //add child roulette graphics
    app.stage.addChild(container);//add child roulette table container in main app
    //add child roulette text  used to show number and text on table
    for (let i = 0; i < 50; i++) { 
        rollateText.push(loadRolletText({ fill: colorWhite, fontSize: 28, fontWeight: "normal" }, (i + 1)));
        container.addChild(rollateText[i]);
        rollateText[i].position.set(-2000, -2000);
    }
    //add child roulette text used to show past number on top of the screen
    for (let i = 0; i < 15; i++) {
        if (Math.floor(Math.random() * 37) % 2 == 0)
            rollateNumber.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        else
            rollateNumber.push(loadRolletText({ fill: colorRed, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        app.stage.addChild(rollateNumber[i]);
        rollateNumber[i].position.set(20 + i * 40, 56);
        rollateNumber[i].text = Math.floor(Math.random() * 37) + "";
        rollateNumber[i].visible = false;
    }
    //add child roulette text used to show new number on middile of roulette circle
    newNumber = loadRolletText({ fill: colorRed, fontSize: 36, fontWeight: "bold" }, (i + 1));
    app.stage.addChild(newNumber);
    newNumber.text = "" + Math.floor(Math.random() * 500) % 37;
    newNumber.visible = false;
    container.visible = false;
}


//drawRoullete for animation of table of rollete 
function drawRoullete() {
    //if (itsOval == false) 
    {
        //scale ++ roullete table at the time of batting on
        if (dynamicCounter > 0 && container.scale.x < 1) {
            container.scale.x += .035;
            container.scale.y += .035;
            container.x -= 10;
            container.y -= 34;
            if (container.scale.x > 0.94) {
                container.position.set(0, 0);
                container.scale.set(1, 1)
            }
        }
        //scale -- roullete table at the time of batting off
        if (dynamicCounter < 0 && container.scale.x > 0.55) {
            container.scale.x -= .035;
            container.scale.y -= .035;
            container.x += 10;
            container.y += 34;
        }
    }

    //Show new numner on table 
    if (dynamicCounter < -25) {
        newNumber.visible = true;
        newNumber.style.fill = 0xffffff;
        graphics.lineStyle(2, colorLine); //yellow
        graphics.beginFill(newNumberColor);
        graphics.drawRect(230, 200, 77, 54);
        newNumber.position.set(250, 208);
        graphics.lineStyle(0, colorLine); //yellow
    }
}

// set all number rect and polygone of oval table
function draw_Oval_Table() {
    // reset all roulette number and text position and rotation 
    for (let i = 0; i < rollateText.length; i++) {
        rollateText[i].position.set(-2000, -2000);
        rollateText[i].rotation = 0;
    }
    rollateTable.clear();

    //set border of all rect and polygone
    rollateTable.lineStyle(2, colorLine); //yellow

    //set fill color
    rollateTable.beginFill(colorLine);
    //set center table text
    for (let i = 0; i < val_OvalCenter.length; i++) {
        rollateText[37 + i].text = val_OvalCenter[i];
    }

    //set center table position
    rollateText[37].position.set(195, 290);
    rollateText[38].position.set(187, 450);
    rollateText[39].position.set(175, 640);
    rollateText[40].position.set(192, 770);

    //set line from number 27 to 33
    rollateTable.drawPolygon([148, 240 + 43 * 4, 320, 240 + 43 * 2]);

    //set line from number 17 to 9
    rollateTable.drawRect(148, 240 + 43 * 7, 160, 1);
    //set line from number 19 to 28
    rollateTable.drawRect(148, 240 + 43 * 12, 160, 1);


    //set rect for oval right and left side
    for (let i = 0; i < 13; i++) {
       //set Left side rect and text
        if (i % 2 != 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        rollateTable.drawRect(60, 240 + 43 * i, 88, 43);
        rollateText[i].position.set(90, 250 + 43 * i);
        rollateText[i].text = val_Oval_Left[i];
        
        //set Right side rect and text
        if (i % 2 == 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        rollateTable.drawRect(310, 240 + 43 * i, 88, 43);//Right side rect
        rollateText[i + 13].position.set(340, 250 + 43 * i);
        rollateText[i + 13].text = val_Oval_right[i];
    }

    //set Top side Polygon and text
    for (let i = 0; i < polyTop.length; i++) {
        rollateTable.beginFill(i % 2 == 0 ? colorRed : colorBlock);
        rollateTable.drawPolygon(polyTop[i]);
        rollateText[26 + i].text = val_Oval_top[i];
    }
    rollateText[26].position.set(100, 205);
    rollateText[27].position.set(140, 165);
    rollateText[28].position.set(190, 145);
    rollateText[29].position.set(246, 145);
    rollateText[30].position.set(304, 157);
    rollateText[31].position.set(340, 205);





    //set Bottom side Polygon and text
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyBottom[0]);
    rollateTable.beginFill(colorGreen);
    rollateTable.drawPolygon(polyBottom[1]);
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBottom[2]);
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyBottom[3]);
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBottom[4]);
    for (let i = 0; i < 5; i++) {
        rollateText[32 + i].text = val_Ovalbottom[i];

    }
    rollateText[32].position.set(102, 813);
    rollateText[33].position.set(150, 850);
    rollateText[34].position.set(220, 865);
    rollateText[35].position.set(290, 855);
    rollateText[36].position.set(340, 815);
}

// set all number rect and polygone of Rectangle table
function drawRectangle_Table() {
    rollateTable.clear();
    // set text of Rectangle Table
    rollateText[36].text = "0";
    rollateText[37].text = "2 - 1";
    rollateText[38].text = "2 - 1";
    rollateText[39].text = "2 - 1";
    rollateText[40].text = "1st - 12";
    rollateText[41].text = "2nd - 12";
    rollateText[42].text = "3rd - 12";
    rollateText[43].text = "1 - 18";
    rollateText[44].text = "EVEN";
    rollateText[47].text = "ODD";
    rollateText[48].text = "19 - 36";
    for (let i = 40; i < 49; i++) {
        rollateText[i].rotation = (Math.PI * .5);// set left side text rotaion by 90 of Rectangle Table
    }
  
    rollateTable.lineStyle(2, colorLine); //yellow

    //set polygone for Zero
    rollateTable.beginFill(colorGreen);
    rollateTable.drawPolygon(polyPts);
    rollateText[36].position.set(295, 120);//set Zero text for table

    //set polygone for Red Dimond
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyRedDimond);

    //set polygone for Block Dimond
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBleckDimond);



    //set REd / Block Rect for  Roulette table
    for (let i = 0; i < 36; i++) {
        //set color for rect
        if ((i < 10 || (i > 18 && i < 28))) { 
            if (i % 2 == 0) {
                rollateTable.beginFill(colorRed);
            } else {
                rollateTable.beginFill(colorBlock);
            }
        } else {
            if (i % 2 != 0) {
                rollateTable.beginFill(colorRed);
            } else {
                rollateTable.beginFill(colorBlock);
            }
        }
        //set rect for table
        rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);
        //set text for table
        rollateText[i].position.set(145 + 103 * (i % 3) + 35, 15 + 155 + 60 * Math.floor(i / 3));
        rollateText[i].text = (i + 1) + "";
    }
    rollateTable.endFill();

    
    //set text for bottom(2 - 1) of Roulette table
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(145 + 103 * i, 876, 103, 40);
        rollateText[37 + i].position.set(160 + 103 * i, 880);
    }
    //set text for Left(1st,2st,3st - 12) of Roulette table
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(85, 155 + 240 * i, 60, 240);
        rollateText[40 + i].position.set(135, 225 + 240 * i);
    }
    //set text for Left(EVEN,Odd dimond) of Roulette table
    for (let i = 0; i < 6; i++) {
        rollateTable.drawRect(25, 155 + 120 * i, 60, 120);
        if (i != 2 && i != 3)
            rollateText[43 + i].position.set(70, 180 + 120 * i);
    }

}


//set visiblity of table releted object
function setRollate(isvisible) {
    sprite_menu.visible = APP_SCREEN != APP_MENU;
    //set visiblity of buttons
    sprite_repeat.visible = isvisible && dynamicCounter > 0;
    sprite_ovalselect.visible = !itsOval;
    sprite_deselect.visible = itsOval;

    //set visiblity of undo buttom
    sprite_undo.visible = isvisible && dynamicCounter > 0;

    //set visiblity of flying coin
    coinArray.forEach(element => { element.visible = isvisible && dynamicCounter > 0; });
    coinArrayBig.forEach(element => {
        element.visible = false;
    });

    //set visiblity of flying center coin
    coinArrayBig[selCoin].visible = isvisible && dynamicCounter > 0;//set visible big coin 
    trans_Background.visible = false;

    //set table 
    if (itsOval == true) {//set table  oval
        draw_Oval_Table();
    } else {//set table  Rect
        container.visible = true;
        drawRectangle_Table();
    }

    //set past number visiblity that shows on top of the screen 
    for (let i = 0; i < rollateNumber.length; i++) {
        rollateNumber[i].visible = true;
    }

    //set coin visibility that we place on oval and rect table
    rolletCoin.setVisible();
    
    txtbottomLeft.visible = true;//set screen bottomLeft text visibility
    txtbottomRight.visible = true;//set screen bottomLeft text visibility
    txtBalance.visible = true;//set screen Balance text visibility
    txtBat.visible = true;//set screen Bat text visibility
    txtDydnamic.visible = true;//set screen Dydnamic text visibility
}



//Handle tuch event for Rect Table
function Handle_rectTuch(event) {
    var pints = []; //define points varible for selected point at the time of click
    var sendCoin = false;//if any number and text click the it become true
    var zeroclick = false;//if zero number  click the it become true
    var is12 = false;//if (1st,2nd,3rd)-12 number  click the it become true
    var isDimond = false;//if (odd, even,dimond,1-18,19-36) number  click the it become true
    var type = [];

    //if zero number  click the it become true
    if (CircRectCollision(145, 115, 309, 40, event.data.global.x, event.data.global.y, 5)) {
        console.log(" ~Zero~~   ");
        sendCoin = true;
        zeroclick = true;
        type.push("0");
    }

    //if - to 36 number  click the it become true
    for (let i = 0; i < 36; i++) {
        if (CircRectCollision(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~~   " + (145 + 103 * (i % 3)));

            // getting point for set position of coin
            var point = [145 + 103 * (i % 3) + 103 * .5, 155 + 60 * Math.floor(i / 3) + 30];
            pints.push(point);
            sendCoin = true;
            type.push(""+(i + 1));
        }
    }


    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(145 + 103 * i, 876, 103, 40, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~A~   ");
            // getting point for set position of coin
            var point = [145 + 103 * (i % 3) + 103 * .5, 896];
            pints.push(point);
            sendCoin = true;
            type.push("2s"+i);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(85, 155 + 240 * i, 60, 240, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~B~   ");
            sendCoin = true;
            if (pints.length == 0) {// getting point for set position of coin if not get point from number (1 - 36)
                var point = [115, 155 + 240 * i + 120];
                pints.push(point);
            } else {
                //set true if click in middile of numbers and 1st,2nd,3rd - 12
                is12 = true;
            }
            type.push((i+1)+"is12");
        }
    }
    for (let i = 0; i < 6; i++) {
        if (CircRectCollision(25, 155 + 120 * i, 60, 120, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~C~   ");
            sendCoin = true;
            isDimond = true;
            if (pints.length == 0) {// getting point for set position of coin if not get point from number (1st,2nd,3rd - 12)
                var point = [55, 155 + 120 * i + 60];
                pints.push(point);
                type.push((i+1)+"left");
            }
            
        }
    }
    if (sendCoin == true) {
        console.log("pints = " + center(pints));
        //set coin in the center of points getting from above
        var point = center(pints);
        if (point.length > 0) {
            if (zeroclick) {
                point[1] -= 30;
            } else if (is12) {
                point[0] -= 50;
            }
        }
        rolletCoin.addRect(type,point[0], point[1]);//place coin in table rect and oval 
    }
}


//Handle tuch event for Oval Table
function Handle_OvalTuch(event) {
    //if left and right number click the it become true
    for (let i = 0; i < 13; i++) {
        //if right number click the it become true
        if (CircRectCollision(310, 240 + 43 * i, 88, 43, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_right[i]);
            rolletCoin.addOvalSingle(354, 262 + 43 * i,val_Oval_right[i]);//place selected coin in table rect and oval 
        }
        //if left  number click the it become true
        if (CircRectCollision(60, 240 + 43 * i, 88, 43, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_Left[i]);
            console.log((i + 1) + " ~Oval~A~   ");
            rolletCoin.addOvalSingle(104, 262 + 43 * i,val_Oval_Left[i]);//place selected coin in table rect and oval 
        }
    }
    //if Top side oval  number click the it become true
    for (let i = 0; i < polyTop.length; i++) {
        if (polyCircle(polyTop[i], event.data.global.x, event.data.global.y, 5)) {
            var point = polycenter(polyTop[i]);
            console.log((i + 1) + " ~Oval~"+point+"~   " + val_Oval_top[i]);
            rolletCoin.addOvalSingle(point[0],point[1],val_Oval_top[i]);
        }
    }
    //if Top side bottom  number click the it become true
    for (let i = 0; i < polyBottom.length; i++) {
        if (polyCircle(polyBottom[i], event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~"+point+"~C~   " + val_Ovalbottom[i]);
            var point = polycenter(polyBottom[i]);
            rolletCoin.addOvalSingle(point[0],point[1],val_Ovalbottom[i]);
        }
    }
    //if center side bottom  number click the it become true
    var cenerCordinate = [[162, 220, 140, 120], [162, 410, 140, 120], [162, 550, 140, 200], [162, 760, 140, 50]];//collition rect position and area
    for (let i = 0; i < cenerCordinate.length; i++) {
        if (CircRectCollision(cenerCordinate[i][0], cenerCordinate[i][1], cenerCordinate[i][2], cenerCordinate[i][3], event.data.global.x, event.data.global.y, 5)) {
            console.log(i + " ~~cenerCordinate~   " + val_OvalCenter[i]);
            switch (i) {
                case 0:
                    rolletCoin.addTIER();//place TIER selected coin in table rect and oval 
                    break;
                case 1:
                    rolletCoin.addORPH();//place ORPH. selected coin in table rect and oval 
                    break;
                case 2:
                    rolletCoin.addVoisins();//place Voisins selected coin in table rect and oval 
                    break;
                case 3:
                    rolletCoin.addZero();//place Zero selected coin in table rect and oval 
                    break;
            }
        }

    }
}


//Load text common function for rolette table
function loadRolletText(style_var, str) {
    var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
    return text;
}
//Load Sprite common function for rolette table
function loadRolletSprite(str, x, y, s) {
    let sprite = new Sprite(resources[str].texture);
    sprite.position.set(x, y);
    sprite.scale.set(s, s);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
}

function rouletteRepeat(){
    var bat = value4undo[this.coinOval.length-1];
    if (value4undo.length > 0) {
        currentbat -= bat;
        balance += bat;
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;
        value4undo.push(bat);
        if(APP_SCREEN == APP_ROULLETE){
            rolletCoin.repeatCoins();
        }
        console.log(currentbat + "  balance = " + balance);
    }

}