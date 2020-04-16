
var rouletteText = [];
var rouletteNumber = [];
let rouletteTable = new PIXI.Graphics();
let container = new PIXI.Container();
let colorRed = 0xb71e04;
let colorBlock = 0x19171a;
let colorGreen = 0x3c9247;
let colorLine = 0xf8db74;
let colorWhite = 0xfafafa;
let val_Oval_Left = ["16", "33", " 1", "20", "14", "31", " 9", "22", "18", "29", " 7", "28", "12"];
let val_Oval_right = ["11", "36", "13", "27", " 6", "34", "17", "25", " 2", "21", " 4", "19", "15"];
let val_Oval_top = ["30", "8", "23", "10", " 5", "24"];
let val_Ovalbottom = ["32", " 0", "26", " 3", "35"];
let val_OvalCenter = ["TIER", "ORPH.", "VOISINS", "ZERO"];
let polyPts = [210, 395, 321, 370, 432, 395, 432, 425, 210, 425];

let polyRedDimond = [130, 620, 140, 600, 150, 620, 140, 640];
let polyBleckDimond = [130, 690, 140, 670, 150, 690, 140, 710];
let polyBottom_a = [60, 800, 148, 800, 163, 824, 97, 872];
let polyBottom_b = [97, 872, 163, 824, 202, 845, 174, 910];
let polyBottom_c = [174, 910, 202, 845, 258, 845, 286, 910];
let polyBottom_d = [286, 910, 258, 845, 296, 825, 363, 872];
let polyBottom_e = [363, 872, 296, 825, 310, 800, 398, 800];
let polyTop_a = [60, 240, 86, 172, 163, 216, 148, 240];
let polyTop_b = [86, 172, 144, 135, 191, 196, 163, 216];
let polyTop_c = [144, 135, 230, 119, 230, 188, 191, 196];
let polyTop_d = [230, 119, 315, 135, 268, 196, 230, 188];
let polyTop_e = [315, 135, 374, 172, 298, 215, 268, 196];
let polyTop_f = [374, 172, 396, 240, 310, 240, 298, 215];

let itsOval = false;

function loadroulette() {
    container.addChild(rouletteTable);
    app.stage.addChild(container);
    for (let i = 0; i < 50; i++) {
        rouletteText.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "normal" }, (i + 1)));
        container.addChild(rouletteText[i]);
        rouletteText[i].position.set(-200, -200);
    }
    for (let i = 0; i < 15; i++) {
        if (Math.floor(Math.random() * 37) % 2 == 0)
            rouletteNumber.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        else
            rouletteNumber.push(loadRolletText({ fill: colorRed, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        app.stage.addChild(rouletteNumber[i]);
        rouletteNumber[i].position.set(20 + i * 40, 60);
        rouletteNumber[i].text = Math.floor(Math.random() * 37) + "";
        rouletteNumber[i].visible = false;
    }
    container.visible = false;
}

function drawRoullete() {
    if (itsOval == false) {
        if (dynamicCounter > 0 && container.scale.x < 1.35) {
            container.scale.x += .035;
            container.scale.y += .035;
            container.x -= 13;
            container.y -= 34;
        }
        if (dynamicCounter < 0 && container.scale.x > 1) {
            container.scale.x -= .035;
            container.scale.y -= .035;
            container.x += 13;
            container.y += 34;
            if (container.scale.x < 1.06) {
                container.x = container.y = 0;
            }
        }
    }
    // rouletteTable.drawRect(0, 25, app.screen.width, 30);

    // drawRectangle_Table();
    // rouletteTable.drawRect(0, 525, app.screen.width, 500);
    //drawRectangle_Table();
    //draw_Oval_Table();
    // setroulette(true);
}

function draw_Oval_Table() {
    console.log("draw_Oval_Table");
    rouletteTable.clear();

    rouletteTable.lineStyle(2, colorLine); //yellow
    for (let i = 0; i < 13; i++) {
        if (i % 2 != 0) {
            rouletteTable.beginFill(colorRed);
        } else {
            rouletteTable.beginFill(colorBlock);
        }
        rouletteTable.drawRect(60, 240 + 43 * i, 88, 43);
        if (i % 2 == 0) {
            rouletteTable.beginFill(colorRed);
        } else {
            rouletteTable.beginFill(colorBlock);
        }
        rouletteTable.drawRect(310, 240 + 43 * i, 88, 43);
        rouletteText[i].position.set(90, 250 + 43 * i);
        rouletteText[i].text = val_Oval_Left[i];
        rouletteText[i + 13].position.set(340, 250 + 43 * i);
        rouletteText[i + 13].text = val_Oval_right[i];
    }
    // polyBottoma[4] = 163 + rx;
    // polyBottoma[5] = 824 + ry;

    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyTop_a);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyTop_b);
    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyTop_c);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyTop_d);
    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyTop_e);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyTop_f);


    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyBottom_a);
    rouletteTable.beginFill(colorGreen);
    rouletteTable.drawPolygon(polyBottom_b);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyBottom_c);
    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyBottom_d);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyBottom_e);

    for (let i = 0; i < 6; i++) {
        rouletteText[26 + i].text = val_Oval_top[i];

    }
    for (let i = 0; i < 5; i++) {
        rouletteText[32 + i].text = val_Ovalbottom[i];

    }

    rouletteText[26].position.set(100, 205);
    rouletteText[27].position.set(140, 165);
    rouletteText[28].position.set(190, 145);
    rouletteText[29].position.set(246, 145);
    rouletteText[30].position.set(304, 157);
    rouletteText[31].position.set(340, 205);

    rouletteText[32].position.set(102, 813);

    rouletteText[33].position.set(150, 850);
    rouletteText[34].position.set(220, 865);
    rouletteText[35].position.set(290, 855);
    rouletteText[36].position.set(340, 815);

    for (let i = 0; i < 4; i++) {
        rouletteText[37 + i].text = val_OvalCenter[i];
        rouletteText[37 + i].position.set(200, 390 + (120) * i);
    }


}

