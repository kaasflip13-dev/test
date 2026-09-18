const c=document.getElementById('c');
const x=c.getContext('2d');

const weapons=[
 ['BLASTER',18,180,10,0,0],
 ['TRIPLE SHOT',11,260,9,.18,120],
 ['PLASMA',42,520,7,0,250],
 ['LASER',24,90,15,0,400],
 ['NOVA',16,650,6,.45,600],
 ['VOID CANNON',80,900,5,0,1000]
];

const skins=[
 ['DEFAULT',0,0,'#43ddff','#185fff',0],
 ['RED FURY',150,0,'#ff5268','#a51831',1],
 ['TOXIC',300,0,'#7dff4d','#168f3a',2],
 ['VOID',500,0,'#d56cff','#5420a5',3],
 ['GOLD',750,0,'#ffe06a','#b87912',1],
 ['ICE',0,5,'#e4ffff','#55bfff',2],
 ['SHADOW',0,10,'#aab4c5','#202837',3],
 ['GALAXY',1500,0,'#ff7cff','#5d54ff',4]
];

const types=[
 ['SCOUT',35,1.8,20,'#54e6ff'],
 ['DRONE',45,1.4,25,'#64ff8a'],
 ['HUNTER',60,1.8,35,'#ffdf58'],
 ['BRUTE',130,.7,70,'#ff6b4a'],
 ['SNIPER',70,.65,80,'#d68cff'],
 ['DASHER',50,2.8,55,'#ff5cff'],
 ['TANK',230,.45,120,'#8ca0b8'],
 ['ELITE',260,1.05,220,'#ff466f']
];

let s=JSON.parse(localStorage.spacebotsSave||'null')||{
 highscore:0,
 bestWave:0,
 credits:300,
 selectedSkin:0,
 selectedWeapon:0,
 unlockedSkins:[0],
 unlockedWeapons:[0],
 sound:true
};

s.unlockedSkins=s.unlockedSkins||[0];
s.selectedSkin??=0;

const save=()=>{
 localStorage.spacebotsSave=JSON.stringify(s);
 stats();
};

const stats=()=>{
 hs.textContent=s.highscore;
 bw.textContent=s.bestWave;
 cr.textContent=s.credits;
};

stats();

const menu=document.getElementById('menu');
const game=document.getElementById('game');
const panel=document.getElementById('panel');

document.getElementById('start').onclick=start;
document.getElementById('cont').onclick=start;

close.onclick=()=>{
 panel.classList.add('hide');
};

document.querySelectorAll('[data-panel]').forEach(b=>{
 b.onclick=()=>{
  open(b.dataset.panel);
 };
});

