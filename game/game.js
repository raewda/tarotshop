var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var i, hand, Timer;
var money = [];
var magicatack = [];
var boom = [];
var lives = 3; // Количество жизней 
var gamePaused = false; // Состояние паузы игры
var gameRunning = true; // Состояние игры
var startTime, currentTime=0, pauseTime, score=0; // Переменные для секундомера
// Загрузка ресурсов
var moneyimg = new Image();
moneyimg.src = '../img/money.png';
var shieldimg = new Image();
shieldimg.src = '../img/shield.png';
var magicatackimg = new Image();
magicatackimg.src = '../img/magicatack.png';
var handimg = new Image();
handimg.src = '../img/hand.png';
var boomimg = new Image();
boomimg.src = '../img/boom.png';
var fonimg = new Image();
fonimg.src = '../img/BG.png';

// Старт игры
fonimg.onload = function () {
  init();
  game();
};

// Совместимость с браузерами
var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    };
})();

// Начальные установки
function init() {
  startTime = Date.now(); // Начальное время для секундомера
  elapsedTime = 0; // Сброс времени

  canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    var width_canvas = document.getElementById("game").offsetWidth;
    var height_canvas = document.getElementById("game").offsetHeight;
    hand.x = mouseX * 600 / width_canvas - 25;
    hand.y = mouseY * 600 / height_canvas - 13;
  });
  Timer = 0;
  hand = { x: 100, y: 100, animx: 0, animy: 0, lives: lives };
}

// Основной игровой цикл
function game() {
  if (!gamePaused) {
    update();
    render();
  }
  requestAnimFrame(game);
}

// Функция обновления состояния игры
function update() {
  Timer++;
  if (Timer%50==0) {
    money.push({
      angle:0,
      dxangle:Math.random()*0.2-0.1,
      del:0,
      x:Math.random()*550,
      y:-50,
      dx:Math.random()*2-1,
      dy:Math.random()*2+1
      });

  }
  //выстрел
  if (Timer%30==0) {
    magicatack.push({x:hand.x+10,y:hand.y,dx:0,dy:-5.2});
    magicatack.push({x:hand.x+10,y:hand.y,dx:0.5,dy:-5});
    magicatack.push({x:hand.x+10,y:hand.y,dx:-0.5,dy:-5});
  }

  // Проверка столкновений
  for (i in money) {
    if (Math.abs(money[i].x + 25 - hand.x - 25) < 50 && Math.abs(money[i].y - hand.y) < 25 && !money[i].del) {
      boom.push({ x: hand.x - 25, y: hand.y - 25, animx: 0, animy: 0 });
      money[i].del = 1;
      hand.lives--; // Уменьшаем количество жизней
      if (hand.lives <= 0) {
        gameOver(); // Если жизни закончились, вызываем функцию Game Over
        console.log("gamePaused = " + gamePaused);

      }

    }
  }
  if (!gamePaused) {
    pauseTime=Date.now();
     currentTime = (pauseTime - startTime) / 1000;

  }

  console.log("currentTime = "+ score);

   for (i in money) {
     money[i].x=money[i].x+money[i].dx;
     money[i].y=money[i].y+money[i].dy;
     money[i].angle=money[i].angle+money[i].dxangle;

     //граничные условия (коллайдер со стенками)
     if (money[i].x<=0 || money[i].x>=550) money[i].dx=-money[i].dx;
     if (money[i].y>=650) money.splice(i,1);

     //проверим на столкновение
     for (j in magicatack) {

     if (Math.abs(money[i].x+25-magicatack[j].x-15)<50 && Math.abs(money[i].y-magicatack[j].y)<25) {
       //произошло столкновение

     //спавн взрыва
     boom.push({x:money[i].x-25,y:money[i].y-25,animx:0,animy:0});

     //помечаем на удаление
     money[i].del=1;
     magicatack.splice(j,1);break;
     }
     }
     //удаляем
     if (money[i].del==1)
    { 
      money.splice(i,1)
      score ++
    } 
   }

   //двигаем пули
   for (i in magicatack) {
     magicatack[i].x=magicatack[i].x+magicatack[i].dx;
     magicatack[i].y=magicatack[i].y+magicatack[i].dy;

     if (magicatack[i].y<-30) magicatack.splice(i,1);
   }

   //Анимация взрывов
   for (i in boom) {
     boom[i].animx=boom[i].animx+0.5;
     if (boom[i].animx>7) {boom[i].animy++; boom[i].animx=0}
     if (boom[i].animy>7) 
     boom.splice(i,1);
   }

   //анимация щита
   hand.animx=hand.animx+1;
     if (hand.animx>4) {hand.animy++; hand.animx=0}
     if (hand.animy>3) {
     hand.animx=0; hand.animy=0;
     }
}

// Функция Game Over
function gameOver() {

  // Показ кнопки перезапуска
  document.getElementById('br').style.display = 'block';
  document.getElementById('restartButton').style.display = 'block';
  if (document.getElementById('restartButton').style.display === 'block'){
    startTime = Date.now();
    currentTime=0;
      togglePause();
    score=0
  }
}

// Обработчик событий для кнопки перезапуска
document.getElementById('restartButton').addEventListener('click', function() {
  document.getElementById('br').style.display = 'none';
  document.getElementById('restartButton').style.display = 'none'; // Скрываем кнопку
  init();
  magicatack=[];
  boom=[];
  money=[];
  startTime = Date.now(); // Сброс секундомера
  elapsedTime = 0;
  score=0// Обнуление времени
  togglePause();
  // Переинициализация игры
});

// Функция для переключения паузы
function togglePause() {
  gamePaused = !gamePaused;

}

// Функция отрисовки
function render() {


  //очистка холста (не обязательно)
  context.clearRect(0, 0, 600, 600);
  context.drawImage(fonimg, 0, 0, 600, 600);
  for (i in magicatack) 
    context.drawImage(magicatackimg, magicatack[i].x, magicatack[i].y, 30, 30);
  context.drawImage(handimg, hand.x, hand.y);
  context.drawImage(shieldimg, 192*Math.floor(hand.animx),192*Math.floor(hand.animy),192,192, hand.x-25, hand.y-25, 100, 100);


  for (i in money) {
    context.save();
    context.translate(money[i].x+25, money[i].y+25);
    context.rotate(money[i].angle);
    context.drawImage(moneyimg, -25, -25, 50, 50);
    context.restore();
    
  }
  for (i in boom)
  context.drawImage(boomimg, 200*Math.floor(boom[i].animx),200*Math.floor(boom[i].animy),200,200, boom[i].x, boom[i].y, 70, 70);
  context.fillStyle = 'white';
  context.fonimgt = 'serif 100px Bebas Neue';
  context.fillText('Lives: ' + hand.lives, 300, 30);;

  context.fillStyle = 'white';
  context.fonimgt = 'serif 100px Bebas Neue';
  context.fillText('Time: ' + currentTime.toFixed(2) + ' sec', 500, 580);
  context.fillStyle = 'white';
  context.fonimgt = 'serif 100px Bebas Neue';
  context.fillText('Score: ' + score, 20, 580);


}


document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {

    togglePause(); 

  }
  else
  {

  }
});

game();