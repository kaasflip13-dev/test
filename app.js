const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const mini = document.getElementById("mini");
const mctx = mini.getContext("2d");


/* =========================
   ELEMENTEN
========================= */

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const panel = document.getElementById("panel");

const startBtn = document.getElementById("start");
const continueBtn = document.getElementById("cont");

const closeBtn = document.getElementById("close");

const pauseBtn = document.getElementById("pause");
const pauseBox = document.getElementById("pauseBox");

const resumeBtn = document.getElementById("resume");

const overBox = document.getElementById("over");
const winBox = document.getElementById("win");

const againBtn = document.getElementById("again");
const again2Btn = document.getElementById("again2");

const menuBtn1 = document.getElementById("m1");
const menuBtn2 = document.getElementById("m2");
const menuBtn3 = document.getElementById("m3");

const scoreEl = document.getElementById("score");
const waveEl = document.getElementById("wave");
const killsEl = document.getElementById("kills");
const comboEl = document.getElementById("combo");

const hpEl = document.getElementById("hp");
const shieldEl = document.getElementById("sh");
const energyEl = document.getElementById("en");

const gunEl = document.getElementById("gun");

const highscoreEl = document.getElementById("hs");
const bestWaveEl = document.getElementById("bw");
const creditsEl = document.getElementById("cr");

const finalEl = document.getElementById("final");

const bossBox = document.getElementById("boss");
const bossNameEl = document.getElementById("bn");
const bossHpEl = document.getElementById("bh");


/* =========================
   SAVE
========================= */

let saveData;

try {
    saveData = JSON.parse(
        localStorage.getItem("spacebotsSave")
    );
} catch {
    saveData = null;
}


if (!saveData) {

    saveData = {
        highscore: 0,
        bestWave: 0,
        credits: 500,

        selectedSkin: 0,
        selectedWeapon: 0,
        selectedMap: 0,

        unlockedSkins: [0],
        unlockedWeapons: [0],
        unlockedMaps: [0],

        damage: 0,
        armor: 0,
        shield: 0,
        energy: 0,
        speed: 0,

        sound: true
    };
}


function save() {

    localStorage.setItem(
        "spacebotsSave",
        JSON.stringify(saveData)
    );

    updateMenuStats();
}


function updateMenuStats() {

    highscoreEl.textContent =
        saveData.highscore;

    bestWaveEl.textContent =
        saveData.bestWave;

    creditsEl.textContent =
        saveData.credits;
}


updateMenuStats();


/* =========================
   WAPENS
========================= */

const weapons = [

    {
        name: "BLASTER",
        damage: 20,
        cooldown: 14,
        speed: 12,
        bullets: 1,
        spread: 0,
        price: 0
    },

    {
        name: "TRIPLE SHOT",
        damage: 13,
        cooldown: 22,
        speed: 11,
        bullets: 3,
        spread: 0.22,
        price: 150
    },

    {
        name: "PLASMA",
        damage: 45,
        cooldown: 35,
        speed: 8,
        bullets: 1,
        spread: 0,
        price: 300
    },

    {
        name: "LASER",
        damage: 30,
        cooldown: 7,
        speed: 18,
        bullets: 1,
        spread: 0,
        price: 500
    },

    {
        name: "NOVA",
        damage: 18,
        cooldown: 28,
        speed: 10,
        bullets: 5,
        spread: 0.6,
        price: 750
    },

    {
        name: "VOID CANNON",
        damage: 90,
        cooldown: 55,
        speed: 7,
        bullets: 1,
        spread: 0,
        price: 1200
    }

];


/* =========================
   SKINS
========================= */

const skins = [

    {
        name: "DEFAULT",
        price: 0,
        wave: 0,
        c1: "#43ddff",
        c2: "#185fff",
        shape: 0
    },

    {
        name: "RED FURY",
        price: 150,
        wave: 0,
        c1: "#ff5268",
        c2: "#a51831",
        shape: 1
    },

    {
        name: "TOXIC",
        price: 300,
        wave: 0,
        c1: "#7dff4d",
        c2: "#168f3a",
        shape: 2
    },

    {
        name: "VOID",
        price: 500,
        wave: 0,
        c1: "#d56cff",
        c2: "#5420a5",
        shape: 3
    },

    {
        name: "GOLD",
        price: 750,
        wave: 0,
        c1: "#ffe06a",
        c2: "#b87912",
        shape: 1
    },

    {
        name: "ICE",
        price: 0,
        wave: 5,
        c1: "#e4ffff",
        c2: "#55bfff",
        shape: 2
    },

    {
        name: "SHADOW",
        price: 0,
        wave: 10,
        c1: "#aab4c5",
        c2: "#202837",
        shape: 3
    },

    {
        name: "GALAXY",
        price: 1500,
        wave: 0,
        c1: "#ff7cff",
        c2: "#5d54ff",
        shape: 4
    }

];


/* =========================
   KAARTEN
========================= */

const maps = [

    {
        name: "NEON GRID",
        wave: 0,
        background: "#050b19",
        grid: "#ffffff12"
    },

    {
        name: "CRIMSON MOON",
        wave: 3,
        background: "#19090d",
        grid: "#ff334422"
    },

    {
        name: "VOID TEMPLE",
        wave: 5,
        background: "#0d0718",
        grid: "#c24cff22"
    },

    {
        name: "TOXIC PLANET",
        wave: 7,
        background: "#07170d",
        grid: "#4cff7722"
    },

    {
        name: "STAR FORGE",
        wave: 10,
        background: "#15100a",
        grid: "#ffdc6622"
    }

];


