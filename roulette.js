
var rollateText = [];
var rollateNumber = [];
let rollateTable = new PIXI.Graphics();
let container = new PIXI.Container();
let colorRed = 0xb71e04;
let colorBlock = 0x19171a;
let colorGreen = 0x3c9247;
let colorLine = 0xf8db74;
let colorWhite = 0xfafafa;
let val_Oval_right = ["16", "33", " 1", "20", "14", "31", " 9", "22", "18", "29", " 7", "28", "12"];
let val_Oval_Left = ["11", "36", "13", "27", " 6", "34", "17", "25", " 2", "21", " 4", "19", "15"];
let val_Oval_top = ["30", "8", "23", "10", " 5", "24"];
let val_Ovalbottom = ["32", " 0", "26", " 3", "35"];
let val_OvalCenter = ["TIER", "ORPH.", "VOISINS", "ZERO"];
let polyPts = [145, 125, 300, 100, 455, 125, 455, 155, 145, 155];
let rolletCoin = new Roulette();




let polyRedDimond = [
    45, 460,
    55, 430,
    65, 460,
    55, 490];
let polyBleckDimond = [45, 580, 55, 550, 65, 580, 55, 610];


let polyBottom = [
    [60, 800, 148, 800, 163, 824, 97, 872],
    [97, 872, 163, 824, 202, 845, 174, 910],
    [174, 910, 202, 845, 258, 845, 286, 910],
    [286, 910, 258, 845, 296, 825, 363, 872],
    [363, 872, 296, 825, 310, 800, 398, 800]];

let polyTop = [
    [60, 240, 86, 172, 163, 216, 148, 240],
    [86, 172, 144, 135, 191, 196, 163, 216],
    [144, 135, 230, 119, 230, 188, 191, 196],
    [230, 119, 315, 135, 268, 196, 230, 188],
    [315, 135, 374, 172, 298, 215, 268, 196],
    [374, 172, 396, 240, 310, 240, 298, 215]]

let itsOval = false;

