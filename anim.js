//Game canvas
let app = new Application({ width: 540, height: 1024, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });

var element = document.getElementById("anim");//HTML elemet for placing canvas for game
element.appendChild(app.view);//Add app view in html element
var basepath = "./assets/";
//Image string that uses in game 


var imageArr = [basepath + "logout.png", basepath + "lobby.png", basepath + "history.png", basepath + "close.png",
basepath + "oval.png", basepath + "ovalselect.png",
basepath + "rollet.png", basepath + "poker.png", basepath + "rolletOval.png",
basepath + "tableBonus.png", basepath + "tablePlay.png", basepath + "tableANTE.png", basepath + "opecity.png", basepath + "toolowbase.png",
basepath + "menu.png", basepath + "repeat.png", basepath + "undo.png", basepath + "bonus.png", basepath + "anteglow.png", basepath + "ante.png", basepath + "0.png",
basepath + "1.png", basepath + "2.png", basepath + "3.png", basepath + "4.png", basepath + "5.png", basepath + "6.png", basepath + "background.jpeg", basepath + "background1.jpeg"];
for (var i = 2; i < 15; i++) {
  imageArr.push(basepath + "cards/C" + i + ".png");//club card load
  imageArr.push(basepath + "cards/D" + i + ".png");//Dimond card load
  imageArr.push(basepath + "cards/H" + i + ".png");//Heart card load
  imageArr.push(basepath + "cards/S" + i + ".png");//Spade card load
}
// Load images
loader.add(imageArr).on("progress", loadProgressHandler).load(setup);

//for loading progress
function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

// Call after load all resources 
function setup() {
  document.addEventListener('touchstart', e => { toggleFullScreen(); }); //toggle fullscreen for mobile
  document.addEventListener('mousedown', e => { toggleFullScreen(); });  //toggle fullscreen for desktop
  background = new Sprite(resources[basepath + "background1.jpeg"].texture);//create background Sprite
  app.stage.addChild(background);//add background Sprite in app
  backRoulette = new Sprite(resources[basepath + "background.jpeg"].texture);//create background Sprite
  app.stage.addChild(backRoulette);//add background Sprite in app
  backRoulette.visible = background.visible = false;
  trans_Background = new Sprite(resources[basepath + "opecity.png"].texture);//create background Sprite
  app.stage.addChild(graphics);//add graphics in app view for drowing Rectangles


  tableBonus = loadSprite(basepath + "tableBonus.png", 113, 130, 435, 1);//create and add tableBonus Sprite in app view with click event 112
  tablePlay = loadSprite(basepath + "tablePlay.png", 114, 222, 460, 1);//create and add tablePlay Sprite in app view with click event 112
  tableANTE = loadSprite(basepath + "tableANTE.png", 115, 320, 460, 1);//create and add tableANTE Sprite in app view with click event 112
  tableBonus.visible = tablePlay.visible = tableANTE.visible = false;
  sprite_undo = loadSprite(basepath + "undo.png", 112, 500, 630, 1);//create and add undo Sprite in app view with click event 112
  sprite_repeat = loadSprite(basepath + "repeat.png", 111, 500, 810, 1);//create and add repeat Sprite in app view with click event 111
  sprite_menu = loadSprite(basepath + "menu.png", 110, 500, 560, 1);//create and add menu Sprite in app view with click event 110

  sprite_poker = loadSprite(basepath + "poker.png", 116, 280, 350, 1);//create and add poker Sprite in app view with click event 112
  sprite_roullete = loadSprite(basepath + "rollet.png", 117, 280, 500, 1);//create and add roullete Sprite in app view with click event 112
  sprite_roullete_Oval = loadSprite(basepath + "rolletOval.png", 118, 280, 650, 1);//create and add roullete Sprite in app view with click event 112
  sprite_ovalselect = loadSprite(basepath + "oval.png", 119, 500, 880, 1);//create and add repeat Sprite in app view with click event 111
  sprite_deselect = loadSprite(basepath + "ovalselect.png", 120, 500, 880, 1);//create and add repeat Sprite in app view with click event 111
  sprite_ovalselect.visible = sprite_deselect.visible = false;

  loadRollate();//load roulette object

  app.stage.addChild(trans_Background);//add background Sprite in app
  trans_Background.visible = false;
  // Require small coin for flying animation  



  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i] = loadSprite(basepath + "" + i + ".png", i, posx, posy, .5);//create and add coinArray Sprite in app view with click event i(0 to 5)
  }
  // Require big coin for flying animation  
  for (let i = 0; i < coinArrayBig.length; i++) {
    coinArrayBig[i] = loadSprite(basepath + "" + i + ".png", i + 6, posx, posy, 0.55);//create and add coinArrayBig Sprite in app view with click event i + 6(6 to 11)
    coinArrayBig[i].visible = selCoin == 0;//set visible big coin 
  }
  console.log("Boolean(10 > 9)" + Math.random());
  console.log(compRan());
  sprite_GlowAnte = loadSprite(basepath + "anteglow.png", -1, 270, 840, 1);//create and add sprite_GlowAnte Sprite in app view
  sprite_GlowAnte.vx = 1;//set sprite_GlowAnte scale 
  sprite_GlowAnte.vy = .01;//for animating glow by scale fector 
  // Require to load for ANTE button
  spriteAnte = loadSprite(basepath + "ante.png", 100, 270, 840, 1);//create and add Ante Sprite in app view with click event 100
  // Require to load for Bonus button
  sprite_bonus = loadSprite(basepath + "bonus.png", 101, 170, 688, 1);//create and add bonus in app view with click event 101
  txtBalance = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Balance Text in app view
  txtBat = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Bat Text in app view
  txtDydnamic = loadText({ fill: "#fafafa", fontSize: 25, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomLeft = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomLeft.position.set(10, 1000);
  txtbottomLeft.text = 'Left Test';
  txtbottomRight = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomRight.position.set(400, 1000);
  txtbottomRight.text = 'txtbottomRight Test';

  toolowbase = loadSprite_2(basepath + "toolowbase.png", 455, 710, 1.2);
  txtWait4Next = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });
  txtWait4Next.position.set(400, 700);
  txtWait4Next.text = 'Balance too low';
  txtWait4Next.myCustomProperty = 1;
  txtWait4Next.visible = false;
  for (var i = 0; i < 4; i++) {
    txt_4_card.push(loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" }));//create and add text for card like "player","dealer","High card" in app view
    txt_4_card[i].visible = false;
  }

  setVisible(true);//set visiblity of coins and button
  resetValue();//call function for reset app related values
  // timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
  //Calling play recursive for rendering 
  state = play;
  app.ticker.add(delta => gameLoop(delta));
  // document.addEventListener('keydown', dealWithKeyboard);
  app.renderer.plugins.interaction.on('pointerup', touchEvent);//add tuch event for roulette table
  setVisible(false);


  itsOval = true;
  // timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
  sprite_poker.visible = sprite_roullete.visible = true;
  sprite_roullete_Oval.visible = false
  // setRollate(true);
  // resetValue();
  // APP_SCREEN = APP_ROULLETE;
  txtbottomLeft.visible = false;
  txtbottomRight.visible = false;
  txtBalance.visible = false;
  txtBat.visible = false;
  txtDydnamic.visible = false;
  mSidemenu = new Menu();
}