/* =========================
   ROBOTS
========================= */

const enemyTypes = [

    {
        name: "SCOUT",
        hp: 35,
        speed: 1.7,
        size: 17,
        score: 20,
        color: "#54e6ff"
    },

    {
        name: "DRONE",
        hp: 45,
        speed: 1.3,
        size: 20,
        score: 25,
        color: "#64ff8a"
    },

    {
        name: "HUNTER",
        hp: 65,
        speed: 1.7,
        size: 19,
        score: 35,
        color: "#ffdf58"
    },

    {
        name: "BRUTE",
        hp: 130,
        speed: 0.7,
        size: 29,
        score: 70,
        color: "#ff6b4a"
    },

    {
        name: "SNIPER",
        hp: 75,
        speed: 0.6,
        size: 20,
        score: 80,
        color: "#d68cff"
    },

    {
        name: "DASHER",
        hp: 55,
        speed: 2.7,
        size: 18,
        score: 55,
        color: "#ff5cff"
    },

    {
        name: "TANK",
        hp: 240,
        speed: 0.45,
        size: 34,
        score: 120,
        color: "#8ca0b8"
    },

    {
        name: "ELITE",
        hp: 270,
        speed: 1.05,
        size: 25,
        score: 220,
        color: "#ff466f"
    },

    {
        name: "CYBER",
        hp: 160,
        speed: 1.4,
        size: 23,
        score: 150,
        color: "#43ffef"
    },

    {
        name: "VOID",
        hp: 350,
        speed: 0.8,
        size: 31,
        score: 300,
        color: "#b44cff"
    }

];


/* =========================
   GAME VARIABELEN
========================= */

let player;

let enemies = [];
let bullets = [];
let enemyBullets = [];
let particles = [];

let running = false;
let paused = false;

let score = 0;
let wave = 1;
let kills = 0;

let waveKills = 0;
let waveTarget = 8;

let spawnTimer = 0;

let combo = 0;
let comboTimer = 0;

let boss = null;

let keys = {};

let mouse = {
    x: 640,
    y: 360,
    down: false
};

let moveStick = {
    x: 0,
    y: 0
};

let aimStick = {
    x: 0,
    y: 0
};

let mobileFire = false;

let lastTime = 0;


/* =========================
   START
========================= */

function startGame() {

    menu.classList.add("hide");

    panel.classList.add("hide");

    game.classList.remove("hide");

    overBox.classList.add("hide");
    winBox.classList.add("hide");
    pauseBox.classList.add("hide");

    score = 0;
    wave = 1;
    kills = 0;

    waveKills = 0;
    waveTarget = 8;

    combo = 0;
    comboTimer = 0;

    enemies = [];
    bullets = [];
    enemyBullets = [];
    particles = [];

    boss = null;

    bossBox.classList.add("hide");

    const armorBonus =
        saveData.armor * 10;

    const shieldBonus =
        saveData.shield * 10;

    const energyBonus =
        saveData.energy * 10;

    player = {

        x: 640,
        y: 560,

        size: 19,

        speed:
            3.2 +
            saveData.speed * 0.25,

        hp:
            100 +
            saveData.armor * 5,

        maxHp:
            100 +
            saveData.armor * 5,

        shield:
            60 +
            shieldBonus,

        maxShield:
            60 +
            shieldBonus,

        energy:
            100 +
            energyBonus,

        maxEnergy:
            100 +
            energyBonus,

        angle: -Math.PI / 2,

        shootCooldown: 0

    };

    running = true;
    paused = false;

    lastTime = performance.now();

    requestAnimationFrame(loop);
}


/* =========================
   SCHIETEN
========================= */

function shoot() {

    const weapon =
        weapons[
            saveData.selectedWeapon
        ];

    if (
        player.shootCooldown > 0
    ) {
        return;
    }

    if (player.energy < 2) {
        return;
    }

    player.shootCooldown =
        weapon.cooldown;

    player.energy -= 2;

    for (
        let i = 0;
        i < weapon.bullets;
        i++
    ) {

        const offset =
            i -
            (weapon.bullets - 1) / 2;

        const angle =
            player.angle +
            offset * weapon.spread;

        bullets.push({

            x:
                player.x +
                Math.cos(angle) * 28,

            y:
                player.y +
                Math.sin(angle) * 28,

            vx:
                Math.cos(angle) *
                weapon.speed,

            vy:
                Math.sin(angle) *
                weapon.speed,

            damage:
                weapon.damage +
                saveData.damage * 5,

            life: 100,

            size:
                weapon.name === "VOID CANNON"
                    ? 7
                    : 4

        });
    }
}


/* =========================
   ENEMY SPAWN
========================= */

function spawnEnemy() {

    const maximum =
        Math.min(
            enemyTypes.length,
            3 +
            Math.floor(
                wave / 2
            )
        );

    const type =
        enemyTypes[
            Math.floor(
                Math.random() *
                maximum
            )
        ];

    const side =
        Math.floor(
            Math.random() * 4
        );

    let x;
    let y;

    if (side === 0) {

        x =
            Math.random() * 1280;

        y = -40;

    } else if (side === 1) {

        x = 1320;

        y =
            Math.random() * 720;

    } else if (side === 2) {

        x =
            Math.random() * 1280;

        y = 760;

    } else {

        x = -40;

        y =
            Math.random() * 720;
    }


    const hp =
        type.hp +
        wave * 4;


    enemies.push({

        name: type.name,

        x: x,
        y: y,

        hp: hp,
        maxHp: hp,

        speed:
            type.speed *
            (1 + wave * 0.015),

        size: type.size,

        score: type.score,

        color: type.color,

        shootTimer:
            Math.random() * 150 + 80

    });
}


