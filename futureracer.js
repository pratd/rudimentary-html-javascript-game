            var x=200; //eje x player
           var y=500; // eje y player
           var dx=0;
           var vCar;
           var m=50;   //eje x obstacle
           var n=0;    //eje y obstacle
           var dn=0;
           var velocidad;   //velocity obstacle
           var desplazamiento_backg=0;
           var points=0;
           var image_enemy;
           var canwidth=625;
           var canheight=570;
           var myMusic;
           var mySound;
           var flag=0;
           var image_enemy1;
           var image_enemy2;
           var n1;
           var n2;
           var m1;
           var m2;
           var Obsarray=[ document.getElementById('enemy1'),
           document.getElementById('enemy2'), 
           document.getElementById('enemy3'),
           document.getElementById('enemy4'),
           document.getElementById('enemy5'),
           document.getElementById('enemy6'),
           document.getElementById('enemy7'),
           document.getElementById('enemy8'),
           document.getElementById('enemy9'),
           document.getElementById('enemy10') ];
           function init() {
               myMusic = new sound("3480374905.mp3");
               myMusic.play();
               mySound = new sound("explosion.mp3")
               velocidad=1;
               vCar=2;
               myCanvas = document.getElementById("mycanvas");
               context= myCanvas.getContext('2d');
               image_enemy=Obsarray[Math.floor(Math.random()*(9))];
               draw();
               setInterval(velocity, 2000);
               setTimeout(function(){ vCar++; }, 5000);
               
               setTimeout(function(){ vCar++; }, 10000);
               setTimeout(function(){ vCar++; }, 15000);
               setTimeout(function(){ vCar++; }, 20000);
               setTimeout(function(){ image_enemy1=Obsarray[Math.floor(Math.random()*(9))];
               n1 = n+(Math.random()*canheight/2); 
               if (m+100+Math.random()*100<canwidth){m1=m+100+Math.random()*100}
               else{m1=m-100-Math.random()*100};flag=1}, 5000);
               setTimeout(function(){ image_enemy1=Obsarray[Math.floor(Math.random()*(9))];
               image_enemy2=Obsarray[Math.floor(Math.random()*(9))]; n1 = n+(Math.random()*canheight/2); 
               n2 = n+(Math.random()*canheight/2); 
               if(m+100+Math.random()*100<canwidth){m1=m+100+Math.random()*100}
               else {m1=m-100-Math.random()*100}; if(m+200+Math.random()*100<canwidth){m2=m+200+Math.random()*100}
               else {m2=m-200-Math.random()*100};flag=2}, 7000);
               setTimeout(function(){ vCar++; image_enemy=document.getElementById('enemy10')}, 50000);
            }
            function sound(src) {
               this.sound = document.createElement("audio");
               this.sound.src = src;
               //this.sound = new Audio(this.sound.src);
               //this.sound.load();
               this.sound.setAttribute("preload", "auto");
               this.sound.setAttribute("controls", "none");
               this.sound.style.display = "none";
               document.body.appendChild(this.sound);
               this.play = function(){
                   this.sound.play();
               }
               this.stop = function(){
                   this.sound.pause();
               }    
            }

            function draw() {  //player
               context.clearRect (0,0, canwidth,canheight);//cleaning the canvas
               //draw player
               context.beginPath();
               var canvas= document.getElementById("mycanvas");
               desplazamiento_backg++;
               canvas.style.backgroundPosition="0 "+desplazamiento_backg+"px";
               var image = document.getElementById('source');
               context.drawImage(image, x, y, 70, 70);
               if (flag==1){
                   context.drawImage(image_enemy1, m1, n1, 70, 70);
               }
               if (flag==2){
                if (m+100 <= canwidth ){context.drawImage(image_enemy1, m1, n1, 70, 70); }
                   else {context.drawImage(image_enemy1, m1, n1, 70, 70);}
                if (m+200 <= canwidth ){context.drawImage(image_enemy2, m2, n2, 70, 70); }
                   else {context.drawImage(image_enemy1, m2, n2, 70, 70);}
               }
               //image enemy
               context.drawImage(image_enemy, m, n, 70, 70);
               context.closePath();
               //context.fillStyle = "yellow";//
               context.fill();
               x+=dx;
               //restrictions for borders
               if (x<=5 || x>=canwidth-70+5) dx=-dx;
               context.beginPath();
               context.closePath();
              // context.fillStyle = "red";//
               context.fill();
               n+=dn;
               n1+=dn;
               n2+=dn;
               if (n>=canheight){
                   n=0;
                   m=Math.round((canheight-35)*Math.random());
                   image_enemy=Obsarray[Math.floor(Math.random()*(9))];
                   points++;
               }
               if (n1>=canheight || n2>=canheight){
                   n1=0;
                   m1=Math.round((canheight-35)*Math.random());
                   image_enemy1=Obsarray[Math.floor(Math.random()*(9))];
                   points++;
               }
               if (n2>=canheight){
                   n2=0;
                   m2=Math.round((canheight-35)*Math.random());
                   image_enemy2=Obsarray[Math.floor(Math.random()*(9))];
                   points++;
               }
               if (n>460 &&( (m<x && x<m+70) || (m<x+70 && x+70<m+70) ) || 
               n1>460 &&( (m1<x && x<m1+70) || (m1<x+70 && x+70<m1+70) ) ||
               n2>460 &&( (m2<x && x<m2+70) || (m2<x+70 && x+70<m2+70) )){
                       context.clearRect (0,0, canwidth,canheight);//cleaning the canvas
                       context.font = "BOLD 60px comic sans MS, verdana, Arial";
                       context.fillStyle = "red";
                       context.textAlign = "center";
                       context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
                       score = document.getElementById("score");
                       score.innerHTML="SCORE: "+points;                       // Create a <p> node
                       n=0;
                       n1=0;
                       n2=0;
                       var image = document.getElementById('explosion');
                       mySound.play();
                       context.drawImage(image, x, y-40, 150, 150);
                       setTimeout(function(){location.reload(1)}, 2000);
                       } 
                       else{
                           requestAnimationFrame(draw);
                        }
            }
            function velocity() {
                dn=velocidad;
                if (velocidad<50) {
                    velocidad=velocidad+0.03;
                }
            }
            //@DK  mod
            document.onkeydown = function (event){
            var keycode = (window.event||event).keyCode;
            tecla=event.keyCode;
            if (tecla==65 || tecla==37) {dx=-vCar;} //arriba W
            if (tecla==68 || tecla==39) {dx=vCar;} //abajo S
            }