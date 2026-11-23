const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const { GIFEncoder, quantize, applyPalette } = require('gifenc');

// Mapping of files to their frame width & height, delayMs, and optional scale factor to keep GIFs lightweight
const sheetConfigs = [
  // --- Game 1: Rachel (Charakter Animation) ---
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/AMBIL TONGKAT/KKKK PICK NO T-Sheet-export.png', fw: 126, fh: 126, delay: 100 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Berlari/runn no mana-Sheet.png', fw: 126, fh: 126, delay: 80 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Berlari/runn-Sheet.png', fw: 126, fh: 126, delay: 80 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Idle/idle no tongkat-Sheet.png', fw: 126, fh: 126, delay: 120 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Idle/idle-Sheet.png', fw: 126, fh: 126, delay: 120 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Jatuh tutorial/jatuh-Sheet.png', fw: 126, fh: 126, delay: 100 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Lompat/jump no tongkat-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Lompat/jump-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Mati/normal die/die no tongkat-Sheet.png', fw: 126, fh: 126, delay: 110 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Mati/normal die/die-Sheet.png', fw: 126, fh: 126, delay: 110 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Melihat atas/look up-no tongkat-Sheet-export.png', fw: 126, fh: 126, delay: 140 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Melihat atas/look up-Sheet.png', fw: 126, fh: 126, delay: 140 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Melihat bawah/look down- no tonghkat Sheet-Sheet.png', fw: 126, fh: 126, delay: 140 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/Melihat bawah/look down-Sheet.png', fw: 126, fh: 126, delay: 140 },
  { file: 'asset game saya kerjakan/game 1/Charakter Animation/terkena DMG/terkena dmg-Sheet-export.png', fw: 126, fh: 126, delay: 90 },

  // --- Game 1: NPCs ---
  { file: 'asset game saya kerjakan/game 1/NPC/elf-Sheet.png', fw: 64, fh: 64, delay: 120 },
  { file: 'asset game saya kerjakan/game 1/NPC/guardian-Sheet.png', fw: 128, fh: 128, delay: 120 },

  // --- Game 1: Enemy Knight ---
  { file: 'asset game saya kerjakan/game 1/enemy knight/knight atk-Sheet.png', fw: 80, fh: 80, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/enemy knight/knight DASH-Sheet.png', fw: 90, fh: 90, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/enemy knight/knight idle-Sheet.png', fw: 90, fh: 90, delay: 110 },
  { file: 'asset game saya kerjakan/game 1/enemy knight/knight jatuh-Sheet.png', fw: 90, fh: 90, delay: 100 },
  { file: 'asset game saya kerjakan/game 1/enemy knight/knight walk-Sheet.png', fw: 80, fh: 80, delay: 100 },

  // --- Game 1: Penambang Jahat ---
  { file: 'asset game saya kerjakan/game 1/penambang jahat/penambang Jahat Attack-export1.png', fw: 64, fh: 64, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/penambang jahat/penambang jahat Dead-export2.png', fw: 64, fh: 64, delay: 100 },
  { file: 'asset game saya kerjakan/game 1/penambang jahat/penambang jahat idle-export4.png', fw: 64, fh: 64, delay: 120 },
  { file: 'asset game saya kerjakan/game 1/penambang jahat/penambang jahat walk-export3.png', fw: 64, fh: 64, delay: 100 },

  // --- Game 1: Boss 1 ---
  { file: 'asset game saya kerjakan/game 1/boss 1/attack 1/attack 1-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/attack 2/attack 2-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/attack 3/kilikk 4-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/attack 4/enemy skill 3-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/attack 4/kilikk 3-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/DASH/DASH-Sheet.png', fw: 126, fh: 126, delay: 80 },
  { file: 'asset game saya kerjakan/game 1/boss 1/idle/enemy-Sheet.png', fw: 126, fh: 126, delay: 120 },
  { file: 'asset game saya kerjakan/game 1/boss 1/jalan/walking enemy-Sheet.png', fw: 126, fh: 126, delay: 90 },
  { file: 'asset game saya kerjakan/game 1/boss 1/stun/stunn_-Sheet.png', fw: 126, fh: 126, delay: 100 },

  // --- Game 3: Kapal Animasi ---
  { file: 'asset game saya kerjakan/game 3/Kapal/Kapal Animasi.png', fw: 64, fh: 96, delay: 120 },

  // --- Game 4: Fiz Catcher Characters & Stun ---
  { file: 'asset game saya kerjakan/game 4/player harimau.png', fw: 640, fh: 640, delay: 90, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/player rubah.png', fw: 640, fh: 640, delay: 90, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/player serigala.png', fw: 640, fh: 640, delay: 90, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/Playerr hiu.png', fw: 640, fh: 640, delay: 90, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/enemy manusia biasa makan nasi.png', fw: 640, fh: 640, delay: 90, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/pusing (stun)/harimau pusing.png', fw: 640, fh: 640, delay: 110, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/pusing (stun)/hiu pusing.png', fw: 640, fh: 640, delay: 110, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/pusing (stun)/rubah pusing.png', fw: 640, fh: 640, delay: 110, scale: 0.35 },
  { file: 'asset game saya kerjakan/game 4/pusing (stun)/serigala pusing.png', fw: 640, fh: 640, delay: 110, scale: 0.35 },

  // --- Game 7: Crabfish Equipment & Loops ---
  { file: 'asset game saya kerjakan/game 7/botol cola/Bottol isinya goyang/botol animasi.png', fw: 1280, fh: 960, delay: 100, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/Torpedo/Torpedo loop/torpedo loop.png', fw: 1280, fh: 960, delay: 90, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/Torpedo/Opening animasi/torpedo pening.png', fw: 1280, fh: 960, delay: 100, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/Kipas hitam/Loop/loop kipas.png', fw: 1280, fh: 960, delay: 90, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/Kipas hitam/Opening/kipas open.png', fw: 1280, fh: 960, delay: 90, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/kipas pink/Animasi loop/kipas pink loop.png', fw: 1280, fh: 960, delay: 90, scale: 0.25 },
  { file: 'asset game saya kerjakan/game 7/kipas pink/Opening animasi/kipas pink opening.png', fw: 1280, fh: 960, delay: 90, scale: 0.25 },

  // --- Game 1: UI & Objects Sprite Sheets ---
  { file: 'asset game saya kerjakan/game 1/UI Button Interaction/E.png', fw: 100, fh: 100, delay: 110 },
  { file: 'asset game saya kerjakan/game 1/UI Selection/used/cahaya mengkilap-Sheet.png', fw: 96, fh: 96, delay: 120 },

  // --- Game 3: Enemy Obstacle Sprite Sheet ---
  { file: 'asset game saya kerjakan/game 3/Enemy/Obstecle kayu.png', fw: 64, fh: 64, delay: 120 }
];

function convertSheet(cfg) {
  if (!fs.existsSync(cfg.file)) {
    console.warn('File not found:', cfg.file);
    return null;
  }

  const pngData = fs.readFileSync(cfg.file);
  const png = PNG.sync.read(pngData);
  const fw = cfg.fw;
  const fh = cfg.fh;
  const cols = Math.floor(png.width / fw);
  const rows = Math.floor(png.height / fh);

  const scale = cfg.scale || 1;
  const outW = Math.round(fw * scale);
  const outH = Math.round(fh * scale);

  const frames = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let hasPixels = false;
      const rawFrame = new Uint8Array(fw * fh * 4);

      for (let y = 0; y < fh; y++) {
        for (let x = 0; x < fw; x++) {
          const sIdx = ((r * fh + y) * png.width + (c * fw + x)) * 4;
          const dIdx = (y * fw + x) * 4;
          rawFrame[dIdx] = png.data[sIdx];
          rawFrame[dIdx + 1] = png.data[sIdx + 1];
          rawFrame[dIdx + 2] = png.data[sIdx + 2];
          rawFrame[dIdx + 3] = png.data[sIdx + 3];
          if (png.data[sIdx + 3] > 10) hasPixels = true;
        }
      }

      if (hasPixels) {
        if (scale === 1) {
          frames.push(rawFrame);
        } else {
          // Downsample with nearest neighbor / box average for crispness
          const scaled = new Uint8Array(outW * outH * 4);
          for (let dy = 0; dy < outH; dy++) {
            for (let dx = 0; dx < outW; dx++) {
              const sx = Math.min(fw - 1, Math.floor(dx / scale));
              const sy = Math.min(fh - 1, Math.floor(dy / scale));
              const sIdx = (sy * fw + sx) * 4;
              const dIdx = (dy * outW + dx) * 4;
              scaled[dIdx] = rawFrame[sIdx];
              scaled[dIdx + 1] = rawFrame[sIdx + 1];
              scaled[dIdx + 2] = rawFrame[sIdx + 2];
              scaled[dIdx + 3] = rawFrame[sIdx + 3];
            }
          }
          frames.push(scaled);
        }
      }
    }
  }

  if (!frames.length) {
    console.warn('No frames extracted for:', cfg.file);
    return null;
  }

  // Create GIF
  const gif = GIFEncoder();
  for (const frame of frames) {
    const palette = quantize(frame, 256, { format: 'rgba4444', oneBitAlpha: true });
    const index = applyPalette(frame, palette, 'rgba4444');
    const transparentIndex = palette.findIndex(p => p[3] === 0);
    gif.writeFrame(index, outW, outH, {
      palette,
      delay: cfg.delay || 100,
      transparent: transparentIndex !== -1,
      transparentIndex: transparentIndex !== -1 ? transparentIndex : 0
    });
  }

  gif.finish();
  const outPath = cfg.file.replace(/\.(png|jpg|jpeg)$/i, '.gif');
  fs.writeFileSync(outPath, Buffer.from(gif.bytes()));
  console.log(`Converted: ${path.basename(cfg.file)} -> ${path.basename(outPath)} (${frames.length} frames, ${outW}x${outH})`);
  return outPath;
}

console.log(`Starting conversion of ${sheetConfigs.length} sprite sheets to GIF...`);
let successCount = 0;
for (const cfg of sheetConfigs) {
  try {
    const res = convertSheet(cfg);
    if (res) successCount++;
  } catch (err) {
    console.error('Error converting', cfg.file, err.message);
  }
}
console.log(`Finished converting ${successCount} of ${sheetConfigs.length} sprite sheets.`);

