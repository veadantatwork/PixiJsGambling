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
    }else if (dynamicCounter > -2) {
        graphics.beginFill(0xff0000);
        txtDydnamic.text = "BETS CLOSED";
    }else{
        txtDydnamic.text = "WAIT FOR NEXT GAME";
    }
    graphics.drawRect(0, 25, app.screen.width, 30);

    if(dynamicCounter < -3 && dynamicCounter > -15){
        graphics.alpha = 0.25;
    graphics.beginFill(0x000000);
    graphics.drawRect(150, 525, app.screen.width-300, 100);
        for(var i=0;i<2;i++){
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(265+i*34,580);
        }
    }
    if(dynamicCounter <= -15 && dynamicCounter < -20){
        graphics.alpha = 0.25;
    graphics.beginFill(0x000000);
    graphics.drawRect(150, 525, app.screen.width-300, 100);
        for(var i=0;i<5;i++){
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(205+i*34,580);
        }
    }
    if(dynamicCounter <= -20 && dynamicCounter < -30){
        graphics.alpha = 0.25;
    graphics.beginFill(0x000000);
    graphics.drawRect(150, 525, app.screen.width-300, 100);
    graphics.drawRect(150, 640, app.screen.width-300, 100);
    for(var i=0;i<10;i++){
        mSprit_Cards[i].visible = true;
        mSprit_Cards[i].position.set(200+(i%5)*34,580+Math.floor(i/5)*115);
    }
    }
    

    
    

}


function drawCards(){
    for(var i=0;i<5;i++){

    }
}