/* =========================
   UPDATE PLAYER
========================= */

function updatePlayer(dt) {

    let dx = 0;
    let dy = 0;

    if (
        keys["w"] ||
        keys["ArrowUp"]
    ) {
        dy--;
    }

    if (
        keys["s"] ||
        keys["ArrowDown"]
    ) {
        dy++;
    }

    if (
        keys["a"] ||
        keys["ArrowLeft"]
    ) {
        dx--;
    }

    if (
        keys["d"] ||
        keys["ArrowRight"]
    ) {
        dx++;
    }


    dx += moveStick.x;
    dy += moveStick.y;


    const length =
        Math.hypot(dx, dy);


    if (length > 0) {

        dx /= length;
        dy /= length;

        player.x +=
            dx *
            player.speed *
            dt;

        player.y +=
            dy *
            player.speed *
            dt;
    }


    player.x =
        Math.max(
            25,
            Math.min(
                1255,
                player.x
            )
        );


    player.y =
        Math.max(
            25,
            Math.min(
                695,
                player.y
            )
        );


    if (
        aimStick.x !== 0 ||
        aimStick.y !== 0
    ) {

        player.angle =
            Math.atan2(
                aimStick.y,
                aimStick.x
            );

    } else {

        player.angle =
            Math.atan2(
                mouse.y - player.y,
                mouse.x - player.x
            );
    }


    if (
        player.shootCooldown > 0
    ) {

        player.shootCooldown -= dt;
    }


    if (
        mouse.down ||
        mobileFire
    ) {

        shoot();
    }


    player.energy =
        Math.min(
            player.maxEnergy,
            player.energy +
            0.3 * dt
        );


    if (
        player.shield <
        player.maxShield
    ) {

        player.shield =
            Math.min(
                player.maxShield,
                player.shield +
                0.03 * dt
            );
    }
}


/* =========================
   UPDATE ENEMIES
========================= */

function updateEnemies(dt) {

    for (
        let i = enemies.length - 1;
        i >= 0;
        i--
    ) {

        const enemy =
            enemies[i];


        const angle =
            Math.atan2(
                player.y - enemy.y,
                player.x - enemy.x
            );


        enemy.x +=
            Math.cos(angle) *
            enemy.speed *
            dt;

        enemy.y +=
            Math.sin(angle) *
            enemy.speed *
            dt;


        enemy.shootTimer -= dt;


        if (
            enemy.shootTimer <= 0
        ) {

            enemyShoot(enemy);

            enemy.shootTimer =
                Math.random() *
                140 +
                100 -
                Math.min(
                    wave * 3,
                    60
                );
        }


        const distance =
            Math.hypot(
                player.x - enemy.x,
                player.y - enemy.y
            );


        if (
            distance <
            player.size +
            enemy.size
        ) {

            damagePlayer(
                0.7 * dt
            );

            burst(
                enemy.x,
                enemy.y,
                enemy.color,
                4
            );
        }
    }
}


/* =========================
   ENEMY SCHIETEN
========================= */

function enemyShoot(enemy) {

    const angle =
        Math.atan2(
            player.y - enemy.y,
            player.x - enemy.x
        );


    const speed =
        enemy.name === "SNIPER"
            ? 4
            : enemy.name === "ELITE"
                ? 3.4
                : 2.6;


    enemyBullets.push({

        x: enemy.x,
        y: enemy.y,

        vx:
            Math.cos(angle) *
            speed,

        vy:
            Math.sin(angle) *
            speed,

        damage:
            enemy.name === "BRUTE"
                ? 10
                : 5,

        life: 250

    });
}


/* =========================
   DAMAGE
========================= */

function damagePlayer(amount) {

    if (player.shield > 0) {

        player.shield -= amount;

        if (player.shield < 0) {

            player.hp +=
                player.shield;

            player.shield = 0;
        }

    } else {

        player.hp -= amount;
    }


    if (player.hp < 0) {
        player.hp = 0;
    }
}


/* =========================
   BULLETS
========================= */

function updateBullets(dt) {

    for (
        let i = bullets.length - 1;
        i >= 0;
        i--
    ) {

        const bullet =
            bullets[i];


        bullet.x +=
            bullet.vx * dt;

        bullet.y +=
            bullet.vy * dt;


        bullet.life -= dt;


        if (
            bullet.life <= 0 ||
            bullet.x < -50 ||
            bullet.x > 1330 ||
            bullet.y < -50 ||
            bullet.y > 770
        ) {

            bullets.splice(i, 1);

            continue;
        }


        let hit = false;


        /* BOSS */

        if (boss) {

            const distance =
                Math.hypot(
                    bullet.x - boss.x,
                    bullet.y - boss.y
                );


            if (
                distance <
                boss.size +
                bullet.size
            ) {

                boss.hp -=
                    bullet.damage;

                bullets.splice(i, 1);

                burst(
                    bullet.x,
                    bullet.y,
                    "#d56cff",
                    4
                );

                hit = true;
            }
        }


        if (hit) {
            continue;
        }


        /* ROBOTS */

        for (
            let j = enemies.length - 1;
            j >= 0;
            j--
        ) {

            const enemy =
                enemies[j];


            const distance =
                Math.hypot(
                    bullet.x - enemy.x,
                    bullet.y - enemy.y
                );


            if (
                distance <
                enemy.size +
                bullet.size
            ) {

                enemy.hp -=
                    bullet.damage;


                bullets.splice(i, 1);


                burst(
                    bullet.x,
                    bullet.y,
                    enemy.color,
                    6
                );


                if (
                    enemy.hp <= 0
                ) {

                    killEnemy(
                        enemy,
                        j
                    );
                }


                hit = true;

                break;
            }
        }
    }
}


