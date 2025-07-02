const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const https = require('https');
const sharp = require('sharp');
var i = "includ"
  , e = "h"
  , r = "charC"
  , o = "odeAt";
function a(n, t) {
    if (n.includes)
        return n["includes"](t);
    for (var e = 0, r = n[function(n) {
        if (!n)
            return "";
        for (var t = "", i = "V587", e = 50133, r = 0; r < n.length; r++) {
            var o = n.charCodeAt(r);
            o ^= i.charCodeAt(e = (e + 1) % i.length),
            t += String.fromCharCode(o)
        }
        return t
    }("TR8RL_")]; e < r; e++)
        if (n[e] === t)
            return !0;
    return !1
}
function An(n) {
            for (var t = [1, 0, 3, 2], i = 0; ; ) {
                switch (t[i++]) {
                case 0:
                    var c = [];
                    continue;
                case 1:
                    var s = "lengt";
                    continue;
                case 2:
                    return c;
                case 3:
                    for (var d = 0; d < n[[s, e].join("")]; d++) {
                        var u = n[[r, o].join("")](d);
                        if (32 === d)
                            break;
                        for (; a(c, u % 32); )
                            u++;
                        c.push(u % 32)
                    }
                    continue
                }
                break
            }
        }
function sn(i) {
    return An(i.split("/")[7].split(".")[0])
}
function get_capture(bg_img){
  return sn(bg_img)
}
// i = "https://static4.dingxiang-inc.com/picture/dx/PG9u1XrXvs/zib3/3ac4bf40f6d344ad93314b413bbabf7f.webp"

// 1. 下载图片
async function downloadImage(url, path) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' } // 防止被反爬
    }, (response) => {
      if (response.statusCode !== 200) return reject(new Error('HTTP Error'));
      const file = fs.createWriteStream(path);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    });
    request.on('error', reject);
  });
}

// 2. 转换格式
async function convertImage(src, dest) {
  await sharp(src)
    .toFormat('png')
    .toFile(dest);
}

async function main(bg_img) {
  try {
    // 下载原图
    const webpPath = './temp.webp';
    await downloadImage(
      bg_img,
      webpPath
    );

    // 转换为 PNG
    const pngPath = './temp.png';
    await convertImage(webpPath, pngPath);

    // 加载图片
    const img = await loadImage(pngPath);

    // 创建 Canvas
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 400, 200);

    // 原切片逻辑
    const paramsArray = get_capture(bg_img);
    const a = Math.floor(400 / paramsArray.length);

    paramsArray.forEach((n, i) => {
      const srcX = n * a;
      ctx.drawImage(
        img,
        srcX, 0, a, 200, // 源
        i * a, 0, a, 200 // 目标
      );
    });

    // 保存结果
    const out = fs.createWriteStream('output.png');
    canvas.createPNGStream().pipe(out);
    console.log('处理完成，输出到 output.png');

  } catch (err) {
    console.error('运行出错:', err);
  }
}

main();