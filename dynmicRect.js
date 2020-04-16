function DrawDynamicRect() {
    graphics.clear();
    graphics.alpha = 1;
    if (dynamicCounter > 5) {
        if (allcounter % 20 > 10)
            graphics.beginFill(0x00aa00);
        else
            graphics.beginFill(0x00bb00);
        txtDydnamic.text = "PLACE YOUR BETS " + dynamicCounter;
    } else if (dynamicCounter > 0) {
        if (allcounter % 20 > 10)
            graphics.beginFill(0xff6000);
        else
            graphics.beginFill(0xd95200);
        txtDydnamic.text = "PLACE YOUR BETS " + dynamicCounter;
    } else if (dynamicCounter > -2) {
        graphics.beginFill(0xff0000);
        txtDydnamic.text = "......BETS CLOSED......";
    } else {
        graphics.beginFill(0x999999);
        txtDydnamic.text = "WAIT FOR NEXT GAME";
    }
    graphics.drawRect(0, 25, app.screen.width, 30);
    graphics.beginFill(0x13463d);
    graphics.drawRect(0, 525, app.screen.width, 500);
    drawCards();
}



function drawCards() {
    if (dynamicCounter < -3 && dynamicCounter > -15) {
        drawText(0,"PLAYER",240,528);
        drawText(1,"HIGH CARD",230,607);
        graphics.alpha = 0.25;
        graphics.beginFill(0x000000);
        graphics.drawRect(150, 525, app.screen.width - 300, 100);
        for (var i = 0; i < 2; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(255 + i * 34, 580);
        }
    }
    if (dynamicCounter <= -15 && dynamicCounter > -20) {
        
        graphics.alpha = 0.25;
        graphics.beginFill(0x000000);
        graphics.drawRect(150, 525, app.screen.width - 300, 100);
        for (var i = 0; i < 5; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(205 + i * 34, 580);
        }
    }
    if (dynamicCounter <= -20 && dynamicCounter > -30) {
        drawText(0,"DEALER WINS",240,528);
        drawText(1,"HIGH CARD",230,607);
        
        drawText(2,"PLAYER",240,643);
        drawText(3,"HIGH CARD",230,720);
        

        graphics.alpha = 0.25;
        graphics.beginFill(0x000000);
        graphics.drawRect(150, 525, app.screen.width - 300, 100);
        graphics.drawRect(150, 640, app.screen.width - 300, 100);
        for (var i = 0; i < 10; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(200 + (i % 5) * 34, 580 + Math.floor(i / 5) * 115);
        }
    }
}

function drawText(no,str,x,y){
    txt_4_card[no].text = str;
    txt_4_card[no].position.set(x,y);
    txt_4_card[no].visible = true;
}