function loadRollate() {
    container.addChild(rollateTable);
    app.stage.addChild(container);
    for (let i = 0; i < 50; i++) {
        rollateText.push(loadRolletText({ fill: colorWhite, fontSize: 28, fontWeight: "normal" }, (i + 1)));
        container.addChild(rollateText[i]);
        rollateText[i].position.set(-2000, -2000);
    }
    for (let i = 0; i < 15; i++) {
        if (Math.floor(Math.random() * 37) % 2 == 0)
            rollateNumber.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        else
            rollateNumber.push(loadRolletText({ fill: colorRed, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        app.stage.addChild(rollateNumber[i]);
        rollateNumber[i].position.set(20 + i * 40, 60);
        rollateNumber[i].text = Math.floor(Math.random() * 37) + "";
        rollateNumber[i].visible = false;
    }
    container.visible = false;
}

function drawRoullete() {
    //if (itsOval == false) 
    {
        if (dynamicCounter > 0 && container.scale.x < 1) {
            container.scale.x += .035;
            container.scale.y += .035;
            container.x -= 10;
            container.y -= 34;
            if (container.scale.x > 0.94) {
                container.position.set(0,0);
                container.scale.set(1,1)
            }
        }
        if (dynamicCounter < 0 && container.scale.x > 0.55) {
            container.scale.x -= .035;
            container.scale.y -= .035;
            container.x += 10;
            container.y += 34;
        }
    }
    // rollateTable.drawRect(0, 25, app.screen.width, 30);

    // drawRectangle_Table();
    // rollateTable.drawRect(0, 525, app.screen.width, 500);
    //drawRectangle_Table();
    // draw_Oval_Table();
    // setRollate(true);
    // drawRectangle_Table();
}

function draw_Oval_Table() {
    for (let i = 0; i < rollateText.length; i++) {
        rollateText[i].position.set(-2000, -2000);
        rollateText[i].rotation = 0;
    }
    rollateTable.clear();




    rollateTable.lineStyle(2, colorLine); //yellow
    rollateTable.beginFill(colorLine);
    for (let i = 0; i < val_OvalCenter.length; i++) {
        rollateText[37 + i].text = val_OvalCenter[i];
    }

    rollateText[37].position.set(195, 290);
    rollateText[38].position.set(187, 450);
    rollateText[39].position.set(175, 640);
    rollateText[40].position.set(192, 770);

    rollateTable.drawPolygon([148, 240 + 43 * 4, 320, 240 + 43 * 2]);
    rollateTable.drawRect(148, 240 + 43 * 7, 160, 1);
    rollateTable.drawRect(148, 240 + 43 * 12, 160, 1);
    for (let i = 0; i < 13; i++) {
        if (i % 2 != 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        rollateTable.drawRect(60, 240 + 43 * i, 88, 43);
        if (i % 2 == 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        rollateTable.drawRect(310, 240 + 43 * i, 88, 43);
        rollateText[i].position.set(90, 250 + 43 * i);
        rollateText[i].text = val_Oval_Left[i];
        rollateText[i + 13].position.set(340, 250 + 43 * i);
        rollateText[i + 13].text = val_Oval_right[i];
    }

    for (let i = 0; i < polyTop.length; i++) {
        rollateTable.beginFill(i % 2 == 0 ? colorRed : colorBlock);
        rollateTable.drawPolygon(polyTop[i]);
    }
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

    for (let i = 0; i < 6; i++) {
        rollateText[26 + i].text = val_Oval_top[i];

    }
    for (let i = 0; i < 5; i++) {
        rollateText[32 + i].text = val_Ovalbottom[i];

    }

    rollateText[26].position.set(100, 205);
    rollateText[27].position.set(140, 165);
    rollateText[28].position.set(190, 145);
    rollateText[29].position.set(246, 145);
    rollateText[30].position.set(304, 157);
    rollateText[31].position.set(340, 205);

    rollateText[32].position.set(102, 813);

    rollateText[33].position.set(150, 850);
    rollateText[34].position.set(220, 865);
    rollateText[35].position.set(290, 855);
    rollateText[36].position.set(340, 815);




}

function drawRectangle_Table() {
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
        rollateText[i].rotation = (Math.PI * .5);
    }

    rollateTable.clear();

    rollateTable.lineStyle(2, colorLine); //yellow
    rollateTable.beginFill(colorGreen);
    rollateTable.drawPolygon(polyPts);
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyRedDimond);
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBleckDimond);
    for (let i = 0; i < 36; i++) {
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
        rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);
        rollateText[i].position.set(145 + 103 * (i % 3) + 35, 15 + 155 + 60 * Math.floor(i / 3));
        rollateText[i].text = (i + 1) + "";
    }
    rollateTable.endFill();
    rollateText[36].position.set(295, 120);
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(145 + 103 * i, 876, 103, 40);
        rollateText[37 + i].position.set(160 + 103 * i, 880);
    }
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(85, 155 + 240 * i, 60, 240);
        rollateText[40 + i].position.set(135, 225 + 240 * i);
    }
    for (let i = 0; i < 6; i++) {
        rollateTable.drawRect(25, 155 + 120 * i, 60, 120);
        if (i != 2 && i != 3)
            rollateText[43 + i].position.set(70, 180 + 120 * i);
    }

}




function setRollate(isvisible) {//set visiblity of bat button and coin

    sprite_repeat.visible = false;
    sprite_ovalselect.visible = !itsOval;
    sprite_deselect.visible = itsOval;

    sprite_undo.visible = isvisible;
    coinArray.forEach(element => { element.visible = isvisible; });
    coinArrayBig.forEach(element => {
        element.visible = false;
    });
    coinArrayBig[selCoin].visible = isvisible;//set visible big coin 
    // spriteAnte.visible = isvisible;
    // sprite_bonus.visible = isvisible;
    // sprite_GlowAnte.visible = isvisible;
    trans_Background.visible = false;

    if (itsOval == true) {
        draw_Oval_Table();
    } else {
        container.visible = true;
        drawRectangle_Table();
    }
    for (let i = 0; i < rollateNumber.length; i++) {
        rollateNumber[i].visible = true;
    }
    rolletCoin.setVisible();
}

