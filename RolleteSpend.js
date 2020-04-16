
// let zero = [];//4(0-3,12-15,26,32-35)5*4=20
// let voisins = [];//7(0-2-3, 4-7, 12-15,  18-21, 19-22, 25-26-28-29,  32-35)(10+5+5+5+5+10+5)
// let orph = [];//4(1, 6-9, 14-17,  17-21, 31-34)5*5
// let tier = [];//4(5-8, 10-11, 13-16,  23-24, 27-30,33-36)5*6


class Roulette {
    constructor() {
        // object for coin that place on table
        this.coinOval = [];
        this.coinRect = [];
        this.roulette4undo = [];
    }


    //Add coin when click on oval Zero
    addZero() {
        if (this.setBet(["zero"],4)) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin( 230, 800,coinValue[selCoin] * 3));
            ovalcontainer.addChild(addCoin( 230, 875,coinValue[selCoin]));
            container.addChild(ovalcontainer);
        
            this.coinOval.push(ovalcontainer);

            let zeroCOR = [[400, 155], [400, 395], [300, 664], [300, 820]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < zeroCOR.length; i++) {
                
                rectcontaner.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", zeroCOR[i][0], zeroCOR[i][1], 0.5));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
        }
    }

    //Add coin when click on oval Voisins
    addVoisins() {
        if (this.setBet(["voisins"],9)) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(loadRolletSprite(basepath + "6.png", 230, 660, 0.5));
            var txt = loadRolletText({ fill: colorWhite, fontSize: 16, fontWeight: "bold" }, coinValue[selCoin] * 9);
            txt.position.set(230 - txt.text.length * 4, 650);
            ovalcontainer.addChild(txt);

            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            let zeroCOR = [[356, 155], [190, 275], [400, 395], [400, 515], [190, 575], [245, 755], [300, 815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < zeroCOR.length; i++) {
                if (i == 0 || i == 5) {
                    rectcontaner.addChild(loadRolletSprite(basepath + "6.png", zeroCOR[i][0], zeroCOR[i][1], 0.5));
                    var txt = loadRolletText({ fill: colorWhite, fontSize: 16, fontWeight: "bold" }, coinValue[selCoin] * 2);
                    txt.position.set(zeroCOR[i][0] - txt.text.length * 4, zeroCOR[i][1] - 10);
                    rectcontaner.addChild(txt);
                } else
                    rectcontaner.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", zeroCOR[i][0], zeroCOR[i][1], 0.5));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);


            // currentbat += coinValue[selCoin] * 9;//set coin current value
            // balance -= coinValue[selCoin] * 9;//update balance
            // txtBalance.text = "" + balance;
            // txtBat.text = "" + currentbat;
            // value4undo.push(coinValue[selCoin] * 9);
            this.setVisible();
        }
    }
    //Add coin when click on oval ORPH
    addORPH() {
        if (this.setBet(["orph"],5)) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(loadRolletSprite(basepath + "6.png", 230, 460, 0.5));
            var txt = loadRolletText({ fill: colorWhite, fontSize: 16, fontWeight: "bold" }, coinValue[selCoin] * 4);
            txt.position.set(230 - txt.text.length * 4, 450);
            ovalcontainer.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", 355, 348, 0.3));
            ovalcontainer.addChild(txt);

            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);


            // rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);
            let zeroCOR = [[200, 185], [400, 275], [300, 455], [300, 515], [200, 815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < zeroCOR.length; i++) {
                rectcontaner.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", zeroCOR[i][0], zeroCOR[i][1], 0.4));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);


            // currentbat += coinValue[selCoin] * 5;//set coin current value
            // balance -= coinValue[selCoin] * 5;//update balance
            // txtBalance.text = "" + balance;
            // txtBat.text = "" + currentbat;
            // value4undo.push(coinValue[selCoin] * 5);
            this.setVisible();
        }
    }
    //Add coin when click on oval TIER
    addTIER() {
        if (this.setBet(["tier"],6)) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(loadRolletSprite(basepath + "6.png", 230, 300, 0.5));
            var txt = loadRolletText({ fill: colorWhite, fontSize: 16, fontWeight: "bold" }, coinValue[selCoin] * 6);
            txt.position.set(230 - txt.text.length * 4, 290);
            ovalcontainer.addChild(txt);

            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);


            // rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);
            let zeroCOR = [[300, 275], [250, 365], [200, 455], [350, 605], [400, 815]];
            // let zeroCOR = [[200,185],[400,275],[300,455],[300,515],[200,815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < zeroCOR.length; i++) {
                rectcontaner.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", zeroCOR[i][0], zeroCOR[i][1], 0.4));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);


            // currentbat += coinValue[selCoin] * 6;//set coin current value
            // balance -= coinValue[selCoin] * 6;//update balance
            // txtBalance.text = "" + balance;
            // txtBat.text = "" + currentbat;
            // value4undo.push(coinValue[selCoin] * 6);
            this.setVisible();
        }
    }

    //Add coin when click on oval Single number
    addOvalSingle(ox, oy, num) {
        var total = this.setBet([""+num],1);
        if (total) {
            let ovalcontainer = new PIXI.Container();
            // ovalcontainer.addChild(addCoin( ox, oy,total));
            ovalcontainer.addChild(loadRolletSprite(basepath + "" + selCoin + ".png", ox, oy, 0.4));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            num = Number(num) - 1;
            let rectcontaner = new PIXI.Container();
            if (num > -1){
                rectcontaner.addChild(addCoin( 145 + 103 * (num % 3) + 103 * .5, 155 + 60 * Math.floor(num / 3) + 30,total));
            }else{
                rectcontaner.addChild(addCoin( 295, 125,total));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);


            this.setVisible();
        }
    }


    //Add coin when click on Rect  table for number and combine number
    addRect(type,x, y) {
        var total = this.setBet(type,1);
        if (total) {
            let ovalcontainer = new PIXI.Container();
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            let rectcontaner = new PIXI.Container();
            rectcontaner.addChild(addCoin( x, y,total));
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);

        }

    }

    //set Visible for rect and oval table coin
    setVisible() {
        this.coinOval.forEach(element => {
            element.visible = itsOval;
        });
        this.coinRect.forEach(element => {
            element.visible = !itsOval;
        });
    }
    //remove coin at time game reset
    removeCoins() {
        console.log(this.coinOval.length + "  removeCoins  " + this.coinRect.length);
        while (this.coinOval.length > 0) {
            var sprite = this.coinOval.pop();
            container.removeChild(sprite);
        }
        while (this.coinRect.length > 0) {
            var sprite = this.coinRect.pop();
            container.removeChild(sprite);
        }
        console.log(this.coinOval.length + "  remove~~Coins  " + this.coinRect.length);
    }
    //undo coin at time click on undo button
    undoCoins() {
        console.log(this.coinOval.length + "  undoCoins  " + this.coinRect.length);
        if (this.coinOval.length > 0) {
            var sprite = this.coinOval.pop();
            container.removeChild(sprite);
        }
        if (this.coinRect.length > 0) {
            var sprite = this.coinRect.pop();
            container.removeChild(sprite);
        }

        var bat = this.roulette4undo.pop();
        currentbat -= bat.chip;
        balance += bat.chip;
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;


        console.log(this.coinOval.length + "  remove~~Coins  " + this.coinRect.length);
    }
    //repeat coin at time click on repeat button
    repeatCoins() {
        console.log(this.coinOval.length + "  repeatCoins  " + this.coinRect.length);
        if (this.coinOval.length > 0) {
            var repetcontainer = this.coinOval[this.coinOval.length - 1].clone();
            container.addChild(repetcontainer);
            this.coinOval.push(repetcontainer)
        }
        if (this.coinRect.length > 0) {
            var repetcontainer = this.coinRect[this.coinOval.length - 1].clone();
            container.addChild(repetcontainer);
            this.coinRect.push(repetcontainer)

        }
        console.log(this.coinOval.length + "  remove~~Coins  " + this.coinRect.length);
    }
    // Set bet for table
    setBet(type,val) {
        if (coinValue[selCoin] * val <= balance) {
            currentbat += coinValue[selCoin] * val;//set coin current value
            balance -= coinValue[selCoin] * val;//update balance
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            this.roulette4undo.push(new BatValuse(type,coinValue[selCoin] * val));
            console.log("  <===   "+JSON.stringify(this.roulette4undo));
            return getChipValueOn(type,this.roulette4undo);
        }
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.text = 'Balance too low ';
        return false;
    }
    


}