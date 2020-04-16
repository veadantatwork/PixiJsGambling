let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;
var state;
var background;
var count = 100;//for flying animation count 
var goOut = 0;//for fluing animation horizontal movment
var selCoin = 0;//selected coin 
const posx = 500, posy = 710;//flying coin init position
const speed = 5;//flying coin speed
var coinArray = Array(6);// object small coin for flying animation  
var coinArrayBig = Array(6);  // object big coin for flying animation  
var spriteAnte, sprite_bonus,sprite_GlowAnte; // button for ANTE and bouns

var txtBalance;//varible for showing balance text
var txtBat;//varible for showing balance text
var txtDydnamic;//varible for showing balance text
var txt_4_card = [];
var dynamicCounter = 15;

var currentbat = 0;
var balance = 1000;

var allcounter = 0;

var selSprite = Array();//coin object for coin to reach on table 
var selBigSprite = Array();//coin object for coin to place on ANTE 
var graphics = new PIXI.Graphics();

var cards = new Array(52);
var mSprit_Cards = [];

var sprite_repeat,sprite_undo; // button for undo and repeat
var value4undo = [];//valuse store that we bat

//"assets/repeat.png"