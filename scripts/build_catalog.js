const fs = require('fs');
const path = require('path');

function getCategoryForAsset(gameId, relPath, fileName) {
  const p = (relPath + '/' + fileName).toLowerCase();
  
  if (gameId === 'p01') {
    if (p.includes('ui')) return 'UI Assets';
    if (p.includes('charakter animation') || p.includes('npc')) return 'Character & Animation';
    if (p.includes('boss') || p.includes('knight') || p.includes('penambang')) return 'Boss & Enemies';
    return 'Environment & Props';
  }
  
  if (gameId === 'p02') {
    if (p.includes('ui')) return 'UI Assets';
    return 'Character & Roles';
  }
  
  if (gameId === 'p03') {
    if (p.includes('ui')) return 'UI Assets';
    if (p.includes('level') || p.includes('water')) return 'Level Design & Environment';
    return 'Ships & Obstacles';
  }
  
  if (gameId === 'p04') {
    if (p.includes('ui') || p.includes('effect') || p.includes('magnet')) return 'UI & Ability Assets';
    return 'Character & Animation';
  }
  
  if (gameId === 'p05') {
    if (p.includes('charakter')) return 'Character';
    return 'Room Objects & Interior';
  }
  
  if (gameId === 'p06') {
    return 'Game Assets';
  }
  
  if (gameId === 'p07') {
    if (p.includes('wall')) return 'Walls & Obstacles';
    return 'Game Assets & Props';
  }
  
  return 'Game Assets';
}

const gameMeta = {
  'game 1': { id: 'p01', num: '01', title: 'Altalis' },
  'game 2': { id: 'p02', num: '02', title: 'Dust March' },
  'game 3': { id: 'p03', num: '03', title: 'Sea Fighter' },
  'game 4': { id: 'p04', num: '04', title: 'Fiz Catcher' },
  'game 5': { id: 'p05', num: '05', title: 'So You Can Rise Once Again' },
  'game 6': { id: 'p06', num: '06', title: 'Carrot Rain' },
  'game 7': { id: 'p07', num: '07', title: 'Crabfish Torpedo' }
};

const catalog = {};
for (const [gFolder, meta] of Object.entries(gameMeta)) {
  catalog[meta.id] = {
    id: meta.id,
    num: meta.num,
    title: meta.title,
    assets: []
  };
  
  const gDir = path.join('asset game saya kerjakan', gFolder);
  if (!fs.existsSync(gDir)) continue;

  function walk(currentDir, relativeSub) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    // Group files to prefer .gif over .png when an animated gif exists for that sheet
    const fileNames = entries.map(e => e.name);
    const gifNames = new Set(fileNames.filter(n => n.toLowerCase().endsWith('.gif')).map(n => n.toLowerCase()));

    for (const ent of entries) {
      const fullPath = path.join(currentDir, ent.name);
      if (ent.isDirectory()) {
        walk(fullPath, relativeSub ? relativeSub + '/' + ent.name : ent.name);
      } else {
        const ext = path.extname(ent.name).toLowerCase();
        if (ent.name.endsWith('.bak') || ent.name.endsWith('.tmp')) continue;

        // If this is a png that was converted to a gif, skip the static png in favor of the gif
        const baseName = ent.name.slice(0, -ext.length).toLowerCase();
        if (ext === '.png' && (gifNames.has(baseName + '.gif') || gifNames.has(baseName + '-sheet.gif'))) {
          continue;
        }

        if (['.png', '.jpg', '.jpeg', '.gif', '.mov', '.mp4'].includes(ext)) {
          const category = getCategoryForAsset(meta.id, relativeSub, ent.name);
          const webPath = ('asset game saya kerjakan/' + gFolder + '/' + (relativeSub ? relativeSub + '/' : '') + ent.name).replace(/\\\\/g, '/');
          const stat = fs.statSync(fullPath);
          catalog[meta.id].assets.push({
            fileName: ent.name,
            category: category,
            path: webPath,
            ext: ext,
            type: ['.mov', '.mp4'].includes(ext) ? 'video' : 'image',
            size: stat.size
          });
        }
      }
    }
  }

  walk(gDir, '');
}

fs.writeFileSync('game-assets-catalog.json', JSON.stringify(catalog, null, 2), 'utf8');
fs.writeFileSync('game-assets-catalog.js', 'window.GAME_ASSETS_CATALOG = ' + JSON.stringify(catalog) + ';', 'utf8');
console.log('Catalog rebuilt with animated GIFs.');
for (const k of Object.keys(catalog)) {
  const gifCount = catalog[k].assets.filter(a => a.ext === '.gif').length;
  console.log(k, catalog[k].title, 'Total assets:', catalog[k].assets.length, 'GIFs:', gifCount);
}