function open(t){

 panel.classList.remove('hide');

 let out='';
 let title='';

 if(t==='skins'){

  title='🎨 SKINS';

  out='<div class="cards">'+
  skins.map((z,i)=>{

   let ok=
    s.unlockedSkins.includes(i)||
    s.bestWave>=z[2];

   let sel=s.selectedSkin===i;

   return `
   <div class="card ${sel?'sel':''} ${ok?'':'lock'}">

    <div class="preview"
    style="background:linear-gradient(135deg,${z[3]},${z[4]})">
    </div>

    <b>${z[0]}</b>

    <p>
    ${z[2]?'Wave '+z[2]:
      z[1]?'🪙 '+z[1]:
      'GRATIS'}
    </p>

    <button data-skin="${i}">
    ${sel?'GEBRUIKT':
      ok?'GEBRUIKEN':
      z[1]?'KOOP':
      'VERGRENDELD'}
    </button>

   </div>`;

  }).join('')+'</div>';
 }

 if(t==='weapons'){

  title='🔫 WAPENS';

  out='<div class="cards">'+
  weapons.map((z,i)=>`

   <div class="card ${s.selectedWeapon===i?'sel':''}">

    <b>${z[0]}</b>

    <p>
    Damage ${z[1]}<br>
    Cooldown ${z[2]}ms
    </p>

    <button data-w="${i}">
    ${
     s.selectedWeapon===i
      ?'GEBRUIKT'
      :s.unlockedWeapons.includes(i)
       ?'GEBRUIKEN'
       :'KOOP '+z[5]
    }
    </button>

   </div>

  `).join('')+'</div>';
 }

 if(t==='maps'){

  title='🗺️ KAARTEN';

  out='<div class="cards">'+
  ['NEON GRID','CRIMSON MOON','VOID TEMPLE','TOXIC PLANET','STAR FORGE']
  .map((n,i)=>`

   <div class="card">
    <b>${n}</b>
    <p>Unlock wave ${[0,3,5,7,10][i]}</p>
   </div>

  `).join('')+
  '</div>';
 }

 if(t==='upgrades'){

  title='⬆️ UPGRADES';

  out='<div class="cards">'+
  ['CORE DAMAGE','ARMOR PLATING','SHIELD MATRIX',
   'ENERGY CELL','THRUSTERS','RAPID CORE']
  .map(n=>`

   <div class="card">
    <b>${n}</b>
    <p>Upgrade je robot.</p>
    <button>KOOP</button>
   </div>

  `).join('')+
  '</div>';
 }

 if(t==='settings'){

  title='⚙️ INSTELLINGEN';

  out=`
   <div class="card">
    <b>GELUID</b>
    <p>${s.sound?'AAN':'UIT'}</p>
    <button id="snd">WISSEL</button>
   </div>
  `;
 }

 if(t==='help'){

  title='❓ HOW TO PLAY';

  out=`
   <div class="card">
    <p>
     <b>PC:</b>
     WASD/pijltjes + muis + klik.
    </p>

    <p>
     <b>Tablet/telefoon:</b>
     linker joystick bewegen,
     rechter joystick richten,
     FIRE schieten.
    </p>

    <p>
     Versla robots en bosses.
     Geen bloed.
    </p>
   </div>
  `;
 }

 pt.textContent=title;
 pc.innerHTML=out;

 pc.querySelectorAll('[data-skin]').forEach(b=>{

  b.onclick=()=>{

   let i=+b.dataset.skin;
   let z=skins[i];

   let ok=
    s.unlockedSkins.includes(i)||
    s.bestWave>=z[2];

   if(
    !ok &&
    z[1] &&
    s.credits>=z[1]
   ){

    s.credits-=z[1];
    s.unlockedSkins.push(i);
    ok=true;
   }

   if(ok){

    s.selectedSkin=i;
    save();
    open('skins');

   }

  };

 });

 pc.querySelectorAll('[data-w]').forEach(b=>{

  b.onclick=()=>{

   let i=+b.dataset.w;
   let z=weapons[i];

   if(
    !s.unlockedWeapons.includes(i)&&
    s.credits>=z[5]
   ){

    s.credits-=z[5];
    s.unlockedWeapons.push(i);
   }

   if(s.unlockedWeapons.includes(i)){

    s.selectedWeapon=i;
    save();
    open('weapons');

   }

  };

 });

 if(document.getElementById('snd')){

  document.getElementById('snd').onclick=()=>{

   s.sound=!s.sound;
   save();
   open('settings');

  };

 }

}

let p;
let en=[];
let bs=[];
let eb=[];
let parts=[];

let running=false;
let paused=false;
let last=0;
let spawn=0;

let score=0;
let wave=1;
let kills=0;
let wk=0;
let target=8;
let boss=null;

let keys={};

let mouse={
 x:640,
 y:360,
 down:false
};

let move={
 x:0,
 y:0
};

let aim={
 x:0,
 y:0
};

let fire=false;

function start(){

 menu.classList.add('hide');
 game.classList.remove('hide');

 document
  .querySelectorAll('.overlay')
  .forEach(q=>q.classList.add('hide'));

 score=0;
 kills=0;
 wave=1;
 wk=0;
 target=8;

 en=[];
 bs=[];
 eb=[];
 parts=[];
 boss=null;

 p={
  x:640,
  y:550,
  r:18,
  hp:100,
  maxHp:100,
  shield:60,
  maxShield:60,
  energy:100,
  maxEnergy:100,
  last:0,
  a:-1.57
 };

 running=true;
 paused=false;

 requestAnimationFrame(loop);
}

function end(){

 running=false;

 s.highscore=Math.max(
  s.highscore,
  score
 );

 s.bestWave=Math.max(
  s.bestWave,
  wave
 );

 s.credits+=Math.floor(score/100);

 save();

 final.textContent=score;

 over.classList.remove('hide');
}