//tuch event for roulette table
function touchEvent(event) {

  if (dynamicCounter > 0 && APP_SCREEN == APP_ROULLETE) {//Handle event at bet is on
    if (itsOval == true) {
      Handle_OvalTuch(event);//Handle event for Oval table
    } else {
      Handle_rectTuch(event);//Handle event for rect table
    }
    txtWait4Next.position.set(event.data.global.x, event.data.global.y - 50);
  }

}
//Game rendring in loop
function gameLoop(delta) { state(delta); }

//load strip comman function
function loadSprite(str, tag, x, y, s) {
  let sprite = new Sprite(resources[str].texture);//create strip
  if (tag > -1) {
    sprite.interactive = true;//set interactive true for click event
    sprite.buttonMode = true;
    sprite.myCustomProperty = tag;//set tag for getting strip event
    sprite.on('pointerdown', onButtonClick); // use for onclick event
  } else {
    sprite.myCustomProperty = 100;
  }
  sprite.x = x;
  sprite.y = y;
  sprite.scale.set(s, s);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.vx = Math.sin((tag) * 36 * (Math.PI / 180)) * speed;
  sprite.vy = Math.cos((tag) * 36 * (Math.PI / 180)) * speed;
  app.stage.addChild(sprite);
  sprite.visible = false;
  return sprite;
}

//load strip comman function
function loadSprite_2(str, x, y, s) {
  let sprite = new Sprite(resources[str].texture);
  sprite.position.set(x, y);
  sprite.scale.set(s, s);
  sprite.anchor.set(0.5, 0.5);
  app.stage.addChild(sprite);
  sprite.visible = false;
  return sprite;
}

function loadText(style_var, str) {
  var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
  text.visible = false;
  app.stage.addChild(text);
  return text;
}
function addCoin(x, y, val) {
  var coinstrip = loadRolletSprite(basepath + "6.png", x, y, 0.5);
  var txt = loadRolletText({ fill: colorWhite, fontSize: 40, fontWeight: "bold" }, val);
  txt.position.set(-txt.text.length * 10, -25);
  coinstrip.addChild(txt);
  return coinstrip;
}

//callback function for onclick event


