7) Can you please explain these animations
a)
sprite.vx = Math.sin((tag) * 36 * (Math.PI / 180)) * speed;
sprite.vy = Math.cos((tag) * 36 * (Math.PI / 180)) * speed;

Ans: this is only for flying animation coin and other is not using you may also comment we calculate again by point 17.b
    sprite.vx = 0; sin(0) 
    sprite.vy = 1; cos(0)

    sprite.vx = 0.58; sin(0) 
    sprite.vy = 0.80; cos(0)

    and so on...

    this give velocity of sprite and move coin position by vx,vy




b)coinArray[i].vx = -Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin open
coinArray[i].vy = Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;//set verticle direction for flying coin open
    sprite.vx = 0; sin(0) 
    sprite.vy = 1; cos(0)

    sprite.vx = 0.58; sin(0) 
    sprite.vy = 0.80; cos(0)

    and so on...

    this give velocity of sprite and move coin position by vx,vy

c)return 0.5 - Math.random();

getting random value from -0.5 to 0.5 we use this for suffle card array 


d)coinArray[i].rotation = (Math.PI * speed * count) / 55;//(count*Math.PI)*0.02;
360 coin ratation and convert degree to radian

e)sprite.vx = Math.sin(thita * (Math.PI / 180)) * speed * 2;
sprite.vy = -Math.cos(thita * (Math.PI / 180)) * speed * 2;

reverse calculation of point 17.b for close flying animation

f)var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);
    getting diraction for going one to other point 
    like 60 degree goes to left up direction

g)angle = Math.abs(angle);
 this gives positive valuse

h)mSprit_Cards[i].position.set(200 + (i % 5) * 34, 580 + Math.floor(i / 5) * 115);
i simplify this is for showin card

i= 0) mSprit_Cards[0].position.set(200 + (0) * 34, 580 + 0* 115);
i= 1) mSprit_Cards[1].position.set(200 + (1) * 34, 580 + 0* 115);
i= 2) mSprit_Cards[2].position.set(200 + (2) * 34, 580 + 0* 115);
i= 3) mSprit_Cards[3].position.set(200 + (3) * 34, 580 + 0* 115);
i= 4) mSprit_Cards[4].position.set(200 + (4) * 34, 580 + 0* 115);
i= 5) mSprit_Cards[5].position.set(200 + (0) * 34, 580 + 1* 115);
i= 6) mSprit_Cards[6].position.set(200 + (1) * 34, 580 + 1* 115);
i= 7) mSprit_Cards[7].position.set(200 + (2) * 34, 580 + 1* 115);
i= 8) mSprit_Cards[8].position.set(200 + (3) * 34, 580 + 1* 115);
i= 9) mSprit_Cards[9].position.set(200 + (4) * 34, 580 + 1* 115);



18) Can you explain the flow of the whole application ? Which Function is called in which orer through out the whole game ?

All varible define in file : reqVeriables.js
init and load all varible in : anim.js
all retangle and text render in : dynmicRect.js
all coin animation render in : coinanim.js


init application in anim.js

a: define pixi app view 
b: load images : loader.add(imageArr).on("progress", loadProgressHandler).load(setup);
c: give refrence sprite to loaded images in : setup()
d: app rendring in ticker(play) function: app.ticker.add(delta => gameLoop(delta));
e: all click event comes in : onButtonClick()
f: nextTurn timer for update dynamicConter for manage visiblity of coin and cards.
g: reset all valuse when comes in next game : resetValue()


19)Instead of Alert text for “out of balance” can I have for out of balance can I have Pop up text like in this reference video “Too low balance” 
and “Wait for next game” in the reference videos. The “wait for next game” pop ups when I click on ante or bonus or any other button which is visible 
at the the time when the dynamic strip says “wait for next game”
**Balance too low appears because my balance is 2200 and I click on 2500 coin
***Wait for the next game appears when I click on ante bonus or any other button when the dynamic strip is saying "wait for the next game ".

yes we can i will add and give you new build


20)Is the app running one simple timer or multiple timer events? and if multiple where are these multiple timer events?

in our game we use

a:) we use only one timer events and its call recursively 
    first call from statup function
    nextTurn() function


21) There is fading opacity on when I click on the coins and the coins open up.

i will add in new build