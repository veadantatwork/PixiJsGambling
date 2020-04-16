//Game canvas
let app = new Application({ width: 540, height: 1024, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });
var element = document.getElementById("anim");
element.appendChild(app.view);

var imageArr = ["assets/bonus.png", "assets/ante.png", "assets/0.png", "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/background.jpeg"];
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
  background = new Sprite(resources["assets/background.jpeg"].texture);
  app.stage.addChild(background);

  // Require small coin for flying animation  
  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i] = loadSprite("assets/" + i + ".png", i, posx, posy, 1);
  }

  // Require big coin for flying animation  
  for (let i = 0; i < coinArrayBig.length; i++) {
    coinArrayBig[i] = loadSprite("assets/" + i + ".png", i + 6, posx, posy, 1.5);
    coinArrayBig[i].visible = i == 0;
  }
  

  // Require to load for ANTE button
  spriteAnte = loadSprite("assets/ante.png", 100, 270, 840, 1);

  // Require to load for Bonus button
  sprite_bonus = loadSprite("assets/bonus.png", 101, 170, 688, 1);


  graphics.beginFill(0xFF0000);
  graphics.drawRect(0, 25, app.screen.width, 30);
  app.stage.addChild(graphics);

  style = new PIXI.TextStyle({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });

  txtBalance = new PIXI.Text('629.63 ', style);
  app.stage.addChild(txtBalance);

  txtBat = new PIXI.Text('250', style);
  app.stage.addChild(txtBat);

  style = new PIXI.TextStyle({ fill: "#fafafa", fontSize: 25, fontWeight: "normal" });
  txtDydnamic = new PIXI.Text('250 ', style);
  app.stage.addChild(txtDydnamic);

  resetValue();
  timeoutHandle = setTimeout(nextTurn, 1000);

  //Calling play recursive for rendering 
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) { state(delta); }

//load strip comman function
function loadSprite(str, tag, x, y, s) {
  let sprite = new Sprite(resources[str].texture);
  if (tag > -1) {
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.myCustomProperty = tag;
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
function loadSprite_2(str,x,y, s) {
  let sprite = new Sprite(resources[str].texture);
  sprite.position.set(x, y);
  sprite.scale.set(s, s);
  sprite.anchor.set(0.5, 0.5);
  app.stage.addChild(sprite);
  sprite.visible = false;
  return sprite;
}




//callback function for onclick event
function onButtonClick(e) {
  console.log("e.target.myCustomProperty = " + e.target.myCustomProperty);
  if (goOut != 0) {
    return;
  }
  switch (e.target.myCustomProperty) {
    case 101://click for bonus button
      sendCoinonTable(170, 688, 135, 445);
      return;
    case 100://click for ANTE button
      sendCoinonTable(270, 840, 320, 458);
      selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1.5));
      return;
    default:
      // click for all coinArrayBig & coinArray coin
      if (coinArray[2].x > posx - 10) { //coin flying open animation start
        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].x = posx;
          coinArray[i].y = posy;
          coinArray[i].vx = -Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
          coinArray[i].vy = Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
        }
        for (let i = 0; i < coinArray.length; i++) {
          coinArrayBig[i].x = posx;
          coinArrayBig[i].y = posy;
        }
        goOut = -0.2;
        count = 0;
      } else { ////coin flying cloase animation start
        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
          coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
          if (e.target.myCustomProperty < 6) {
            coinArrayBig[i].visible = e.target.myCustomProperty == i;
            selCoin = e.target.myCustomProperty;
          }
        }
        goOut = 0.2;
        count = 0;

      }
      return;
  }
}

// recursive callback function  for rendring
function play(delta) {
  coinAnim();
  DrawDynamicRect();
  allcounter++;
}

function nextTurn() {
  clearTimeout(timeoutHandle);
  // console.log("dynamicCounter " + dynamicCounter);
  dynamicCounter--;
  timeoutHandle = setTimeout(nextTurn, 1000);
  if (dynamicCounter == 0) {
    setVisible(false);
  }
  if (dynamicCounter < -30) {
    dynamicCounter = 15;
    setVisible(true);
    resetValue();
  }

}
function setVisible(isvisible) {
  coinArray.forEach(element => {
    element.visible = isvisible;
  });
  coinArrayBig.forEach(element => {
    element.visible = isvisible;
  });
  spriteAnte.visible = isvisible;
  sprite_bonus.visible = isvisible;

}
function resetValue() {
  currentbat = 0;

  txtBalance.position.set(125, 3);
  txtBat.position.set(450, 3);
  txtDydnamic.position.set(125, 25);

  txtBalance.text = "" + balance;
  txtBat.text = "" + currentbat;

  make_deck();
  for(var i=0;i<mSprit_Cards.length;i++){
    app.stage.removeChild(mSprit_Cards[i]);
  }
  mSprit_Cards.length = 0;
  for(var i=0;i<10;i++){
    mSprit_Cards.push(loadSprite_2("assets/cards/"+cards[i]+".png",100+i*34,600,.25));
  }

}
function make_deck() {
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