function Handle_rectTuch(event) {
    var sendCoin = false;
    // console.log(event.data.global.x.toFixed(2)+"  "+event.data.global.y.toFixed(2));
    var pints =[];
    var zeroclick = false;
    var is12 = false;
    var isDimond = false;
    if (CircRectCollision(145, 115, 309, 40, event.data.global.x, event.data.global.y, 5)) {
        console.log( " ~Zero~~   ");
        sendCoin = true;
        zeroclick = true;
    }
    for (let i = 0; i < 36; i++) {
        if (CircRectCollision(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~~   " + (145 + 103 * (i % 3)));
            var point = [145 + 103 * (i % 3)+103*.5,155 + 60 * Math.floor(i / 3)+30];
            pints.push(point);
            sendCoin = true;
        }
    }


    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(145 + 103 * i, 876, 103, 40, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~A~   ");
            var point = [145 + 103 * (i % 3)+103*.5,896];
            pints.push(point);
            sendCoin = true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(85, 155 + 240 * i, 60, 240, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~B~   ");
            
            sendCoin = true;
            if(pints.length ==0){
                var point = [115, 155 + 240 * i+120];
                pints.push(point);
            }else{
                is12 = true;
            }
        }
    }
    for (let i = 0; i < 6; i++) {
        if (CircRectCollision(25, 155 + 120 * i, 60, 120, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~C~   ");
            sendCoin = true;
            isDimond = true;
            if(pints.length ==0){
                var point = [55, 155 + 120 * i + 60];
                pints.push(point);
            }
        }
    }
    if (sendCoin == true) {
        console.log("pints = "+center(pints));
        var point = center(pints);
        if (point.length > 0) {
            if (zeroclick) {
                point[1] -= 30;
            }else if (is12) {
                point[0] -= 50;
            }
        }

        // if(zeroclick && point.length > 0)
        //     point[1] -= 30;
        rolletCoin.addRect(point[0], point[1]);
        //selBigSprite.push(loadSprite(basepath + "" + selCoin + ".png", -1, event.data.global.x, event.data.global.y, 0.3));
    }
}
function Handle_OvalTuch(event) {
    console.log(" Handle_OvalTuch~~Oval~   ");
    var sendCoin = false;




    for (let i = 0; i < 13; i++) {
        if (CircRectCollision(310, 240 + 43 * i, 88, 43, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_right[i]);
            sendCoin = true;
        }
        if (CircRectCollision(60, 240 + 43 * i, 88, 43, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_Left[i]);
            console.log((i + 1) + " ~Oval~A~   ");
            sendCoin = true;
        }
    }

    for (let i = 0; i < polyTop.length; i++) {
        if (polyCircle(polyTop[i], event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~Oval~B~   " + val_Ovalbottom[i]);
            sendCoin = true;
        }
    }
    for (let i = 0; i < polyBottom.length; i++) {
        if (polyCircle(polyBottom[i], event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~C~   " + val_Oval_top[i]);
            sendCoin = true;
        }
    }

    var cenerCordinate = [[162, 220, 140, 120], [162, 410, 140, 120], [162, 550, 140, 200], [162, 760, 140, 50]];
    for (let i = 0; i < cenerCordinate.length; i++) {
        if (CircRectCollision(cenerCordinate[i][0], cenerCordinate[i][1], cenerCordinate[i][2], cenerCordinate[i][3], event.data.global.x, event.data.global.y, 5)) {
            console.log(i + " ~~cenerCordinate~   " + val_OvalCenter[i]);
            switch (i) {
                case 0:
                    rolletCoin.addTIER();
                    break;
                case 1:
                    rolletCoin.addORPH();
                    break;
                case 2:
                    rolletCoin.addVoisins();
                    break;
                case 3:
                    rolletCoin.addZero();
                    break;

                default:
                    break;
            }

            sendCoin = true;
        }

    }
    if (sendCoin == true) {



        // selBigSprite.push(loadSprite(basepath + "" + selCoin + ".png", -1, event.data.global.x, event.data.global.y, 0.3));
    }

    //rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);

    // let zero = [];//4(0-3,12-15,26,32-35)5*4=20
    // let voisins = [];//7(0-2-3, 4-7, 12-15,  18-21, 19-22, 25-26-28-29,  32-35)(10+5+5+5+5+10+5)
    // let orph = [];//4(1, 6-9, 14-17,  17-21, 31-34)5*5
    // let tier = [];//4(5-8, 10-11, 13-16,  23-24, 27-30,33-36)5*6coinOval








}

function loadRolletText(style_var, str) {
    var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
    return text;
}
function loadRolletSprite(str, x, y, s) {
    let sprite = new Sprite(resources[str].texture);
    sprite.position.set(x, y);
    sprite.scale.set(s, s);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
}