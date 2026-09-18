const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const gameOver = document.getElementById("gameOver");
const help = document.getElementById("help");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const menuButton = document.getElementById("menuButton");
const helpButton = document.getElementById("helpButton");
const closeHelp = document.getElementById("closeHelp");
const pauseButton = document.getElementById("pauseButton");

const scoreText = document.getElementById("score");
const hpText = document.getElementById("hp");
const waveText = document.getElementById("wave");
const finalScore = document.getElementById("finalScore");
const highscoreText = document.getElementById("highscore");

let W = 1280;
let H = 720;

function resizeCanvas() {
  canvas.width = W;
  canvas.height = H;
}

resizeCanvas();

let player;
let bullets = [];
let enemies = [];
let particles = [];

let score = 0;
let hp = 100;
let wave = 1;

let running = false;
let paused = false;

let keys = {};

let mouse = {
  x: W / 2,
  y: H / 2,
  down: false
};

let spawnTimer = 0;
let enemiesKilled = 0;
let enemiesNeeded = 8;

let highscore =
  Number(localStorage.getItem("spacebotsHighscore")) || 0;

highscoreText.textContent = highscore;


/* =========================
   START GAME
========================= */

function startGame() {

  menu.classList.add("hidden");
  gameOver.classList.add("hidden");
  game.classList.remove("hidden");

  score = 0;
  hp = 100;
  wave = 1;

  enemiesKilled = 0;
  enemiesNeeded = 8;

  bullets = [];
  enemies = [];
  particles = [];

  player = {
    x: W / 2,
    y: H - 120,
    size: 22,
    speed: 5,
    angle: -Math.PI / 2,
    cooldown: 0
  };

  spawnTimer = 0;

  running = true;
  paused = false;

  requestAnimationFrame(gameLoop);
}


/* =========================
   PLAYER
========================= */

function updatePlayer() {

  let dx = 0;
  let dy = 0;

  if (keys["w"] || keys["ArrowUp"]) {
    dy -= 1;
  }

  if (keys["s"] || keys["ArrowDown"]) {
    dy += 1;
  }

  if (keys["a"] || keys["ArrowLeft"]) {
    dx -= 1;
  }

  if (keys["d"] || keys["ArrowRight"]) {
    dx += 1;
  }

  if (dx !== 0 || dy !== 0) {

    const length = Math.hypot(dx, dy);

    dx /= length;
    dy /= length;

    player.x += dx * player.speed;
    player.y += dy * player.speed;
  }

  player.x = Math.max(25, Math.min(W - 25, player.x));
  player.y = Math.max(25, Math.min(H - 25, player.y));

  player.angle = Math.atan2(
    mouse.y - player.y,
    mouse.x - player.x
  );

  if (player.cooldown > 0) {
    player.cooldown--;
  }

  if (mouse.down) {
    shoot();
  }
}


/* =========================
   SHOOT
========================= */

function shoot() {

  if (player.cooldown > 0) {
    return;
  }

  player.cooldown = 12;

  bullets.push({
    x: player.x + Math.cos(player.angle) * 25,
    y: player.y + Math.sin(player.angle) * 25,
    vx: Math.cos(player.angle) * 12,
    vy: Math.sin(player.angle) * 12,
    size: 5
  });
}


/* =========================
   ENEMIES
========================= */

function spawnEnemy() {

  const side = Math.floor(Math.random() * 4);

  let x;
  let y;

  if (side === 0) {
    x = Math.random() * W;
    y = -30;
  }

  if (side === 1) {
    x = W + 30;
    y = Math.random() * H;
  }

  if (side === 2) {
    x = Math.random() * W;
    y = H + 30;
  }

  if (side === 3) {
    x = -30;
    y = Math.random() * H;
  }

  const types = [
    {
      hp: 30,
      speed: 1.2,
      size: 18,
      score: 20
    },
    {
      hp: 50,
      speed: 1.6,
      size: 21,
      score: 30
    },
    {
      hp: 80,
      speed: 0.8,
      size: 28,
      score: 60
    }
  ];

  const type =
    types[Math.floor(Math.random() * types.length)];

  enemies.push({
    x: x,
    y: y,
    hp: type.hp + wave * 3,
    maxHp: type.hp + wave * 3,
    speed: type.speed,
    size: type.size,
    score: type.score
  });
}


/* =========================
   UPDATE ENEMIES
========================= */

