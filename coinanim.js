const coinValue = [2.5, 5, 25, 125, 500, 2500];

function coinAnim() {
    if (count < (110 / speed)) {//For flying animation counts
        for (let i = 0; i < coinArray.length; i++) {
            coinArray[i].y += coinArray[i].vy;
            coinArray[i].x += coinArray[i].vx + goOut;
            coinArray[i].rotation = (Math.PI * speed * count) / 55;//(count*Math.PI)*0.02;
            coinArrayBig[i].x += goOut * 4;
        }
        count++;
    } else {
        goOut = 0;
    }
    //for coin movment from bonus/ANTE to table
    for (var i = 0; i < selSprite.length; i++) {
        if ((selSprite[i].ey > selSprite[i].y && selSprite[i].vy < 0) || (selSprite[i].ey < selSprite[i].y && selSprite[i].vy > 0)) {
            if (selSprite[i].myCustomProperty > 0) {
                selSprite[i].myCustomProperty--;
                if (selSprite[i].myCustomProperty == 0) {
                    app.stage.removeChild(selSprite[i]);
                    selSprite.splice(i, 1);
                }
            }
        } else {
            selSprite[i].y += selSprite[i].vy;
            selSprite[i].x += selSprite[i].vx;
        }
    }
    //for coin show on ANTE
    for (var i = 0; i < selBigSprite.length; i++) {
        if (selBigSprite[i].myCustomProperty > 0) {
            selBigSprite[i].myCustomProperty--;
            if (selBigSprite[i].myCustomProperty == 0) {
                app.stage.removeChild(selBigSprite[i]);
                selBigSprite.splice(i, 1);
            }
        }
    }

    if (dynamicCounter > 0) {
        sprite_GlowAnte.scale.set(sprite_GlowAnte.vx, sprite_GlowAnte.vx);
        if (sprite_GlowAnte.vx > 1.2) {
            sprite_GlowAnte.vy = -.01;
        }
        if (sprite_GlowAnte.vx < 1.0) {
            sprite_GlowAnte.vy = 0.01;
        }
        sprite_GlowAnte.vx += sprite_GlowAnte.vy;
    }

}

//Common function for movment coin from one place to other
function sendCoinonTable(stratx, starty, endx, endy) {
    console.log(selCoin + "   " + coinValue[selCoin] + " ++ " + balance);
    if (coinValue[selCoin] > balance) {
        alert("You don't have enough coins");
        return;
    }


    var thita = getAngle(stratx, starty, endx, endy);//Get direction angle

    let sprite = new Sprite(resources["assets/" + selCoin + ".png"].texture);
    sprite.x = stratx;
    sprite.y = starty;
    sprite.ex = endx;
    sprite.ey = endy;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    //Get direction update vlaue
    sprite.vx = Math.sin(thita * (Math.PI / 180)) * speed * 2;
    sprite.vy = -Math.cos(thita * (Math.PI / 180)) * speed * 2;
    sprite.myCustomProperty = 100;
    console.log(thita.toFixed(2) + " " + sprite.vx.toFixed(2) + "  ~~~~~~~~~~  " + sprite.vy.toFixed(2));

    app.stage.addChild(sprite);
    selSprite.push(sprite);

    currentbat += coinValue[selCoin];//set coin current value
    balance -= coinValue[selCoin];//update balance
    txtBalance.text = "" + balance;
    txtBat.text = "" + currentbat;


}

//get angle for getting direction of movment
var getAngle = function (currX, currY, endX, endY) {
    var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);

    if (angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }

    return angle;
};

