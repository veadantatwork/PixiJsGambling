//Game canvas
let app = new Application({ width: 540, height: 1024, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });
var element = document.getElementById("anim");//HTML elemet for placing canvas for game
element.appendChild(app.view);//Add app view in html element
//Image string that uses in game 
var imageArr = ["assets/menu.png", "assets/repeat.png", "assets/undo.png", "assets/bonus.png", "assets/anteglow.png", "assets/ante.png", "assets/0.png", "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/background.jpeg"];
for (var i = 2; i < 15; i++) {
  imageArr.push("assets/cards/C" + i + ".png");//club card load
  imageArr.push("assets/cards/D" + i + ".png");//Dimond card load
  imageArr.push("assets/cards/H" + i + ".png");//Heart card load
  imageArr.push("assets/cards/S" + i + ".png");//Spade card load
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

  background = new Sprite(resources["assets/background.jpeg"].texture);//create background Sprite
  app.stage.addChild(background);//add background Sprite in app
  app.stage.addChild(graphics);//add graphics in app view for drowing Rectangles
  sprite_undo = loadSprite("assets/undo.png", 112, 500, 610, 1);//create and add undo Sprite in app view with click event 112
  sprite_repeat = loadSprite("assets/repeat.png", 111, 500, 810, 1);//create and add repeat Sprite in app view with click event 111
  sprite_menu = loadSprite("assets/menu.png", 110, 500, 900, 1);//create and add menu Sprite in app view with click event 110
  // Require small coin for flying animation  
  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i] = loadSprite("assets/" + i + ".png", i, posx, posy, 1);//create and add coinArray Sprite in app view with click event i(0 to 5)
  }

  // Require big coin for flying animation  
  for (let i = 0; i < coinArrayBig.length; i++) {
    coinArrayBig[i] = loadSprite("assets/" + i + ".png", i + 6, posx, posy, 1.5);//create and add coinArrayBig Sprite in app view with click event i + 6(6 to 11)
    coinArrayBig[i].visible = selCoin == 0;//set visible big coin 
  }

  sprite_GlowAnte = loadSprite("assets/anteglow.png", -1, 270, 840, 1);//create and add sprite_GlowAnte Sprite in app view
  sprite_GlowAnte.vx = 1;//set sprite_GlowAnte scale 
  sprite_GlowAnte.vy = .01;//for animating glow by scale fector 
  // Require to load for ANTE button
  spriteAnte = loadSprite("assets/ante.png", 100, 270, 840, 1);//create and add Ante Sprite in app view with click event 100

  // Require to load for Bonus button
  sprite_bonus = loadSprite("assets/bonus.png", 101, 170, 688, 1);//create and add bonus in app view with click event 101

  txtBalance = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Balance Text in app view
  txtBat = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Bat Text in app view
  txtDydnamic = loadText({ fill: "#fafafa", fontSize: 25, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomLeft = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomLeft.position.set(10,1000);
  txtbottomLeft.text = 'Left Test';
  txtbottomRight = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomRight.position.set(400,1000);
  txtbottomRight.text = 'txtbottomRight Test';
  for (var i = 0; i < 4; i++) {
    txt_4_card.push(loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" }));//create and add text for card like "player","dealer","High card" in app view
    txt_4_card[i].visible = false;
  }



  setVisible(true);//set visiblity of coins and button
  resetValue();//call function for reset app related values
  timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter

  //Calling play recursive for rendering 
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

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

function loadText(style_var) {
  var text = new PIXI.Text('629.63 ', new PIXI.TextStyle(style_var));
  app.stage.addChild(text);
  return text;
}
//callback function for onclick event
function onButtonClick(e) {
  console.log("e.target.myCustomProperty = " + e.target.myCustomProperty);
  if (goOut != 0) {
    return;
  }
  switch (e.target.myCustomProperty) {
    case 110: return;//click for menu button
    case 111: sendCoinonTable(500, 810, 320, 458); return;//click for reapeat button
    case 112: undoValuse();
      return;//click for undo button
    case 101://click for bonus button
      sendCoinonTable(170, 688, 135, 445);
      return;
    case 100://click for ANTE button
      sendCoinonTable(270, 840, 320, 458);
      selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1.5));
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
          }
        }
        goOut = 0.2;//set horizontal direction for flying coin and bigcoin
        count = 0;//set cont for flying animation

      }
      return;
  }
}
// recursive callback function  for rendring
function play(delta) {
  coinAnim();// draw coin animation form coinAnim.js
  DrawDynamicRect();// draw Rect form dynamicRect.js
  drawCards();// draw Card from form dynamicRect.js
  allcounter++;
}
//set timeout function for game dynamicCounter
function nextTurn() {
  clearTimeout(timeoutHandle);
  // console.log("dynamicCounter " + dynamicCounter);
  dynamicCounter--;
  timeoutHandle = setTimeout(nextTurn, 1000);//reset timeout function for game dynamicCounter
  if (dynamicCounter == 0) {//call when bet is closed
    setVisible(false);
  }
  if (dynamicCounter < -30) {//end of the game
    dynamicCounter = 15;//restart dynamicCounter
    setVisible(true);//call when bet is oped
    resetValue();
  }

}
function setVisible(isvisible) {//set visiblity of bat button and coin
  sprite_repeat.visible = isvisible;
  sprite_undo.visible = isvisible;
  coinArray.forEach(element => { element.visible = isvisible; });
  coinArrayBig.forEach(element => {
    element.visible = false;
  }); coinArrayBig[selCoin].visible = isvisible;//set visible big coin 
  spriteAnte.visible = isvisible;
  sprite_bonus.visible = isvisible;
  sprite_GlowAnte.visible = isvisible;
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
  for (var i = 0; i < 9; i++) {//asign all cards that uses for player(2) dealer(5) and deal(5) 
    mSprit_Cards.push(loadSprite_2("assets/cards/" + cards[i] + ".png", 100 + i * 34, 600, .25));
  }
  for (var i = 0; i < txt_4_card.length; i++) {
    txt_4_card[i].visible = false;//false visible text for card like "player","dealer","High card" in app view
  }
  while (value4undo.length) { value4undo.pop(); }//remove all bat from last game
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
  console.log(cards);
  shuffle();
  console.log(cards);
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