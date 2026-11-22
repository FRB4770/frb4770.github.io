(()=>{
 const mount=document.getElementById('marvelous-fantasia-mount');if(!mount||mount.dataset.ready)return;mount.dataset.ready='true';
 const tiles=[
  ['Furnace','FU'],['Coal','CO'],['Wood','WO'],['Meat','ME'],['Iron','IR'],['Gems','GE'],['Speedup','SP'],['Shield','SH'],['Healing','HE'],['Bear Trap','BT'],['Sunfire Castle','SC'],['Hall of Chiefs','HC'],['Rally','RA'],['Exploration','EX'],['Jessie','JS'],['Jasser','JA'],['Seo-Yoon','SY'],['Patrick','PA'],['Molly','MO'],['Gina','GI'],['Sergey','SE'],['Natalia','NA'],['Jeronimo','JR'],['Bahiti','BA'],['Smith','SM'],['Cloris','CL'],['Eugene','EU'],['Zinman','ZI'],['Cave Hyena','HY'],['Arctic Wolf','AW'],['Musk Ox','OX'],['Campfire','CP'],['Alliance','AL'],['Scout','ST'],['March','MA'],['Tundra','TU'],['Embassy','EM'],['Infirmary','IN'],['Barracks','BR'],['Academy','AC'],['Sawmill','SA'],['Coal Mine','CM'],['Hunter Hut','HH'],['Storehouse','SR'],['City Wall','CW'],['Research','RE'],['Training','TR'],['Expedition','ED'],['Frost Beast','FB'],['Alliance Help','AH'],['Rally Flag','RF'],['Garrison','GA'],['Daily Mission','DM'],['Chief Gear','CG'],['Charms','CH'],['Furnace Lv. 30','F30'],['Scout Tower','ST2'],['Supply Crate','SC2'],['Hero Shard','HS'],['Timber','TI']
 ].map(([name,glyph],index)=>({name,glyph,color:['#ffd16a','#8ed9ff','#c6eaff','#f0ae83','#dce7f5','#ffe39a'][index%6]}));
 const heroNames=new Set(['Jessie','Jasser','Seo-Yoon','Patrick','Molly','Gina','Sergey','Natalia','Jeronimo','Bahiti','Smith','Cloris','Eugene','Zinman']);
 const baseRows=[{y:0,a:2,b:5},{y:1,a:1,b:6},{y:2,a:0,b:7},{y:3,a:0,b:7},{y:4,a:0,b:7},{y:5,a:0,b:7},{y:6,a:0,b:7},{y:7,a:0,b:7},{y:8,a:1,b:6},{y:9,a:2,b:5}];
 let level=1,board=[],selected=null,undoStack=[],score=0,moves=0,undoLeft=1,hintLeft=1,shuffleLeft=1,ended=false;
 const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const key=(x,y,z)=>`${x},${y},${z}`;
 const mountUI=()=>{mount.innerHTML=`<section class="mf-shell" aria-label="Whiteout Survival Mahjong practice">
   <div class="mf-header"><div><span class="mf-kicker">WHITEOUT SURVIVAL · FRB TILE STRATEGY</span><h3>Marvelous Fantasia: Frost Tiles</h3><p class="mf-copy">Clear a four-layer Mahjong layout by matching identical pairs. Four copies of each symbol create real choices: plan which free pair to remove first.</p></div><span class="mf-frost-mark" aria-hidden="true">❄</span></div>
   <div class="mf-toolbar"><span class="mf-metric"><small>LEVEL</small><b id="mf-level">1</b></span><span class="mf-metric"><small>PAIRS LEFT</small><b id="mf-left">0</b></span><span class="mf-metric"><small>MATCHED</small><b id="mf-matched">0</b></span><span class="mf-metric"><small>SCORE</small><b id="mf-score">0</b></span><button type="button" class="mf-control mf-new" data-mf="new">New Board</button></div>
   <p class="mf-status" id="mf-status" role="status" aria-live="polite">Find two matching free tiles to clear a pair.</p>
   <div class="mf-board-frame"><div id="mf-board" class="mf-board" aria-label="Layered Mahjong tile board"></div></div>
   <div class="mf-bottom"><div class="mf-actions"><button type="button" class="mf-control" data-mf="undo">Undo <span id="mf-undo-count">1</span></button><button type="button" class="mf-control" data-mf="hint">Hint <span id="mf-hint-count">1</span></button><button type="button" class="mf-control" data-mf="shuffle">Shuffle <span id="mf-shuffle-count">1</span></button></div><p class="mf-rules"><b>How to play:</b> Match two identical tiles. Each symbol appears four times, so the removal order matters. Covered tiles and tiles blocked on both sides cannot be selected. Levels add a full layer until the largest layout is unlocked.</p><div class="mf-finish" id="mf-finish" hidden><strong>Board cleared!</strong><span>Next frost challenge unlocked.</span><button type="button" class="mf-control mf-new" data-mf="next">Next Level →</button></div><p class="mf-note">Independent FRB fan-made practice game. Tile symbols and game logic are original; Whiteout Survival characters and events are referenced by name.</p></div>
  </section>`};
 mountUI();
 const boardEl=mount.querySelector('#mf-board'),frame=mount.querySelector('.mf-board-frame'),statusEl=mount.querySelector('#mf-status');
 function coordsForLevel(n){
  const coords=[];const add=(x,y,z)=>coords.push({x,y,z,id:key(x,y,z)});
  baseRows.forEach(row=>{for(let x=row.a;x<=row.b;x++)add(x,row.y,0)});
  for(const y of [4,5])for(let x=1;x<=6;x++)add(x,y,1);
  for(const y of [3,4,5,6])for(let x=2;x<=5;x++)add(x,y,2);
  for(const y of [4,5])for(let x=3;x<=4;x++)add(x,y,3);
  const layers=Math.min(14,Math.max(4,n+3));
  for(let z=4;z<=layers;z++)for(const y of [4,5])for(let x=1;x<=6;x++)add(x,y,z);
  return coords;
 }
 function solutionPairs(n,coords){
  const byKey=new Map(coords.map(t=>[t.id,t]));const pairs=[];
  const rowPairs=(y,z,left,right)=>{const out=[];while(left<right){out.push([key(left,y,z),key(right,y,z)]);left++;right--;}return out};
  const interleave=queues=>{const work=queues.map(q=>q.slice()),out=[];while(work.some(q=>q.length)){const active=work.filter(q=>q.length);out.push(active[Math.floor(Math.random()*active.length)].shift());}return out};
  const addGroups=queues=>interleave(queues).forEach(([a,b])=>{const one=byKey.get(a),two=byKey.get(b);if(one&&two)pairs.push([one.id,two.id])});
  const layers=Math.min(14,Math.max(4,n+3));
  for(let z=layers;z>=4;z--)addGroups([4,5].map(y=>rowPairs(y,z,1,6)));
  addGroups([4,5].map(y=>[[key(3,y,3),key(4,y,3)]]));
  addGroups([3,4,5,6].map(y=>rowPairs(y,2,2,5)));
  addGroups([4,5].map(y=>rowPairs(y,1,1,6)));
  addGroups(baseRows.map(row=>rowPairs(row.y,0,row.a,row.b)));
  return pairs;
 } function makeBoard(){
  ended=false;selected=null;undoStack=[];score=0;moves=0;undoLeft=1;hintLeft=1;shuffleLeft=1;
  const coords=coordsForLevel(level),pairs=solutionPairs(level,coords),typeCount=pairs.length/2,types=shuffle([...Array(typeCount).keys()]);board=[];
  pairs.forEach((pair,i)=>pair.forEach(id=>{const t=coords.find(c=>c.id===id);if(t)board.push({...t,type:types[Math.floor(i/2)],uid:`${level}-${id}`} )}));
  statusEl.textContent='Find two matching free tiles to clear a pair.';mount.querySelector('#mf-finish').hidden=true;render();
 }
 function isFree(tile){
  const covered=board.some(other=>other.uid!==tile.uid&&other.x===tile.x&&other.y===tile.y&&other.z>tile.z);if(covered)return false;
  const left=board.some(other=>other.y===tile.y&&other.x===tile.x-1&&other.z>=tile.z);
  const right=board.some(other=>other.y===tile.y&&other.x===tile.x+1&&other.z>=tile.z);
  return !(left&&right);
 }
 function setTileSize(){
  const maxZ=Math.max(0,...board.map(t=>t.z)),width=Math.max(220,frame.clientWidth-12),tileW=Math.max(24,Math.min(56,Math.floor((width-8*4-maxZ*2)/8))),tileH=Math.round(tileW*1.22),stepX=tileW+4,stepY=tileH+4;
  boardEl.style.width=`${stepX*8+maxZ*2}px`;boardEl.style.height=`${stepY*10+maxZ}px`;boardEl.style.setProperty('--tile-w',`${tileW}px`);boardEl.style.setProperty('--tile-h',`${tileH}px`);boardEl.dataset.stepX=String(stepX);boardEl.dataset.stepY=String(stepY);
 }
 function render(){
  setTileSize();boardEl.innerHTML='';const stepX=Number(boardEl.dataset.stepX),stepY=Number(boardEl.dataset.stepY);
  board.slice().sort((a,b)=>a.z-b.z).forEach(tile=>{
   const button=document.createElement('button'),face=tiles[tile.type],isHero=heroNames.has(face.name),slug=face.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');button.type='button';button.className='mf-tile'+(selected&&selected.uid===tile.uid?' is-selected':'')+(isHero?' has-portrait':'');button.disabled=ended||!isFree(tile);button.dataset.tile=tile.uid;button.style.left=`${stepX*tile.x+tile.z*2}px`;button.style.top=`${stepY*tile.y-tile.z*0.5}px`;button.style.zIndex=String(tile.z*100+tile.y);button.style.setProperty('--tile-accent',face.color);button.setAttribute('aria-label',`${face.name}${isFree(tile)?', free tile':', blocked tile'}`);button.title=face.name+(isFree(tile)?' · free':' · blocked');button.innerHTML=`<span class="mf-glyph" aria-hidden="true">${face.glyph}</span>${isHero?`<img class="mf-portrait" src="https://wosguru.com/img/heroes/${slug}.png" alt="" draggable="false" referrerpolicy="no-referrer" onerror="this.hidden=true">`:''}<span class="mf-name">${face.name}</span>`;button.addEventListener('click',()=>pick(tile));boardEl.appendChild(button);
  });
  mount.querySelector('#mf-level').textContent=level;mount.querySelector('#mf-left').textContent=board.length/2;mount.querySelector('#mf-matched').textContent=moves;mount.querySelector('#mf-score').textContent=score;mount.querySelector('#mf-undo-count').textContent=undoLeft;mount.querySelector('#mf-hint-count').textContent=hintLeft;mount.querySelector('#mf-shuffle-count').textContent=shuffleLeft;
  mount.querySelector('[data-mf="undo"]').disabled=undoLeft<=0||!undoStack.length||ended;mount.querySelector('[data-mf="hint"]').disabled=hintLeft<=0||ended;mount.querySelector('[data-mf="shuffle"]').disabled=shuffleLeft<=0||ended||board.length<4;
 } function pick(tile){if(ended||!isFree(tile))return;if(!selected){selected=tile;statusEl.textContent='Now select the matching free tile.';render();return}if(selected.uid===tile.uid){selected=null;statusEl.textContent='Tile unselected.';render();return}if(selected.type===tile.type){const first=selected,second=tile;undoStack.push({first,second,score,moves});board=board.filter(t=>t.uid!==first.uid&&t.uid!==second.uid);selected=null;score+=100;moves++;statusEl.textContent='Pair matched. Look for the next open pair.';render();if(!board.length){ended=true;statusEl.textContent='Board cleared!';mount.querySelector('#mf-finish').hidden=false;render()}return}selected=tile;statusEl.textContent='Those tiles do not match. Choose a matching pair.';render()}
 function undo(){if(undoLeft<=0||!undoStack.length||ended)return;const last=undoStack.pop();board.push(last.first,last.second);score=last.score;moves=last.moves;undoLeft--;selected=null;statusEl.textContent='Last pair restored to the board.';mount.querySelector('#mf-finish').hidden=true;render()}
 function hint(){if(hintLeft<=0||ended)return;const free=board.filter(isFree);let pair=null;for(let i=0;i<free.length&&!pair;i++)for(let j=i+1;j<free.length;j++)if(free[i].type===free[j].type){pair=[free[i],free[j]];break}hintLeft--;if(!pair){statusEl.textContent='No matching free pair is visible. Try a different removal order or use Shuffle.';render();return}render();pair.forEach(tile=>boardEl.querySelector(`[data-tile="${tile.uid}"]`)?.classList.add('is-hint'));statusEl.textContent='Hint: the glowing tiles make a matching free pair.';setTimeout(()=>boardEl.querySelectorAll('.is-hint').forEach(node=>node.classList.remove('is-hint')),1800)}
 function shuffleRemaining(){if(shuffleLeft<=0||ended)return;const groups=new Map();board.forEach(tile=>{if(!groups.has(tile.type))groups.set(tile.type,[]);groups.get(tile.type).push(tile)});const groupList=shuffle([...groups.values()]),typeList=shuffle(groupList.map((_,i)=>i));groupList.forEach((group,index)=>group.forEach(tile=>tile.type=typeList[index]));shuffleLeft--;selected=null;statusEl.textContent='Remaining pairs have been reshuffled across the board.';render()}
 mount.querySelector('[data-mf="new"]').addEventListener('click',makeBoard);mount.querySelector('[data-mf="undo"]').addEventListener('click',undo);mount.querySelector('[data-mf="hint"]').addEventListener('click',hint);mount.querySelector('[data-mf="shuffle"]').addEventListener('click',shuffleRemaining);mount.querySelector('[data-mf="next"]').addEventListener('click',()=>{level++;makeBoard();boardEl.scrollIntoView({behavior:'smooth',block:'nearest'})});
 if('ResizeObserver'in window)new ResizeObserver(setTileSize).observe(frame);else window.addEventListener('resize',setTileSize);makeBoard();
})();