function updateEnemies() {

  for (let i = enemies.length - 1; i >= 0; i--) {

    const enemy = enemies[i];

    const angle = Math.atan2(
      player.y - enemy.y,
      player.x - enemy.x
    );

    enemy.x += Math.cos(angle) * enemy.speed;
    enemy.y += Math.sin(angle) * enemy.speed;

    const distance = Math.hypot(
      player.x - enemy.x,
      player.y - enemy.y
    );

    if (distance < player.size + enemy.size) {

      hp -= 0.5;

      createParticles(
        enemy.x,
        enemy.y,
        "#ff405c",
        5
      );

      enemies.splice(i, 1);
    }
  }
}


/* =========================
   BULLETS
========================= */

function updateBullets() {

  for (let i = bullets.length - 1; i >= 0; i--) {

    const bullet = bullets[i];

    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    if (
      bullet.x < -20 ||
      bullet.x > W + 20 ||
      bullet.y < -20 ||
      bullet.y > H + 20
    ) {

      bullets.splice(i, 1);
      continue;
    }

    for (let j = enemies.length - 1; j >= 0; j--) {

      const enemy = enemies[j];

      const distance = Math.hypot(
        bullet.x - enemy.x,
        bullet.y - enemy.y
      );

      if (distance < enemy.size + bullet.size) {

        enemy.hp -= 25;

        bullets.splice(i, 1);

        createParticles(
          bullet.x,
          bullet.y,
          "#55eaff",
          6
        );

        if (enemy.hp <= 0) {

          score += enemy.score;
          enemiesKilled++;

          createParticles(
            enemy.x,
            enemy.y,
            "#5de8ff",
            15
          );

          enemies.splice(j, 1);
        }

        break;
      }
    }
  }
}


/* =========================
   WAVES
========================= */

function updateWave() {

  if (enemiesKilled >= enemiesNeeded) {

    wave++;

    enemiesKilled = 0;

    enemiesNeeded = 8 + wave * 3;
  }
}


/* =========================
   PARTICLES
========================= */

function createParticles(x, y, color, amount) {

  for (let i = 0; i < amount; i++) {

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;

    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 30,
      color: color
    });
  }
}


