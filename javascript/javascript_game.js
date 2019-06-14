  // vars iniciales
  var canvas = document.getElementById('canvas');
  var ctx    = canvas.getContext('2d');

  // vars

  var interval;
  var frames = 0;
  var bulletsArray = [];
  var meteorArray = [];
  var ufoArray = [];
  var gameover = false;



  var random; 

   // <--- star constructor --->

  // constructor (el backgrund al final)

  //backgound

  class Background {
    constructor(x,y,w,h){
      
      this.x = 0;
      this.y = 0;
      this.w = 800;
      this.h = 600;

      // call image 
      this.img = new Image();
      this.img.src = 'img/metalback1_2.png';

    }
    draw = () =>{
      
      if(this.y > +canvas.height) {
        this.y = 0;
      }
      
      this.y++;
      ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
      ctx.drawImage(this.img, this.x, this.y - this.h, this.w, this.h);

      
    }
  }

  class BackgroundMet {
    constructor(){
      
      this.x = 0;
      this.y = 0;
      this.w = 800;
      this.h = 600;

      // call image 
      this.img = new Image();
      this.img.src = 'img/metalback_meteor.png';
    }
    draw = () =>{
      if(this.y > +canvas.height) {
        this.y = 0;
      }
      
      this.y++;
      ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
      ctx.drawImage(this.img, this.x, this.y - this.h, this.w, this.h);
    }
  }



  //player constructor
  class Player {
      constructor(x,y,w,h,maskx,masky,maskw,maskh) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life  = 3;

        this.maskx = maskx;
        this.masky = masky;
        this.maskw = maskw;
        this.maskh = maskh;

        //call img

        this.img = new Image();
        this.img.src = 'img/playerone_1.png';       
      }
      draw = function() {
        
        ctx.drawImage(
          this.img,
          (frames%5)*(286/5),
          0,
          53,
          98,
          this.x,
          this.y,
          (286/5),
          98);
      }
      crashWith(meteor){
        return (this.x < meteor.x + meteor.w)&&
               (this.x + this.w > meteor.x)&&
               (this.y  < meteor.y + meteor.h)&&
               (this.y + this.h > meteor.y)
      }
     
  }
  

  //meteor constructor
  class Meteor {
      constructor(x,y,w,h,maskx,masky,maskw,maskh) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.maskx = maskx;
        this.masky = masky;
        this.maskw = maskw;
        this.maskh = maskh;
      

        //call img

        this.img = new Image();
        this.img.src = 'img/meteor2.png';
      }
      draw = () => {
        this.y += 1.8;
        ctx.drawImage(
          this.img,
          (frames % 5)*(960/30),
          0,
          31,
          32,
          this.x,
          this.y,
          (960/30), 
          32);
        
      }
      crashWith(player){
        return (this.x < player.x + player.w)&&
               (this.x + this.w > player.x)&&
               (this.y  < player.y + player.h)&&
               (this.y + this.h > player.y)
      }
  }

 

  //ufo constructor
  class Ufo {
      constructor(x,y,w,h,maskx,masky,maskw,maskh) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.maskx = maskx;
        this.masky = masky;
        this.maskw = maskw;
        this.maskh = maskh;

        //call img

        this.img = new Image();
        this.img.src = 'img/ufo.png'
      }
      draw = () => {
        this.y += 1.6;
        ctx.drawImage(
          this.img,
          (frames%9)*(673/12),
          0,
          55,
          32,
          this.x,
          this.y,
          673/12,
          32);
      }
      crashWith(player){
        return (this.x < player.x + player.w)&&
               (this.x + this.w > player.x)&&
               (this.y  < player.y + player.h)&&
               (this.y + this.h > player.y)
      }
  }


  //bullets constructor

  class Bullet{
      constructor(x,y,w,h,maskx,masky,maskw,maskh){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.maskx = maskx;
        this.masky = masky;
        this.maskw = maskw;
        this.maskh = maskh;
        
        //call img
         

        this.img = new Image();
        this.img.src = 'img/bullet_8.png'
      }
      draw() {
          this.y -= 4;
          ctx.drawImage(this.img, 0, 0, 6, 38, this.x, this.y, 6, 38)
          // ctx.fillStyle = 'yellow';
          // ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        crashWith(player){
          return (this.x < player.x + player.w)&&
                 (this.x + this.w > player.x)&&
                 (this.y  < player.y + player.h)&&
                 (this.y + this.h > player.y)
        }
  }



 //Bullets generate
 
 function generateBullets() {
  bulletsArray.push(new Bullet(player.x  + 26 ,player.y-10,6,38));
  sound = new Audio();
        sound.src = ('aud/shoot.mp3');
        sound.play();
}

