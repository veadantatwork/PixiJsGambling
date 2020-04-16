
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
var state;

// Background Sprite
var background;

//For Animation counter
var count = 100;

//Move horizontal variable
var goOut = 0;

//currently selected Coin
var selCoin = 0;

//base position of Flying coins
const posx = 500, posy = 710;

//const bposx= 170 , bposy = 685;

//Flying coins speed
const speed = 5;

//Flying coins sprites small
var coinArray = Array(6);

//Flying coins sprites small big
var coinArrayBig = Array(6);

//ANTE sprites
var spriteAnte,spriteBonus;



//Ante to table move coin objects
var selSprite = Array();

//Ante selected coin object
var selBigSprite = Array();

var selSprite3 = Array();

//Create a Pixi Application
let app = new Application({ width: 540, height: 1024, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });

//Add the canvas that Pixi automatically created for you to the HTML document
var element = document.getElementById("anim");
element.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader.add(["assets/bonus.png","assets/ante.png","assets/0.png", "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/background.jpeg",])
    .on("progress", loadProgressHandler).load(setup);

function loadProgressHandler(loader, resource) {
    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //If you gave your files names with the `add` method, you can access
    //them like this
    //console.log("loading: " + resource.name);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%");
}

function setup() {
    //Load Background
    background = new Sprite(resources["assets/background.jpeg"].texture);
    app.stage.addChild(background);

    //Load Flying coins small
    for (let i = 0; i < coinArray.length; i++) {
        coinArray[i] = loadSprite("assets/" + i + ".png", i, posx, posy, 1);
    }

    //Load Flying coins big
    for (let i = 0; i < coinArray.length; i++) {
        coinArrayBig[i] = loadSprite("assets/" + i + ".png", i + 6, posx, posy, 1.5);
        coinArrayBig[i].visible = i==0;
    }

    //Load ANTE
    spriteAnte = loadSprite("assets/ante.png", 100, 270, 840, 1);
    spriteBonus = loadSprite("assets/bonus.png", 101, 165, 690, 1);



    //Rendering function gameLoop
    state = play;
    app.ticker.add(delta => gameLoop(delta));
    app.renderer.plugins.interaction.on('pointerup', touchEvent);

}
function touchEvent(event){
    console.log(event.data.global.x.toFixed(2)+"  "+event.data.global.y.toFixed(2));
    spriteAnte.interactive = true;
    spriteAnte.buttonMode = true;
    spriteBonus.interactive = true;
    spriteBonus.buttonMode = true;



    // do  {sendCoinonTable(spriteAnte.x, spriteAnte.y,320,458);}
    spriteAnte.on('pointerdown', onButtonClick1);
    spriteBonus.on('pointerdown', onButtonClick2);
    //
    //
    //   do{sendCoinonTable(spriteBonus.x, spriteBonus.y, 150, 450);}
    //  while (spriteBonus.on('pointerdown', onButtonClick));

}


function gameLoop(delta)
{
    state(delta);

}

//Loading sprite function
function loadSprite(str, tag, x, y, s) {

    // create sprite object

    let sprite = new Sprite(resources[str].texture);


    // object callback on click event and identify by tag in function
    //if tag less then zero then sprite does not have onclick event
    if (tag > -1) {
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.myCustomProperty = tag;
        sprite.on('pointerdown', onButtonClick);

    } else {
        sprite.myCustomProperty = 100;

    }
    //Position set
    sprite.x = x;sprite.y = y;
    //Scaling set
    sprite.scale.set(s, s);
    //anchor set
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    //Flying object movement setting its used only for Flying object
    sprite.vx = Math.sin((tag) * 36 * (Math.PI / 180)) * speed;
    sprite.vy = Math.cos((tag) * 36 * (Math.PI / 180)) * speed;
    app.stage.addChild(sprite);
    return sprite;
}

function openFly(e){
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
}
function closeFlyAfterOpen(e){
    console.log("closeFlyAfterOpen  ")
    for (let i = 0; i < coinArray.length; i++) {
        coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
        coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
        if (e.target.myCustomProperty < 6){
            coinArrayBig[i].visible = e.target.myCustomProperty==i;
            selCoin = e.target.myCustomProperty;
        }
    }
    if(e.target.myCustomProperty < 6){
        selSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1));
        selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 270, 840, 1.5));
        // return;
    }
    goOut = 0.2;
    count = 0;
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

    sprite.vx = Math.sin(thita*(Math.PI / 180))*speed;
    sprite.vy = -Math.cos(thita*(Math.PI / 180))*speed;



    console.log(thita.toFixed(2)+" "+sprite.vx.toFixed(2)+ "  ~~~~~~~~~~  " +sprite.vy.toFixed(2));

    app.stage.addChild(sprite);
    selSprite3.push(sprite);
}




function onButtonClick(e) {


    if (goOut != 0) {
        //if Flying object movement is running than return
        return;
    }
    if(e.target.myCustomProperty == 100){
        //if click on ANTE then set Animation for ante to table coin Animation
        selSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 170, 740, 1));
        selBigSprite.push(loadSprite("assets/" + selCoin + ".png", -1, 170, 700, 1.5));
        return;
    }

    //Click on any flying object then perform action
    //if flying object is close
    if (coinArray[2].x > posx - 10) {
        //set animation for open flying animation
        for (let i = 0; i < coinArray.length; i++) {
            coinArray[i].x = posx;
            coinArray[i].y = posy;
            //set animation direction of small coins
            coinArray[i].vx = -Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
            coinArray[i].vy = Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
        }
        // set Position of big coin of flying
        for (let i = 0; i < coinArray.length; i++) {
            coinArrayBig[i].x = posx;
            coinArrayBig[i].y = posy;
        }
        //set horizontal speed
        goOut = -0.2;
        //set animation counter
        count = 0;
    }
    else {//if flying object is open
        //set animation for close flying animation
        for (let i = 0; i < coinArray.length; i++) {
            //set animation direction of small coins
            coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;
            coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;
            if (e.target.myCustomProperty < 6){
                //set selected coin visible true
                coinArrayBig[i].visible = e.target.myCustomProperty==i;
                //set selected coin its use at the time ante click
                selCoin = e.target.myCustomProperty;
            }
        }
        //set horizontal speed
        goOut = 0.2;
        //set animation counter
        count = 0;

    }

}

function onButtonClick1()
{
    sendCoinonTable(spriteAnte.x, spriteAnte.y,320,458);
}

function onButtonClick2()
{
    sendCoinonTable(spriteBonus.x, spriteBonus.y, 150, 450);
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
            if (selSprite[i].y > 450) {
                selSprite[i].y -= 14;
                selSprite[i].x += 2;
            } else {
                if (selSprite[i].myCustomProperty > 0) {
                    selSprite[i].myCustomProperty--;
                    if (selSprite[i].myCustomProperty == 0) {
                        app.stage.removeChild(selSprite[i]);
                        selSprite.splice(i, 1);
                    }
                }
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
var getAngle = function (currX, currY, endX, endY) {
    var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);

    if (angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }

    return angle;
}
resize();



// resize screen depending on browser
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
