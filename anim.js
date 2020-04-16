let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;
var state;
var background;
var count = 100;
var goOut = 0;
var selCoin = 0;
const posx = 500, posy = 710;
const speed = 5;
var coinArray = Array(6);
var coinArrayBig = Array(6);
var spriteAnte,spritebonus;
var selSprite = Array();
var selBigSprite = Array();
let app = new Application({ width: 540, height: 1024, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });
var element = document.getElementById("anim");
element.appendChild(app.view);
loader.add(["assets/bonus.png","assets/ante.png","assets/0.png", "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/background.jpeg",])
  .on("progress", loadProgressHandler).load(setup);

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

function setup() {
  background = new Sprite(resources["assets/background.jpeg"].texture);
  app.stage.addChild(background);
  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i] = loadSprite("assets/" + i + ".png", i, posx, posy, 1);
  }
  for (let i = 0; i < coinArray.length; i++) {
    coinArrayBig[i] = loadSprite("assets/" + i + ".png", i + 6, posx, posy, 1.5);
    coinArrayBig[i].visible = i==0;
  }
  spriteAnte = loadSprite("assets/ante.png", 100, 270, 840, 1);
  spriteBonus = loadSprite("assets/bonus.png", 101, 170, 688, 1);
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) { state(delta); }
function loadSprite(str, tag, x, y, s) {
  let sprite = new Sprite(resources[str].texture);
  if (tag > -1) {
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.myCustomProperty = tag;
    sprite.on('pointerdown', onButtonClick);
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
function onButtonClick(e) {
  console.log("e.target.myCustomProperty = " + e.target.myCustomProperty);
  if (goOut != 0) {
    return;
  }
  if(e.target.myCustomProperty == 101){
    //selSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 170, 688, 1));
    sendCoinonTable(170, 688,135,445);
    // selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 170, 688, 1.5));
    return;
  }
  if(e.target.myCustomProperty == 100){
    //selSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1));
    sendCoinonTable(270, 840,320,458);
    selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1.5));
    return;
  }
  if (coinArray[2].x > posx - 10) {
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
  } else {
    for (let i = 0; i < coinArray.length; i++) {
      coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
      coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
      if (e.target.myCustomProperty < 6){
        coinArrayBig[i].visible = e.target.myCustomProperty==i;
        selCoin = e.target.myCustomProperty;
      }
    }
    goOut = 0.2;
    count = 0;
    
  }
  console.log(selSprite.length);
}
function play(delta) {
  if (count < (110 / speed)) {
    for (let i = 0; i < coinArray.length; i++) {
      coinArray[i].y += coinArray[i].vy;
      coinArray[i].x += coinArray[i].vx + goOut;
      coinArray[i].rotation = (Math.PI * speed * count) / 55;//(count*Math.PI)*0.02;
      coinArrayBig[i].x += goOut * 4;
    }
    count++;
  } else {
    goOut = 0;
    for (var i = 0; i < selSprite.length; i++) {
        if ((selSprite[i].ey > selSprite[i].y && selSprite[i].vy < 0)||(selSprite[i].ey < selSprite[i].y && selSprite[i].vy > 0)) {
            if (selSprite[i].myCustomProperty > 0) {
              selSprite[i].myCustomProperty--;
              if (selSprite[i].myCustomProperty == 0) {
                app.stage.removeChild(selSprite[i]);
                selSprite.splice(i, 1);
              }
            }
        }else{
          selSprite[i].y += selSprite[i].vy;
          selSprite[i].x += selSprite[i].vx;
        }
    }
    for (var i = 0; i < selBigSprite.length; i++) {
      if (selBigSprite[i].myCustomProperty > 0) {
        selBigSprite[i].myCustomProperty--;
        if (selBigSprite[i].myCustomProperty == 0) {
          app.stage.removeChild(selBigSprite[i]);
          selBigSprite.splice(i, 1);
        }
      }
    }
    
  }
}
function sendCoinonTable(stratx,starty,endx,endy){
  var vx = endx - stratx;
  var vy = endy - starty;

  var thita = getAngle(stratx,starty,endx,endy);

  let sprite = new Sprite(resources["assets/" + selCoin + ".png"].texture);
  sprite.x = stratx;
  sprite.y = starty;
  sprite.ex = endx;
  sprite.ey = endy;
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;

  sprite.vx = Math.sin(thita*(Math.PI / 180))*speed*2;
  sprite.vy = -Math.cos(thita*(Math.PI / 180))*speed*2;
  sprite.myCustomProperty = 100;
  console.log(thita.toFixed(2)+" "+sprite.vx.toFixed(2)+ "  ~~~~~~~~~~  " +sprite.vy.toFixed(2));

  app.stage.addChild(sprite);
  selSprite.push(sprite);
}
var getAngle = function(currX, currY, endX, endY) {
  var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);

  if (angle < 0) {
    angle = Math.abs(angle);
  } else {
    angle = 360 - angle;
  }

  return angle;
};
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