function drawBullets() {
  bulletsArray.forEach(function(bullet, i) {
      bullet.draw();
      
    })
}





//enemies meteor

function createMeteor(){
  if (frames % 320 === 0){
    meteorArray.push(new Meteor(random, -20 ,20,20));
  }
};

function drawMeteor(){
  meteorArray.forEach(function(meteor,j){
    meteor.draw();
  })

};



//enemies Ufo

function createUfo(){
  if (frames % 200 === 0){
    ufoArray.push(new  Ufo(random, -10 ,40,40));
  }
};

function drawUfo(){
  ufoArray.forEach(function(ufos,k){
    ufos.draw();
  })
};


  // collision

  function collitionGame(){
  
    ufoArray.forEach((ufo,ei) => {
      if (player.crashWith(ufo)){
          ufoArray.splice(ei,1);
          player.life--;

          sound = new Audio();
          sound.src = ('aud/impact_slug_1.mp3');
          sound.play();
          
          console.log(player.life);
            
      }
      bulletsArray.forEach((bullet,bi) => {
        if (bullet.crashWith(ufo)){
          ufoArray.splice(ei,1);  
          bulletsArray.splice(bi,1);
          score = score + 100;

          sound = new Audio();
          sound.src = ('aud/collition.mp3');
          sound.play();
        } 
      })
      
    })
    meteorArray.forEach((meteor, di) => {
      if (player.crashWith(meteor)){
        meteorArray.splice(di,1);
        player.life--;

          sound = new Audio();
          sound.src = ('aud/impact_slug_1.mp3');
          sound.play();

        console.log(player.life);
      }
      bulletsArray.forEach((bullet,ai) => {
        if (meteor.crashWith(bullet)){
          meteorArray.splice(di, 1);
          bulletsArray.splice(ai,1);
          score = score + 100;

          sound = new Audio();
          sound.src = ('aud/collition.mp3');
          sound.play();
        }
      })

    })

  };

  // player lifes

  function playerLifes(){
    var lifesPlayer =  player.life;

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = 'yellow';
    ctx.fillText ('1UP = ' + lifesPlayer, 10,40);

    }

  // score
  
  var score = 0;

  function scorePlay(){
    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = 'yellow';
    ctx.fillText ('score ' + score, 600,40 );

    
    
    
   
  }

  //declare constructors

  var background = new Background;
  var metback = new BackgroundMet;
  var player =  new Player (375, 450, 56,98);
  

  
  

  // draw function
  function draw(){
    
      // console.log(frames);
      ctx.clearRect(0,0, canvas.width, canvas.height);
      
      background.draw(ctx);
      metback.draw(ctx);
      drawBullets();
      player.draw(ctx);

      
      
      
      drawMeteor();
      createMeteor();
      drawUfo();
      createUfo();
      collitionGame();
      playerLifes();
      scorePlay();
      score;
      gameOver();
      
      
      frames++;
      random = (Math.floor(Math.random()* 800));
  }

 

  function gameOver() {
    if(player.life === 0) {
      clearInterval(interval);
      
      ctx.font = 'bold 100px sans-serif';
      ctx.fillStyle = 'red';
      ctx.fillText('GAME OVER',100,300);

      ctx.font = '50px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText('Press enter to continue', 150,350);
      gameover = true;

      sound = new Audio();
      sound.src = ('aud/game_over.mp3');
      sound.play();

      
    }
    
}



function start(){
  interval = setInterval(draw, 1000/1000);
  
 
 };
 
 
  // LISTENERS

  window.addEventListener('keydown', e => {
      if(e.keyCode === 38){
        player.y -= 20;
        
      }
      if(e.keyCode === 40){
        player.y += 20;
      }
      if(e.keyCode === 37){
        player.x -= 20;
      }
      if(e.keyCode === 39){
        player.x += 20;
      }
      if (e.keyCode === 32){
        generateBullets();
      }
      if(e.keyCode === 83){
        
      }
      if (gameover && e.keyCode === 13){
        location.reload();
       
      }
    })

    start();