/* =========================
   KILL ENEMY
========================= */

function killEnemy(enemy, index) {

    score +=
        enemy.score *
        (1 + combo * 0.1);


    kills++;

    waveKills++;

    combo++;

    comboTimer = 180;


    saveData.credits +=
        Math.max(
            1,
            Math.floor(
                enemy.score / 20
            )
        );


    burst(
        enemy.x,
        enemy.y,
        enemy.color,
        14
    );


    enemies.splice(
        index,
        1
    );


    save();
}


/* =========================
   ENEMY BULLETS
========================= */

function updateEnemyBullets(dt) {

    for (
        let i = enemyBullets.length - 1;
        i >= 0;
        i--
    ) {

        const bullet =
            enemyBullets[i];


        bullet.x +=
            bullet.vx * dt;

        bullet.y +=
            bullet.vy * dt;


        bullet.life -= dt;


        const distance =
            Math.hypot(
                bullet.x - player.x,
                bullet.y - player.y
            );


        if (
            distance <
            player.size + 5
        ) {

            damagePlayer(
                bullet.damage
            );

            burst(
                bullet.x,
                bullet.y,
                "#ff5268",
                6
            );

            enemyBullets.splice(
                i,
                1
            );

            continue;
        }


        if (
            bullet.life <= 0 ||
            bullet.x < -50 ||
            bullet.x > 1330 ||
            bullet.y < -50 ||
            bullet.y > 770
        ) {

            enemyBullets.splice(
                i,
                1
            );
        }
    }
}


/* =========================
   WAVE
========================= */

function updateWave() {

    if (
        !boss &&
        waveKills >= waveTarget &&
        enemies.length === 0
    ) {

        if (
            wave % 5 === 0
        ) {

            spawnBoss();

        } else {

            wave++;

            waveKills = 0;

            waveTarget =
                8 +
                wave * 3;
        }
    }


    if (
        comboTimer > 0
    ) {

        comboTimer--;

    } else {

        combo = 0;
    }
}


/* =========================
   BOSS
========================= */

function spawnBoss() {

    const maxHp =
        900 +
        wave * 180;


    boss = {

        x: 640,
        y: 100,

        hp: maxHp,
        maxHp: maxHp,

        size: 58,

        angle: 0,

        shootTimer: 80
    };


    bossNameEl.textContent =
        "VOID CORE";


    bossBox.classList.remove(
        "hide"
    );
}


/* =========================
   UPDATE BOSS
========================= */

function updateBoss(dt) {

    if (!boss) {
        return;
    }


    boss.x +=
        Math.sin(
            performance.now() / 700
        ) *
        0.8 *
        dt;


    boss.shootTimer -= dt;


    if (
        boss.shootTimer <= 0
    ) {

        bossShoot();

        boss.shootTimer = 55;
    }


    bossHpEl.style.width =
        Math.max(
            0,
            boss.hp /
            boss.maxHp *
            100
        ) + "%";


    if (
        boss.hp <= 0
    ) {

        burst(
            boss.x,
            boss.y,
            "#ffffff",
            60
        );


        boss = null;

        bossBox.classList.add(
            "hide"
        );


        if (
            wave >= 10
        ) {

            victory();

        } else {

            wave++;

            waveKills = 0;

            waveTarget =
                8 +
                wave * 3;
        }
    }
}


/* =========================
   BOSS SCHIETEN
========================= */

function bossShoot() {

    const angle =
        Math.atan2(
            player.y - boss.y,
            player.x - boss.x
        );


    for (
        let i = -2;
        i <= 2;
        i++
    ) {

        const a =
            angle +
            i * 0.18;


        enemyBullets.push({

            x: boss.x,
            y: boss.y,

            vx:
                Math.cos(a) * 3,

            vy:
                Math.sin(a) * 3,

            damage: 9,

            life: 300

        });
    }
}


/* =========================
   PARTICLES
========================= */

function burst(
    x,
    y,
    color,
    amount
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            4 +
            1;


        particles.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 35,

            color: color

        });
    }
}


function updateParticles(dt) {

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particles[i];


        p.x +=
            p.vx * dt;

        p.y +=
            p.vy * dt;


        p.life -= dt;


        if (
            p.life <= 0
        ) {

            particles.splice(
                i,
                1
            );
        }
    }
}


/* =========================
   TEKEN ACHTERGROND
========================= */