function onButtonClick(e) {
  console.log("e.target.myCustomProperty = " + e.target.myCustomProperty);
  if (goOut != 0) {
    return;
  }
  switch (e.target.myCustomProperty) {
    case 119:
      itsOval = true;
      // draw_Oval_Table();
      setRollate(true);
      break;
    case 120:
      // drawRectangle_Table();
      itsOval = false;
      setRollate(true);
      break;
    case 116: //Click Poker
    APP_SCREEN = APP_POKER;
      timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
      dynamicCounter = 15;//restart dynamicCounter
      setVisible(true);//call when bet is oped
      resetValue();
      sprite_poker.visible = sprite_roullete.visible = sprite_roullete_Oval.visible = false;
      background.visible = true;
      tableBonus.visible = tablePlay.visible = tableANTE.visible = true;
      
      break;
    case 118: case 117: //Click Roullete
      // dynamicCounter = -1;//restart dynamicCounter
      itsOval = e.target.myCustomProperty == 118;
      timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
      sprite_poker.visible = sprite_roullete_Oval.visible = sprite_roullete.visible = false;
      setRollate(true);
      resetValue();
      APP_SCREEN = APP_ROULLETE;
      backRoulette.visible = true;
      break;
    case 113: case 114: case 115:
      if (dynamicCounter < 0) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(210, 350);
        txtWait4Next.text = "Wait for next game";
      }
      return;//click for menu button
    case 110: //click for menu button
    mSidemenu.open();
    return;
    case 111:
      if (APP_SCREEN == APP_ROULLETE) {

      } else {
        sendCoinonTable(500, 810, 320, 458);
      }
      return;//click for reapeat button
    case 112: undoValuse();
      return;//click for undo button
    case 101://click for bonus button
      if (coinValue[selCoin] > balance) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(sprite_bonus.x, sprite_bonus.y - 50);
        txtWait4Next.text = 'Balance too low ';
      } else {
        sendCoinonTable(170, 688, 135, 445);
      }
      return;
    case 100://click for ANTE button
      if (coinValue[selCoin] > balance) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(spriteAnte.x, spriteAnte.y - 50);
        txtWait4Next.text = 'Balance too low';
      } else {
        sendCoinonTable(270, 840, 320, 458);
        selBigSprite.push(loadSprite(basepath + "" + selCoin + ".png", -1, 270, 840, 0.6));
      }

      return;
    default:// click for all coinArrayBig & coinArray coin
      if (coinArray[2].x > posx - 10) { //coin flying open animation start
        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].x = posx;
          coinArray[i].y = posy;
          coinArray[i].vx = -Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin open
          coinArray[i].vy = Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;//set verticle direction for flying coin open
        }
        for (let i = 0; i < coinArray.length; i++) {
          coinArrayBig[i].x = posx;
          coinArrayBig[i].y = posy;
        }
        goOut = -0.2;//set horizontal direction for flying coin and bigcoin
        count = 0;//set cont for flying animation
      } else { ////coin flying cloase animation start

        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin close
          coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;//set verticle direction for flying coin close
          if (e.target.myCustomProperty < 6) {// set selCoin coin when click on small coin condition
            coinArrayBig[i].visible = e.target.myCustomProperty == i;// set visible true of big coin when click on respective small coin
            selCoin = e.target.myCustomProperty;// set selCoin coin when click on small coin
            console.log(i + " txtWait4Next.y = " + txtWait4Next.y);
          }
        }
        goOut = 0.2;//set horizontal direction for flying coin and bigcoin
        count = 0;//set cont for flying animation


        if (coinValue[selCoin] > balance) {
          txtWait4Next.myCustomProperty = 100;
          txtWait4Next.position.set(400, coinArray[selCoin].y - 50);
          txtWait4Next.text = 'Too low balance';
        }

      }
      return;
  }
}