function drawRectangle_Table() {
    rouletteText[36].text = "0";
    rouletteText[37].text = "2 - 1";
    rouletteText[38].text = "2 - 1";
    rouletteText[39].text = "2 - 1";
    rouletteText[40].text = "1st - 12";
    rouletteText[41].text = "2nd - 12";
    rouletteText[42].text = "3rd - 12";
    rouletteText[43].text = "1 - 18";
    rouletteText[44].text = "EVEN";
    rouletteText[47].text = "ODD";
    rouletteText[48].text = "19 - 36";
    for (let i = 40; i < 49; i++) {
        rouletteText[i].rotation = (Math.PI * .5);
    }

    rouletteTable.clear();

    rouletteTable.lineStyle(2, colorLine); //yellow
    rouletteTable.beginFill(colorGreen);
    rouletteTable.drawPolygon(polyPts);
    rouletteTable.beginFill(colorRed);
    rouletteTable.drawPolygon(polyRedDimond);
    rouletteTable.beginFill(colorBlock);
    rouletteTable.drawPolygon(polyBleckDimond);
    for (let i = 0; i < 36; i++) {
        if ((i < 10 || (i > 18 && i < 28))) {
            if (i % 2 == 0) {
                rouletteTable.beginFill(colorRed);
            } else {
                rouletteTable.beginFill(colorBlock);
            }
        } else {
            if (i % 2 != 0) {
                rouletteTable.beginFill(colorRed);
            } else {
                rouletteTable.beginFill(colorBlock);
            }

        }
        rouletteTable.drawRect(210 + 74 * (i % 3), 425 + 38 * Math.floor(i / 3), 74, 38);
        rouletteText[i].position.set(210 + 74 * (i % 3) + 30, 8 + 425 + 38 * Math.floor(i / 3));
    }
    rouletteTable.endFill();
    rouletteText[36].position.set(310, 390);
    for (let i = 0; i < 3; i++) {
        rouletteTable.drawRect(210 + 74 * i, 881, 74, 38);
        rouletteText[37 + i].position.set(210 + 74 * i + 20, 881 + 6);
    }
    for (let i = 0; i < 3; i++) {
        rouletteTable.drawRect(160, 425 + 152 * i, 50, 152);
        rouletteText[40 + i].position.set(200, 460 + 152 * i);
    }
    for (let i = 0; i < 6; i++) {
        rouletteTable.drawRect(110, 425 + 76 * i, 50, 76);
        if (i != 2 && i != 3)
            rouletteText[43 + i].position.set(150, 430 + 76 * i);
    }

    // rouletteTable.scale.set(2,2);
    // rouletteTable.position.set(-100,-100)
}

function loadRolletText(style_var, str) {
    var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
    return text;
}


function setroulette(isvisible) {//set visiblity of bat button and coin
    sprite_repeat.visible = isvisible;
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
        container.visible = isvisible;
        draw_Oval_Table();
    } else {
        container.visible = true;
        drawRectangle_Table();
    }
    for (let i = 0; i < rouletteNumber.length; i++) {
        rouletteNumber[i].visible = true;
    }
}