function drawBackground() {

    const map =
        maps[
            saveData.selectedMap
        ];


    ctx.fillStyle =
        map.background;


    ctx.fillRect(
        0,
        0,
        1280,
        720
    );


    ctx.strokeStyle =
        map.grid;


    ctx.lineWidth = 1;


    for (
        let x = 0;
        x < 1280;
        x += 50
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            720
        );

        ctx.stroke();
    }


    for (
        let y = 0;
        y < 720;
        y += 50
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            1280,
            y
        );

        ctx.stroke();
    }


    /* sterren */

    ctx.fillStyle =
        "#ffffff55";


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const sx =
            (i * 157) %
            1280;

        const sy =
            (i * 83) %
            720;


        ctx.fillRect(
            sx,
            sy,
            2,
            2
        );
    }
}


/* =========================
   TEKEN ROBOT
========================= */

function drawEnemy(enemy) {

    ctx.save();

    ctx.translate(
        enemy.x,
        enemy.y
    );


    ctx.shadowBlur = 15;

    ctx.shadowColor =
        enemy.color;


    ctx.fillStyle =
        enemy.color;


    ctx.beginPath();


    if (
        enemy.name === "TANK"
    ) {

        ctx.roundRect(
            -enemy.size,
            -enemy.size,
            enemy.size * 2,
            enemy.size * 2,
            5
        );

    } else {

        ctx.roundRect(
            -enemy.size,
            -enemy.size,
            enemy.size * 2,
            enemy.size * 2,
            8
        );
    }


    ctx.fill();


    ctx.shadowBlur = 0;


    /* oog */

    ctx.fillStyle =
        "#07101c";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        enemy.size * 0.35,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(
        -6,
        -2,
        12,
        4
    );


    /* HP */

    ctx.fillStyle =
        "#111827";


    ctx.fillRect(
        -enemy.size,
        -enemy.size - 9,
        enemy.size * 2,
        4
    );


    ctx.fillStyle =
        "#4dff8a";


    ctx.fillRect(
        -enemy.size,
        -enemy.size - 9,

        enemy.size *
        2 *
        Math.max(
            0,
            enemy.hp /
            enemy.maxHp
        ),

        4
    );


    ctx.restore();
}


/* =========================
   TEKEN SPELER
========================= */

function drawPlayer() {

    const skin =
        skins[
            saveData.selectedSkin
        ];


    ctx.save();


    ctx.translate(
        player.x,
        player.y
    );


    ctx.rotate(
        player.angle
    );


    ctx.shadowBlur = 22;

    ctx.shadowColor =
        skin.c1;


    ctx.fillStyle =
        skin.c2;


    if (
        skin.shape === 0
    ) {

        ctx.beginPath();

        ctx.moveTo(
            28,
            0
        );

        ctx.lineTo(
            -18,
            -15
        );

        ctx.lineTo(
            -10,
            0
        );

        ctx.lineTo(
            -18,
            15
        );

        ctx.closePath();

        ctx.fill();

    } else if (
        skin.shape === 1
    ) {

        ctx.fillRect(
            -20,
            -16,
            40,
            32
        );

    } else if (
        skin.shape === 2
    ) {

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            20,
            0,
            Math.PI * 2
        );

        ctx.fill();

    } else {

        ctx.beginPath();

        ctx.moveTo(
            27,
            0
        );

        ctx.lineTo(
            0,
            -22
        );

        ctx.lineTo(
            -21,
            0
        );

        ctx.lineTo(
            0,
            22
        );

        ctx.closePath();

        ctx.fill();
    }


    ctx.shadowBlur = 0;


    /* cockpit */

    ctx.fillStyle =
        skin.c1;


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* kanon */

    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(
        7,
        -3,
        28,
        6
    );


    ctx.restore();
}


/* =========================
   TEKEN BULLETS
========================= */