function updateParticles() {

  for (let i = particles.length - 1; i >= 0; i--) {

    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.life--;

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}


/* =========================
   DRAW BACKGROUND
========================= */

function drawBackground() {

  ctx.fillStyle = "#030712";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#ffffff10";
  ctx.lineWidth = 1;

  for (let x = 0; x < W; x += 50) {

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  for (let y = 0; y < H; y += 50) {

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  /* sterren */

  ctx.fillStyle = "#ffffff";

  for (let i = 0; i < 80; i++) {

    const x = (i * 157) % W;
    const y = (i * 83) % H;

    ctx.fillRect(x, y, 2, 2);
  }
}


/* =========================
   DRAW PLAYER
========================= */

function drawPlayer() {

  ctx.save();

  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  ctx.shadowBlur = 25;
  ctx.shadowColor = "#31ddff";

  ctx.fillStyle = "#21b9ff";

  ctx.beginPath();

  ctx.moveTo(28, 0);
  ctx.lineTo(-18, -17);
  ctx.lineTo(-10, 0);
  ctx.lineTo(-18, 17);

  ctx.closePath();

  ctx.fill();

  ctx.shadowBlur = 0;

  /* cockpit */

  ctx.fillStyle = "#eaffff";

  ctx.beginPath();
  ctx.arc(2, 0, 6, 0, Math.PI * 2);
  ctx.fill();

  /* weapon */

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(8, -3, 28, 6);

  ctx.restore();
}


/* =========================
   DRAW ENEMY
========================= */

function drawEnemy(enemy) {

  ctx.save();

  ctx.translate(enemy.x, enemy.y);

  ctx.shadowBlur = 15;
  ctx.shadowColor = "#ff405c";

  ctx.fillStyle = "#d93655";

  ctx.beginPath();

  ctx.roundRect(
    -enemy.size,
    -enemy.size,
    enemy.size * 2,
    enemy.size * 2,
    7
  );

  ctx.fill();

  ctx.shadowBlur = 0;

  /* robot eye */

  ctx.fillStyle = "#fff";

  ctx.fillRect(
    -7,
    -4,
    14,
    8
  );

  /* HP bar */

  ctx.fillStyle = "#111";

  ctx.fillRect(
    -enemy.size,
    -enemy.size - 10,
    enemy.size * 2,
    4
  );

  ctx.fillStyle = "#4dff8a";

  ctx.fillRect(
    -enemy.size,
    -enemy.size - 10,
    enemy.size * 2 * (enemy.hp / enemy.maxHp),
    4
  );

  ctx.restore();
}


/* =========================
   DRAW BULLETS
========================= */

function drawBullets() {

  for (const bullet of bullets) {

    ctx.save();

    ctx.shadowBlur = 15;
    ctx.shadowColor = "#4deaff";

    ctx.fillStyle = "#bfffff";

    ctx.beginPath();

    ctx.arc(
      bullet.x,
      bullet.y,
      bullet.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
  }
}


/* =========================
   DRAW PARTICLES
========================= */

function drawParticles() {

  for (const p of particles) {

    ctx.globalAlpha = p.life / 30;

    ctx.fillStyle = p.color;

    ctx.fillRect(
      p.x,
      p.y,
      4,
      4
    );
  }

  ctx.globalAlpha = 1;
}


/* =========================
   DRAW EVERYTHING
========================= */

function draw() {

  drawBackground();

  drawParticles();
  drawBullets();

  for (const enemy of enemies) {
    drawEnemy(enemy);
  }

  drawPlayer();
}


/* =========================
   HUD
========================= */

function updateHUD() {

  scoreText.textContent = score;
  hpText.textContent = Math.max(0, Math.floor(hp));
  waveText.textContent = wave;
}


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

  if (!running) {
    return;
  }

  if (!paused) {

    updatePlayer();

    spawnTimer--;

    if (spawnTimer <= 0) {

      spawnEnemy();

      spawnTimer =
        Math.max(
          20,
          70 - wave * 4
        );
    }

    updateEnemies();
    updateBullets();
    updateParticles();
    updateWave();

    updateHUD();

    if (hp <= 0) {

      endGame();

      return;
    }

    draw();
  }

  requestAnimationFrame(gameLoop);
}


/* =========================
   GAME OVER
========================= */

function endGame() {

  running = false;

  if (score > highscore) {

    highscore = score;

    localStorage.setItem(
      "spacebotsHighscore",
      highscore
    );
  }

  finalScore.textContent = score;
  highscoreText.textContent = highscore;

  game.classList.add("hidden");
  gameOver.classList.remove("hidden");
}


/* =========================
   KEYBOARD
========================= */

window.addEventListener("keydown", function(event) {

  keys[event.key] = true;

  if (event.key === "p") {

    paused = !paused;
  }
});


window.addEventListener("keyup", function(event) {

  keys[event.key] = false;
});


/* =========================
   MOUSE
========================= */

canvas.addEventListener("mousemove", function(event) {

  const rect = canvas.getBoundingClientRect();

  mouse.x =
    (event.clientX - rect.left)
    * W / rect.width;

  mouse.y =
    (event.clientY - rect.top)
    * H / rect.height;
});


canvas.addEventListener("mousedown", function() {

  mouse.down = true;
});


window.addEventListener("mouseup", function() {

  mouse.down = false;
});


/* =========================
   BUTTONS
========================= */

startButton.onclick = startGame;

restartButton.onclick = startGame;

menuButton.onclick = function() {

  running = false;

  gameOver.classList.add("hidden");
  game.classList.add("hidden");
  menu.classList.remove("hidden");
};

pauseButton.onclick = function() {

  paused = !paused;
};

helpButton.onclick = function() {

  help.classList.remove("hidden");
};

closeHelp.onclick = function() {

  help.classList.add("hidden");
};


/* =========================
   FIRE BUTTON MOBILE
========================= */

const fireButton =
  document.getElementById("fireButton");

fireButton.addEventListener(
  "pointerdown",
  function(event) {

    event.preventDefault();
    mouse.down = true;
  }
);

fireButton.addEventListener(
  "pointerup",
  function(event) {

    event.preventDefault();
    mouse.down = false;
  }
);

fireButton.addEventListener(
  "pointercancel",
  function() {

    mouse.down = false;
  }
);


/* =========================
   MOBILE JOYSTICK
========================= */

const joystick =
  document.getElementById("joystick");

let joystickActive = false;

joystick.addEventListener(
  "pointerdown",
  function(event) {

    joystickActive = true;
    joystick.setPointerCapture(event.pointerId);
  }
);

joystick.addEventListener(
  "pointermove",
  function(event) {

    if (!joystickActive) return;

    const rect =
      joystick.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

    if (Math.abs(dx) > 15) {

      if (dx > 0) {
        keys["d"] = true;
        keys["a"] = false;
      } else {
        keys["a"] = true;
        keys["d"] = false;
      }
    }

    if (Math.abs(dy) > 15) {

      if (dy > 0) {
        keys["s"] = true;
        keys["w"] = false;
      } else {
        keys["w"] = true;
        keys["s"] = false;
      }
    }
  }
);

joystick.addEventListener(
  "pointerup",
  function() {

    joystickActive = false;

    keys["w"] = false;
    keys["a"] = false;
    keys["s"] = false;
    keys["d"] = false;
  }
);