function victory(){

 running=false;

 s.bestWave=Math.max(
  s.bestWave,
  wave
 );

 s.credits+=500;

 save();

 win.classList.remove('hide');
}

function shoot(){

 let z=weapons[s.selectedWeapon];
 let now=performance.now();

 if(
  now-p.last<z[2]||
  p.energy<2
 )return;

 p.last=now;
 p.energy-=2;

 let n=z[4]?3:1;

 for(let i=0;i<n;i++){

  let a=
   p.a+
   (i-(n-1)/2)*z[4];

  bs.push({
   x:p.x,
   y:p.y,
   vx:Math.cos(a)*z[3],
   vy:Math.sin(a)*z[3],
   d:z[1],
   life:100
  });

 }
}

function spawnEnemy(){

 let z=
  types[
   Math.floor(
    Math.random()*
    Math.min(
     types.length,
     4+Math.floor(wave/2)
    )
   )
  ];

 let side=Math.random();

 en.push({
  n:z[0],
  hp:z[1]+wave*3,
  max:z[1]+wave*3,
  sp:z[2],
  sc:z[3],
  col:z[4],

  x:
   side<.5
    ?Math.random()*1280
    :(Math.random()<.5?20:1260),

  y:
   side<.5
    ?20
    :Math.random()*500
 });
}

function burst(a,b,col,n){

 for(let i=0;i<n;i++){

  let q=Math.random()*6.28;
  let v=Math.random()*4+1;

  parts.push({
   x:a,
   y:b,
   vx:Math.cos(q)*v,
   vy:Math.sin(q)*v,
   l:35,
   col
  });

 }
}

function update(dt){

 let dx=
  (keys.d||keys.ArrowRight?1:0)-
  (keys.a||keys.ArrowLeft?1:0)+
  move.x;

 let dy=
  (keys.s||keys.ArrowDown?1:0)-
  (keys.w||keys.ArrowUp?1:0)+
  move.y;

 let l=Math.hypot(dx,dy)||1;

 p.x=Math.max(
  20,
  Math.min(
   1260,
   p.x+dx/l*3.2*dt
  )
 );

 p.y=Math.max(
  20,
  Math.min(
   700,
   p.y+dy/l*3.2*dt
  )
 );

 if(aim.x||aim.y)
  p.a=Math.atan2(aim.y,aim.x);
 else
  p.a=Math.atan2(
   mouse.y-p.y,
   mouse.x-p.x
  );

 if(mouse.down||fire)
  shoot();

 p.energy=Math.min(
  p.maxEnergy,
  p.energy+.25
 );

 spawn-=dt;

 if(
  !boss &&
  wk<target &&
  spawn<=0
 ){

  spawnEnemy();

  spawn=Math.max(
   18,
   55-wave*2
  );

 }

 for(let e of en){

  let a=Math.atan2(
   p.y-e.y,
   p.x-e.x
  );

  e.x+=
   Math.cos(a)*
   e.sp*.7*dt;

  e.y+=
   Math.sin(a)*
   e.sp*.7*dt;
 }

 for(let b of bs){

  b.x+=b.vx*dt;
  b.y+=b.vy*dt;
  b.life-=dt;

 }

 for(
  let i=bs.length-1;
  i>=0;
  i--
 ){

  let b=bs[i];

  for(
   let j=en.length-1;
   j>=0;
   j--
  ){

   let e=en[j];

   if(
    Math.hypot(
     b.x-e.x,
     b.y-e.y
    )<e.n.length+15
   ){

    e.hp-=b.d;
    bs.splice(i,1);

    if(e.hp<=0){

     score+=e.sc;
     kills++;
     wk++;

     s.credits+=
      Math.max(
       1,
       Math.floor(e.sc/20)
      );

     burst(
      e.x,
      e.y,
      e.col,
      8
     );

     en.splice(j,1);
    }

    break;
   }
  }
 }

 bs=bs.filter(b=>
  b.life>0&&
  b.x>-30&&
  b.x<1310&&
  b.y>-30&&
  b.y<750
 );

 for(let e of en){

  if(
   Math.hypot(
    e.x-p.x,
    e.y-p.y
   )<30
  ){

   if(p.shield>0)
    p.shield-=.7;
   else
    p.hp-=.7;

  }

 }

 if(
  !boss&&
  wk>=target&&
  en.length===0
 ){

  if(wave%5===0){

   boss={
    x:640,
    y:110,
    hp:900+wave*150,
    max:900+wave*150,
    a:0
   };

   bn.textContent='VOID CORE';

   document
    .getElementById('boss')
    .classList.remove('hide');

  }else{

   wave++;
   wk=0;
   target=8+wave*3;

  }

 }

 if(boss){

  boss.x+=
   Math.sin(
    performance.now()/800
   )*.8*dt;

  for(let b of bs){

   if(
    Math.hypot(
     b.x-boss.x,
     b.y-boss.y
    )<
    boss.hp/30+20
   ){

    boss.hp-=b.d;

   }

  }

  bs=bs.filter(b=>b.life>0);

  bh.style.width=
   Math.max(
    0,
    boss.hp/boss.max*100
   )+'%';

  if(boss.hp<=0){

   burst(
    boss.x,
    boss.y,
    '#fff',
    50
   );

   boss=null;

   document
    .getElementById('boss')
    .classList.add('hide');

   if(wave>=10)
    victory();
   else{

    wave++;
    wk=0;
    target=8+wave*3;

   }

  }

 }

 if(p.hp<=0)
  end();

 for(let q of parts){

  q.x+=q.vx*dt;
  q.y+=q.vy*dt;
  q.l-=dt;

 }

 parts=parts.filter(q=>q.l>0);

 hud();
}