function drawBullets() {

    for (
        const b of bullets
    ) {

        ctx.save();

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#aaffff";


        ctx.fillStyle =
            "#dfffff";


        ctx.beginPath();

        ctx.arc(
            b.x,
            b.y,
            b.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }
}


/* =========================
   TEKEN ENEMY BULLETS
========================= */

function drawEnemyBullets() {

    for (
        const b of enemyBullets
    ) {

        ctx.save();

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "#ff405c";


        ctx.strokeStyle =
            "#ff7b8c";


        ctx.lineWidth = 4;


        ctx.beginPath();

        ctx.moveTo(
            b.x,
            b.y
        );

        ctx.lineTo(
            b.x -
            b.vx * 3,

            b.y -
            b.vy * 3
        );

        ctx.stroke();


        ctx.restore();
    }
}


/* =========================
   TEKEN BOSS
========================= */

function drawBoss() {

    if (!boss) {
        return;
    }


    ctx.save();


    ctx.translate(
        boss.x,
        boss.y
    );


    ctx.rotate(
        performance.now() /
        1200
    );


    ctx.shadowBlur = 35;

    ctx.shadowColor =
        "#c24cff";


    ctx.fillStyle =
        "#a935d8";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        boss.size,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#e9a4ff";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        22,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#24052f";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        11,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();
}


/* =========================
   PARTICLES TEKENEN
========================= */

function drawParticles() {

    for (
        const p of particles
    ) {

        ctx.globalAlpha =
            p.life / 35;


        ctx.fillStyle =
            p.color;


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
   MINIMAP
========================= */

function drawMinimap() {

    mctx.clearRect(
        0,
        0,
        180,
        100
    );


    mctx.fillStyle =
        "#06101d";

    mctx.fillRect(
        0,
        0,
        180,
        100
    );


    /* speler */

    mctx.fillStyle =
        "#43ddff";


    mctx.fillRect(
        player.x / 1280 * 180 - 2,
        player.y / 720 * 100 - 2,
        5,
        5
    );


    /* enemies */

    mctx.fillStyle =
        "#ff405c";


    for (
        const enemy of enemies
    ) {

        mctx.fillRect(
            enemy.x / 1280 * 180 - 2,
            enemy.y / 720 * 100 - 2,
            4,
            4
        );
    }


    if (boss) {

        mctx.fillStyle =
            "#d56cff";


        mctx.beginPath();

        mctx.arc(
            boss.x / 1280 * 180,
            boss.y / 720 * 100,
            5,
            0,
            Math.PI * 2
        );

        mctx.fill();
    }
}


/* =========================
   DRAW
========================= */

function draw() {

    drawBackground();

    drawParticles();

    drawBullets();

    drawEnemyBullets();


    for (
        const enemy of enemies
    ) {

        drawEnemy(enemy);
    }


    drawBoss();

    drawPlayer();

    drawMinimap();
}


/* =========================
   HUD
========================= */

function updateHUD() {

    scoreEl.textContent =
        Math.floor(score);

    waveEl.textContent =
        wave;

    killsEl.textContent =
        kills;

    comboEl.textContent =
        combo;


    hpEl.style.width =
        player.hp /
        player.maxHp *
        100 +
        "%";


    shieldEl.style.width =
        player.shield /
        player.maxShield *
        100 +
        "%";


    energyEl.style.width =
        player.energy /
        player.maxEnergy *
        100 +
        "%";


    gunEl.textContent =
        weapons[
            saveData.selectedWeapon
        ].name;
}


/* =========================
   UPDATE
========================= */

function update(dt) {

    updatePlayer(dt);

    spawnTimer -= dt;


    if (
        !boss &&
        waveKills <
        waveTarget &&
        spawnTimer <= 0
    ) {

        spawnEnemy();

        spawnTimer =
            Math.max(
                20,
                65 -
                wave * 2
            );
    }


    updateEnemies(dt);

    updateBullets(dt);

    updateEnemyBullets(dt);

    updateBoss(dt);

    updateParticles(dt);

    updateWave();


    updateHUD();


    if (
        player.hp <= 0
    ) {

        endGame();
    }
}


/* =========================
   GAME LOOP
========================= */

function loop(time) {

    if (!running) {
        return;
    }


    const dt =
        Math.min(
            2,
            (time - lastTime) /
            16
        );


    lastTime = time;


    if (!paused) {

        update(dt);

        draw();
    }


    requestAnimationFrame(
        loop
    );
}


/* =========================
   GAME OVER
========================= */

function endGame() {

    running = false;


    saveData.highscore =
        Math.max(
            saveData.highscore,
            Math.floor(score)
        );


    saveData.bestWave =
        Math.max(
            saveData.bestWave,
            wave
        );


    saveData.credits +=
        Math.floor(
            score / 100
        );


    save();


    finalEl.textContent =
        Math.floor(score);


    overBox.classList.remove(
        "hide"
    );
}


/* =========================
   VICTORY
========================= */

function victory() {

    running = false;


    saveData.bestWave =
        Math.max(
            saveData.bestWave,
            wave
        );


    saveData.credits += 500;


    save();


    winBox.classList.remove(
        "hide"
    );
}


/* =========================
   MENU
========================= */

function backToMenu() {

    running = false;

    game.classList.add(
        "hide"
    );

    menu.classList.remove(
        "hide"
    );

    overBox.classList.add(
        "hide"
    );

    winBox.classList.add(
        "hide"
    );

    pauseBox.classList.add(
        "hide"
    );

    updateMenuStats();
}


startBtn.onclick =
    startGame;


continueBtn.onclick =
    startGame;


againBtn.onclick =
    startGame;


again2Btn.onclick =
    startGame;


menuBtn1.onclick =
    backToMenu;


menuBtn2.onclick =
    backToMenu;


menuBtn3.onclick =
    backToMenu;


/* =========================
   PAUSE
========================= */

function togglePause() {

    if (!running) {
        return;
    }


    paused =
        !paused;


    pauseBox.classList.toggle(
        "hide",
        !paused
    );
}


pauseBtn.onclick =
    togglePause;


resumeBtn.onclick =
    togglePause;


/* =========================
   MENU PANELEN
========================= */

document
    .querySelectorAll(
        "[data-panel]"
    )
    .forEach(button => {

        button.onclick = () => {

            openPanel(
                button.dataset.panel
            );
        };

    });


closeBtn.onclick = () => {

    panel.classList.add(
        "hide"
    );
};


function openPanel(type) {

    panel.classList.remove(
        "hide"
    );


    const title =
        document.getElementById(
            "pt"
        );


    const content =
        document.getElementById(
            "pc"
        );


    let html = "";


    /* SKINS */

    if (
        type === "skins"
    ) {

        title.textContent =
            "🎨 SKINS";


        html =
            '<div class="cards">';


        skins.forEach(
            (skin, i) => {

                const unlocked =
                    saveData.unlockedSkins.includes(i) ||
                    (
                        skin.wave > 0 &&
                        saveData.bestWave >= skin.wave
                    );


                const selected =
                    saveData.selectedSkin === i;


                html += `

                <div class="card
                    ${selected ? "sel" : ""}
                    ${unlocked ? "" : "lock"}">

                    <div
                        class="preview"
                        style="
                        background:
                        linear-gradient(
                        135deg,
                        ${skin.c1},
                        ${skin.c2}
                        )">
                    </div>

                    <b>${skin.name}</b>

                    <p>
                    ${
                        skin.wave > 0
                        ? "Wave " + skin.wave
                        : skin.price > 0
                        ? "🪙 " + skin.price
                        : "GRATIS"
                    }
                    </p>

                    <button
                        data-skin="${i}">
                    ${
                        selected
                        ? "GEBRUIKT"
                        : unlocked
                        ? "GEBRUIKEN"
                        : skin.price
                        ? "KOOP"
                        : "VERGRENDELD"
                    }
                    </button>

                </div>
                `;
            }
        );


        html +=
            "</div>";
    }


    /* WAPENS */

    if (
        type === "weapons"
    ) {

        title.textContent =
            "🔫 WAPENS";


        html =
            '<div class="cards">';


        weapons.forEach(
            (weapon, i) => {

                const unlocked =
                    saveData.unlockedWeapons.includes(i);


                const selected =
                    saveData.selectedWeapon === i;


                html += `

                <div class="card
                ${selected ? "sel" : ""}
                ${unlocked ? "" : "lock"}">

                    <b>
                    ${weapon.name}
                    </b>

                    <p>
                    Damage:
                    ${weapon.damage}
                    <br>

                    Cooldown:
                    ${weapon.cooldown}
                    </p>

                    <button
                    data-weapon="${i}">
                    ${
                        selected
                        ? "GEBRUIKT"
                        : unlocked
                        ? "GEBRUIKEN"
                        : "KOOP " +
                          weapon.price
                    }
                    </button>

                </div>
                `;
            }
        );


        html +=
            "</div>";
    }


    /* KAARTEN */

    if (
        type === "maps"
    ) {

        title.textContent =
            "🗺️ KAARTEN";


        html =
            '<div class="cards">';


        maps.forEach(
            (map, i) => {

                const unlocked =
                    saveData.bestWave >=
                    map.wave;


                const selected =
                    saveData.selectedMap === i;


                html += `

                <div class="card
                ${selected ? "sel" : ""}
                ${unlocked ? "" : "lock"}">

                    <b>
                    ${map.name}
                    </b>

                    <p>
                    ${
                        map.wave === 0
                        ? "GRATIS"
                        : "Unlock Wave " +
                          map.wave
                    }
                    </p>

                    <button
                    data-map="${i}">
                    ${
                        selected
                        ? "GEBRUIKT"
                        : unlocked
                        ? "GEBRUIKEN"
                        : "VERGRENDELD"
                    }
                    </button>

                </div>
                `;
            }
        );


        html +=
            "</div>";
    }


    /* UPGRADES */

    if (
        type === "upgrades"
    ) {

        title.textContent =
            "⬆️ UPGRADES";


        const upgrades = [

            [
                "CORE DAMAGE",
                "damage"
            ],

            [
                "ARMOR PLATING",
                "armor"
            ],

            [
                "SHIELD MATRIX",
                "shield"
            ],

            [
                "ENERGY CELL",
                "energy"
            ],

            [
                "THRUSTERS",
                "speed"
            ]

        ];


        html =
            '<div class="cards">';


        upgrades.forEach(
            upgrade => {

                const name =
                    upgrade[0];

                const key =
                    upgrade[1];


                const level =
                    saveData[key];


                const price =
                    100 +
                    level * 100;


                html += `

                <div class="card">

                    <b>
                    ${name}
                    </b>

                    <p>
                    Level ${level}
                    </p>

                    <button
                    data-upgrade="${key}">
                    KOOP ${price}
                    </button>

                </div>
                `;
            }
        );


        html +=
            "</div>";
    }


    /* SETTINGS */

    if (
        type === "settings"
    ) {

        title.textContent =
            "⚙️ INSTELLINGEN";


        html = `

        <div class="card">

            <h3>GELUID</h3>

            <p>
            ${
                saveData.sound
                ? "AAN"
                : "UIT"
            }
            </p>

            <button id="soundButton">
                WISSEL
            </button>

        </div>

        `;
    }


    /* HELP */

    if (
        type === "help"
    ) {

        title.textContent =
            "❓ HELP";


        html = `

        <div class="card">

            <h3>HOW TO PLAY</h3>

            <p>
            🖥️ <b>PC:</b>
            WASD / pijltjes
            om te bewegen.
            </p>

            <p>
            🖱️ Muis om te richten.
            </p>

            <p>
            🖱️ Klik om te schieten.
            </p>

            <p>
            📱 Telefoon:
            linker joystick bewegen,
            rechter joystick richten.
            </p>

            <p>
            🔴 FIRE om te schieten.
            </p>

            <p>
            🤖 Versla robots,
            bereik nieuwe waves
            en versla bosses.
            </p>

            <p>
            🚫 Geen bloed.
            </p>

        </div>

        `;
    }


    content.innerHTML =
        html;


    /* SKIN BUTTONS */

    content
        .querySelectorAll(
            "[data-skin]"
        )
        .forEach(button => {

            button.onclick = () => {

                const i =
                    Number(
                        button.dataset.skin
                    );


                const skin =
                    skins[i];


                const unlocked =
                    saveData.unlockedSkins.includes(i) ||
                    (
                        skin.wave > 0 &&
                        saveData.bestWave >=
                        skin.wave
                    );


                if (
                    !unlocked &&
                    skin.price > 0 &&
                    saveData.credits >=
                    skin.price
                ) {

                    saveData.credits -=
                        skin.price;

                    saveData.unlockedSkins.push(
                        i
                    );
                }


                if (
                    saveData.unlockedSkins.includes(i)
                ) {

                    saveData.selectedSkin =
                        i;

                    save();

                    openPanel(
                        "skins"
                    );
                }
            };

        });


    /* WEAPON BUTTONS */

    content
        .querySelectorAll(
            "[data-weapon]"
        )
        .forEach(button => {

            button.onclick = () => {

                const i =
                    Number(
                        button.dataset.weapon
                    );


                const weapon =
                    weapons[i];


                if (
                    !saveData.unlockedWeapons.includes(i)
                ) {

                    if (
                        saveData.credits >=
                        weapon.price
                    ) {

                        saveData.credits -=
                            weapon.price;

                        saveData.unlockedWeapons.push(
                            i
                        );
                    }
                }


                if (
                    saveData.unlockedWeapons.includes(i)
                ) {

                    saveData.selectedWeapon =
                        i;

                    save();

                    openPanel(
                        "weapons"
                    );
                }
            };

        });


    /* MAP BUTTONS */

    content
        .querySelectorAll(
            "[data-map]"
        )
        .forEach(button => {

            button.onclick = () => {

                const i =
                    Number(
                        button.dataset.map
                    );


                if (
                    saveData.bestWave >=
                    maps[i].wave
                ) {

                    saveData.selectedMap =
                        i;

                    save();

                    openPanel(
                        "maps"
                    );
                }
            };

        });


    /* UPGRADE BUTTONS */

    content
        .querySelectorAll(
            "[data-upgrade]"
        )
        .forEach(button => {

            button.onclick = () => {

                const key =
                    button.dataset.upgrade;


                const price =
                    100 +
                    saveData[key] *
                    100;


                if (
                    saveData.credits >=
                    price
                ) {

                    saveData.credits -=
                        price;

                    saveData[key]++;

                    save();

                    openPanel(
                        "upgrades"
                    );
                }
            };

        });


    /* SOUND */

    const soundButton =
        document.getElementById(
            "soundButton"
        );


    if (soundButton) {

        soundButton.onclick = () => {

            saveData.sound =
                !saveData.sound;

            save();

            openPanel(
                "settings"
            );
        };
    }
}


/* =========================
   KEYBOARD
========================= */

window.addEventListener(
    "keydown",
    event => {

        keys[event.key] = true;


        if (
            event.key === "p" ||
            event.key === "P"
        ) {

            togglePause();
        }


        if (
            event.key >= "1" &&
            event.key <= "6"
        ) {

            const weapon =
                Number(
                    event.key
                ) - 1;


            if (
                saveData.unlockedWeapons.includes(
                    weapon
                )
            ) {

                saveData.selectedWeapon =
                    weapon;

                save();
            }
        }
    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[event.key] = false;
    }
);


/* =========================
   MOUSE
========================= */

canvas.addEventListener(
    "mousemove",
    event => {

        const rect =
            canvas.getBoundingClientRect();


        mouse.x =
            (
                event.clientX -
                rect.left
            ) *
            1280 /
            rect.width;


        mouse.y =
            (
                event.clientY -
                rect.top
            ) *
            720 /
            rect.height;
    }
);


canvas.addEventListener(
    "mousedown",
    () => {

        mouse.down = true;
    }
);


window.addEventListener(
    "mouseup",
    () => {

        mouse.down = false;
    }
);


/* =========================
   MOBILE FIRE
========================= */

const fireButton =
    document.getElementById(
        "fire"
    );


fireButton.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        mobileFire = true;
    }
);


fireButton.addEventListener(
    "pointerup",
    event => {

        event.preventDefault();

        mobileFire = false;
    }
);


fireButton.addEventListener(
    "pointercancel",
    () => {

        mobileFire = false;
    }
);


/* =========================
   JOYSTICKS
========================= */

function setupStick(
    elementId,
    type
) {

    const element =
        document.getElementById(
            elementId
        );


    const knob =
        element.querySelector(
            "i"
        );


    let active = false;


    element.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            active = true;

            element.setPointerCapture(
                event.pointerId
            );
        }
    );


    element.addEventListener(
        "pointermove",
        event => {

            if (!active) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            let dx =
                event.clientX -
                centerX;


            let dy =
                event.clientY -
                centerY;


            const max =
                rect.width * 0.32;


            const distance =
                Math.hypot(
                    dx,
                    dy
                );


            if (
                distance > max
            ) {

                dx =
                    dx /
                    distance *
                    max;

                dy =
                    dy /
                    distance *
                    max;
            }


            knob.style.transform =
                `translate(
                    calc(-50% + ${dx}px),
                    calc(-50% + ${dy}px)
                )`;


            if (
                type === "move"
            ) {

                moveStick.x =
                    dx / max;

                moveStick.y =
                    dy / max;

            } else {

                aimStick.x =
                    dx / max;

                aimStick.y =
                    dy / max;
            }
        }
    );


    element.addEventListener(
        "pointerup",
        reset
    );


    element.addEventListener(
        "pointercancel",
        reset
    );


    function reset() {

        active = false;


        knob.style.transform =
            "translate(-50%, -50%)";


        if (
            type === "move"
        ) {

            moveStick.x = 0;
            moveStick.y = 0;

        } else {

            aimStick.x = 0;
            aimStick.y = 0;
        }
    }
}


setupStick(
    "move",
    "move"
);


setupStick(
    "aim",
    "aim"
);
