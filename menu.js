class Menu {
    constructor() {
        this.graphics = new PIXI.Graphics();
        this.lobby = this.loadButtom("lobby.png", "lobby", 360, 100);
        this.history = this.loadButtom("history.png", "history", 360, 200);
        this.logout = this.loadButtom("logout.png", "logout", 360, 300);
        this.close = this.loadButtom("close.png", "close", 460, 900);
        this.graphics.beginFill(0x474449); //gray
        this.graphics.drawRect(app.screen.width * .4, 55, app.screen.width * .6, app.screen.height);
        this.graphics.beginFill(0x433a41); //green
        this.graphics.drawRect(app.screen.width * .4, 55, app.screen.width * .6, 100);
        this.graphics.beginFill(0x433a41); //green
        this.graphics.drawRect(app.screen.width * .4, 255, app.screen.width * .6, 100);
        this.graphics.position.set(1000, 0);
        this.speed = 0;
        // app.stage.addChild(this.graphics);//add graphics in app view for drowing Rectangles
    }
    drawMenu() {
        if (this.graphics.x > 0 && this.graphics.x < 400) {
            this.graphics.x += this.speed;
            if (this.graphics.x > 300) {
                this.graphics.x = 400;
                app.stage.removeChild(this.graphics);
            }
        }

    }
    loadButtom(str, tag, x, y) {
        let sprite = new Sprite(resources[basepath + str].texture);//create strip
        sprite.interactive = true;//set interactive true for click event
        sprite.buttonMode = true;
        sprite.myCustomProperty = tag;//set tag for getting strip event
        sprite.on('pointerdown', this.onClick); // use for onclick event
        sprite.x = x;
        sprite.y = y;
        sprite.scale.set(1, 1);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        this.graphics.addChild(sprite);
        return sprite;
    }
    onClick(e) {
        console.log("menu e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "lobby":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;

                break;
            case "history":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;

                break;
            case "logout":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;

                break;
            case "close":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;

                break;
            default:
                break;
        }
    }
    open() {
        this.speed = -30;
        this.graphics.x = 300;
        app.stage.addChild(this.graphics);
    }

}