// recursive callback function  for rendring
function play(delta) {

  switch (APP_SCREEN) {
    case APP_MENU:
      break;
    case APP_POKER:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      drawCards();// draw Card from form dynamicRect.js
      break;
    case APP_ROULLETE:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      drawRoullete();//Draw Roulette animation
      
      break;
  }

  mSidemenu.drawMenu();
  allcounter++;
}
//set timeout function for game dynamicCounter
function nextTurn() {
  clearTimeout(timeoutHandle);
  // console.log("dynamicCounter " + dynamicCounter);
  dynamicCounter--;
  timeoutHandle = setTimeout(nextTurn, 1000);//reset timeout function for game dynamicCounter

  if (APP_SCREEN == APP_POKER) {//set timer for poker
    if (dynamicCounter == 0) {//call when bet is closed
      setVisible(false);
    }
    if (dynamicCounter < -30) {//end of the game
      dynamicCounter = 15;//restart dynamicCounter
      setVisible(true);//call when bet is oped
      resetValue();
    }
  } else {//set timer for Roulette
    if (dynamicCounter == 0) {//call when bet is closed
      setRollate(false);
      newNumber.text = "" + Math.floor(Math.random() * 1000) % 37;
      newNumberColor = 0xff0000;
      blockNumber.forEach(element => {
        if (element == newNumber.text) {
          newNumberColor = 0x000000;
        }
      });
    }
    if (dynamicCounter < -30) {//end of the game
      dynamicCounter = 15;//restart dynamicCounter
      setRollate(true);//call when bet is oped
      resetValue();
      {
        for (let i = rollateNumber.length - 1; i > 0; i--) {
          rollateNumber[i].text = rollateNumber[i - 1].text;
          rollateNumber[i].style.fill = rollateNumber[i - 1].style.fill;
        }
        rollateNumber[0].text = newNumber.text;
        rollateNumber[0].style.fill = newNumberColor == 0xff0000 ? newNumberColor : 0xffffff;
        newNumber.visible = false;
      }



    }
  }

}
function setVisible(isvisible) {//set visiblity of bat button and coin
  sprite_menu.visible = true;
  sprite_repeat.visible = isvisible;
  sprite_undo.visible = isvisible;
  coinArray.forEach(element => { element.visible = isvisible; });
  coinArrayBig.forEach(element => {
    element.visible = false;
  }); coinArrayBig[selCoin].visible = isvisible;//set visible big coin 
  spriteAnte.visible = isvisible;
  sprite_bonus.visible = isvisible;
  sprite_GlowAnte.visible = isvisible;
  trans_Background.visible = false;

  txtbottomLeft.visible = true;
  txtbottomRight.visible = true;
  txtBalance.visible = true;
  txtBat.visible = true;
  txtDydnamic.visible = true;
  
}
function resetValue() {//reset game valuse
  currentbat = 0;//reset bet of game

  txtBalance.position.set(125, 3);//set text balance position 
  txtBat.position.set(450, 3);//set text bat position 
  txtDydnamic.position.set(125, 25);//set text Dydnamic rect value position 

  txtBalance.text = "" + balance;//set balance text
  txtBat.text = "" + currentbat;//set Bat text

  make_deck();//reset random values of 52 cards
  for (var i = 0; i < mSprit_Cards.length; i++) {
    app.stage.removeChild(mSprit_Cards[i]);//remove all cards that uses for player(2) dealer(5) and deal(5) 
  }
  mSprit_Cards.length = 0;
  for (var i = 0; i < 10; i++) {//asign all cards that uses for player(2) dealer(5) and deal(5) 
    mSprit_Cards.push(loadSprite_2(basepath + "cards/" + cards[i] + ".png", 100 + i * 34, 600, .25));
  }
  for (var i = 0; i < txt_4_card.length; i++) {
    txt_4_card[i].visible = false;//false visible text for card like "player","dealer","High card" in app view
  }
  while (value4undo.length) { value4undo.pop(); }//remove all bat from last game
  rolletCoin.removeCoins();//remove coin from roulette table
}
function make_deck() {//asign card valus
  var i;
  var j = 0;
  for (i = 2; i < 15; i++) {
    cards[j++] = "H" + i;
    cards[j++] = "D" + i;
    cards[j++] = "C" + i;
    cards[j++] = "S" + i;
  }
  // console.log(cards);
  shuffle();
  // console.log(cards);
}
function shuffle() {
  deck_index = 0;
  cards.sort(compRan);
}
function compRan() {
  return 0.5 - Math.random();
}
// resize screen as per secreen size
resize();
function resize() {
  var ratio = .53;
  if (window.innerWidth / window.innerHeight < .77) {
    ratio = window.innerWidth / window.innerHeight;
  }
  console.log("~~~" + (window.innerWidth / window.innerHeight));
  if (window.innerWidth / window.innerHeight >= ratio) {

    ancho = ~~(window.innerHeight * ratio);
    alto = window.innerHeight;
    app.view.style.position = 'absolute';
    app.view.style.width = ancho + 'px';
    app.view.style.height = alto + 'px';
    app.view.style.left = ~~((window.innerWidth - ancho) / 2) + 'px';
    app.view.style.top = '0px';

  } else {
    ancho = window.innerWidth;
    alto = ~~(window.innerWidth / ratio);
    app.view.style.position = 'absolute';
    app.view.style.width = ancho + 'px';
    app.view.style.height = alto + 'px';
    app.view.style.left = 0 + 'px';
    app.view.style.top = (window.innerWidth - (alto / 2)) + 'px';
  }
}
window.onresize = function (event) {
  console.log("ancho,alto");
  resize();
};
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // document.documentElement.requestFullscreen();

  }
}