function hud(){

 scoreEl.textContent=score;
 waveEl.textContent=wave;
 killsEl.textContent=kills;

 gunEl.textContent=
  weapons[s.selectedWeapon][0];

 hp.style.width=
  p.hp/p.maxHp*100+'%';

 sh.style.width=
  p.shield/p.maxShield*100+'%';

 en.style.width=
  p.energy/p.maxEnergy*100+'%';
}

const scoreEl=
 document.getElementById('score');

const waveEl=
 document.getElementById('wave');

const killsEl=
 document.getElementById('kills');

const gunEl=
 document.getElementById('gun');

function draw(){

 x.clearRect(
  0,0,1280,720
 );

 x.fillStyle='#050b19';
 x.fillRect(
  0,0,1280,720
 );

 x.strokeStyle='#ffffff10';

 for(
  let a=0;
  a<1280;
  a+=50
 ){

  x.beginPath();
  x.moveTo(a,0);
  x.lineTo(a,720);
  x.stroke();

 }

 for(
  let a=0;
  a<720;
  a+=50
 ){

  x.beginPath();
  x.moveTo(0,a);
  x.lineTo(1280,a);
  x.stroke();

 }

 for(let e of en)
  robot(e);

 for(let b of bs){

  x.strokeStyle='#b8ffff';
  x.lineWidth=4;

  x.beginPath();

  x.moveTo(
   b.x,
   b.y
  );

  x.lineTo(
   b.x-b.vx*2,
   b.y-b.vy*2
  );

  x.stroke();

 }

 for(let q of parts){

  x.globalAlpha=q.l/35;
  x.fillStyle=q.col;

  x.fillRect(
   q.x,
   q.y,
   4,
   4
  );

 }

 x.globalAlpha=1;

 if(boss){

  x.fillStyle='#c24cff';

  x.shadowBlur=25;
  x.shadowColor='#d56cff';

  x.beginPath();

  x.arc(
   boss.x,
   boss.y,
   58,
   0,
   7
  );

  x.fill();

  x.shadowBlur=0;
 }

 player();
}

function robot(e){

 x.save();

 x.translate(
  e.x,
  e.y
 );

 x.fillStyle=e.col;

 x.shadowBlur=12;
 x.shadowColor=e.col;

 x.beginPath();

 x.roundRect(
  -17,
  -17,
  34,
  34,
  7
 );

 x.fill();

 x.fillStyle='#09101e';

 x.beginPath();

 x.arc(
  0,
  0,
  7,
  0,
  7
 );

 x.fill();

 x.restore();
}

function player(){

 let z=skins[s.selectedSkin];

 x.save();

 x.translate(
  p.x,
  p.y
 );

 x.rotate(p.a);

 x.shadowBlur=20;
 x.shadowColor=z[3];

 x.fillStyle=z[4];

 if(z[5]===0){

  x.beginPath();

  x.moveTo(25,0);
  x.lineTo(-18,-15);
  x.lineTo(-10,0);
  x.lineTo(-18,15);

  x.closePath();
  x.fill();

 }else if(z[5]===1){

  x.fillRect(
   -18,
   -15,
   40,
   30
  );

 }else if(z[5]===2){

  x.beginPath();

  x.arc(
   0,
   0,
   19,
   0,
   7
  );

  x.fill();

  x.fillStyle=z[3];

  x.beginPath();

  x.arc(
   0,
   0,
   8,
   0,
   7
  );

  x.fill();

 }else{

  x.beginPath();

  x.moveTo(25,0);
  x.lineTo(0,-22);
  x.lineTo(-20,0);
  x.lineTo(0,22);

  x.closePath();
  x.fill();

 }

 x.shadowBlur=0;

 x.fillStyle='#fff';

 x.fillRect(
  7,
  -3,
  25,
  6
 );

 x.restore();
}

function loop(t){

 if(!running)
  return;

 let dt=Math.min(
  2,
  (t-last||16)/16
 );

 last=t;

 if(!paused){

  update(dt);
  draw();

 }

 requestAnimationFrame(loop);
}

addEventListener(
 'keydown',
 e=>{

  keys[e.key]=1;

  if(
   e.key==='p'||
   e.key==='P'
  )
   pauseGame();

  if(
   e.key>='1'&&
   e.key<='6'
  ){

   s.selectedWeapon=
    +e.key-1;

   save();

  }

 }
);

addEventListener(
 'keyup',
 e=>{
  keys[e.key]=0;
 }
);

c.onmousemove=e=>{

 let r=
  c.getBoundingClientRect();

 mouse.x=
  (e.clientX-r.left)*
  1280/r.width;

 mouse.y=
  (e.clientY-r.top)*
  720/r.height;
};

c.onmousedown=()=>{
 mouse.down=1;
};

addEventListener(
 'mouseup',
 ()=>{
  mouse.down=0;
 }
);

function pauseGame(){

 if(!running)
  return;

 paused=!paused;

 pauseBox.classList.toggle(
  'hide',
  !paused
 );
}

pause.onclick=pauseGame;
resume.onclick=pauseGame;

function menuBack(){

 running=false;

 game.classList.add('hide');
 menu.classList.remove('hide');

 document
  .querySelectorAll('.overlay')
  .forEach(q=>
   q.classList.add('hide')
  );

 stats();
}

m1.onclick=menuBack;
m2.onclick=menuBack;
m3.onclick=menuBack;

again.onclick=start;
again2.onclick=start;

function stick(id,type){

 let el=
  document.getElementById(id);

 let kn=el.querySelector('i');

 let active=false;

 el.onpointerdown=e=>{
  active=true;
  moveStick(e);
 };

 addEventListener(
  'pointermove',
  e=>{
   if(active)
    moveStick(e);
  }
 );

 addEventListener(
  'pointerup',
  ()=>{
   active=false;

   kn.style.transform=
    'translate(-50%,-50%)';

   if(type==='move')
    move={x:0,y:0};
   else
    aim={x:0,y:0};
  }
 );

 function moveStick(e){

  let r=
   el.getBoundingClientRect();

  let dx=
   e.clientX-
   (r.left+r.width/2);

  let dy=
   e.clientY-
   (r.top+r.height/2);

  let m=r.width*.32;

  let l=
   Math.hypot(dx,dy)||1;

  let k=
   Math.min(1,m/l);

  let xx=dx*k;
  let yy=dy*k;

  kn.style.transform=
   `translate(
     calc(-50% + ${xx}px),
     calc(-50% + ${yy}px)
   )`;

  if(type==='move')
   move={
    x:xx/m,
    y:yy/m
   };
  else
   aim={
    x:xx/m,
    y:yy/m
   };
 }
}

stick('move','move');
stick('aim','aim');

const fireBtn=
 document.getElementById('fire');

fireBtn.onpointerdown=()=>{
 fire=1;
};

fireBtn.onpointerup=
fireBtn.onpointercancel=()=>{
 fire=0;
};
