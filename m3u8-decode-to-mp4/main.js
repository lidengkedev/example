const https = require('https');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
/**
 * 1. 获取m3u8源文件
 * 2. 解析M3U8源文件中每一行内容，获取到所有的 ts 文件
 * 3. 下载所有的ts文件到 test-decode-m3u8 文件夹中
 * 4. 生成批量解密所有ts文件的脚本文件
 * 5. 生成解密后的m3u8文件
 * 6. 执行批量解密ts的脚本
 * 7. 执行ts合并为mp4命令
 */

// 定义M3U8文件解密后转MP4的文件夹
const encode_dirname = 'm3u8-decode-to-ts';
// 定义从网络下载下来的原始M3U8文件的文件名
const source_m3u8_filename = 'm3u8-https.m3u8';
// 定义文件夹中不可被删除的子文件的白名单
const white_list = [source_m3u8_filename, 'main.js'];
// 定义ts文件下载域名
// const ts_https_hostname = 'play.cdnmicrosoft.com';
const ts_https_hostname = 'apd-vlive.apdcdn.tc.qq.com';
// 定义批量解密https下载的ts文件的脚本内容
let ts_decode_shell_text = '#!/bin/bash\r\n';
// 定义批量解密ts文件的脚本文件的文件名
const decode_ts_shell_filename = 'decode-ts.sh';
// 定义ts解密后新的M3U8文件内容
let decode_m3u8_text = '';
// 定义ts解密后在本地生成的新的M3U8文件的文件名
const encode_m3u8_filename = 'm3u8-decode.m3u8';
// 定义ts解密的解密方式
// const ts_decode_method = 'aes-128-cbc';
const ts_decode_method = 'SAMPLE-AES-CTR';
// 定义ts解密的KEY内容
// const ts_decode_key = '7AC3832FBF30295D5CA27035D9A2487D';
const ts_decode_key = 'EA9B2C87226D7A771E9EDB78D74D31720E2A'
// 定义ts解密的iv偏移量
// const ts_decode_iv = 'f64b3f577ab4b1a7a832aabe9d9e77';
const ts_decode_iv = 'B4DCD83175C3EF5C090110BD165A4AEC';

// openssl ${ts_decode_method} -d -in ${ts_filename} -out ${ts_filename}.ts -iv ${ts_decode_iv} -K ${ts_decode_key}

// 定义已经下载完成的文件列表
const download_ts_file_list = []
// 批量合并ts为mp4的文件名
const merge_ts_to_mp4_filename = 'merge-ts-to-mp4.mp4';

// 判断文件夹是否存在
if (fs.existsSync(path.resolve(__dirname, encode_dirname))) {
  // fs.rmdirSync(path.resolve(__dirname, encode_dirname), { recursive: true })
  // 获取文件夹中所有子文件的文件名列表
  const dir_list = fs.readdirSync(path.resolve(__dirname, encode_dirname));
  dir_list.forEach(async file => {
    // https-source.m3u8 和 main.js 不可删除
    if (white_list.includes(file)) {
      console.log(`${file} is not deleted`)
    } else {
      // 如果存在则删除文件夹下的其他子文件
      console.log(`Deleted ${file}`)
      await fs.rmSync(path.resolve(__dirname, encode_dirname, file), { recursive: true }, (err) => {
        if (err) console.log(err)
      })
    }
  })
} else {
  fs.mkdirSync(path.resolve(__dirname, encode_dirname));
}

// 解析从网络下载下来的M3U8源文件内容
const m3u8_https_text = fs.readFileSync(path.resolve(__dirname, source_m3u8_filename), 'utf8');
// 过滤出M3U8源文件中所有的ts文件的链接地址
const m3u8_https_text_ts_path_list = m3u8_https_text.split('\r\n').filter(line => line.endsWith('.ts'));

/**
 * 下载指定 URL 的文件并将其保存到本地
 * @param {string} url - 要下载的文件的 URL
 * @param {string} fileName - 下载后要保存的文件名（包括扩展名）
 * @param {number} index - 文件在下载队列中的索引
 */
function download(url, fileName, index) {
  const options = {
    hostname: ts_https_hostname,
    path: url,
    method: 'GET'
  };
  https.get(options, (res) => {
    res.pipe(fs.createWriteStream(path.resolve(__dirname, encode_dirname, fileName)));
    res.on('end', () => {
      download_ts_file_list.push(`${fileName}.ts`)
      console.log(`Downloaded [${download_ts_file_list.length}/${m3u8_https_text_ts_path_list.length}] ${fileName}.ts`);
      if (download_ts_file_list.length === m3u8_https_text_ts_path_list.length) {
        console.log(`Downloaded [${download_ts_file_list.length}/${m3u8_https_text_ts_path_list.length}] is completed`);
        const decode_ts_shell_path = path.resolve(__dirname, encode_dirname);
        // 执行批量解密ts的脚本
        execSync(`cd ${decode_ts_shell_path}&` + `bash ${decode_ts_shell_filename}`, { stdio: 'inherit' });
        console.log(`Executed ${decode_ts_shell_filename}`);
        // 执行批量ts合并为mp4的脚本
        execSync(`cd ${decode_ts_shell_path}&` + `ffmpeg -i ${encode_m3u8_filename} -c copy ${merge_ts_to_mp4_filename}`, {
          stdio: 'inherit'
        });
        console.log(`Executed ffmpeg`);
      }
    });
  }).on('error', (err) => {
    console.log(err)
  })
}

function downloadAll() {
  for (let i = 0; i < m3u8_https_text_ts_path_list.length; i++) {
    const ts_file_path = m3u8_https_text_ts_path_list[i];
    let ts_filename = ts_file_path.split('/').pop();
    ts_filename = ts_filename.split('.')[0]
    ts_decode_shell_text += `openssl ${ts_decode_method} -d -in ${ts_filename} -out ${ts_filename}.ts -iv ${ts_decode_iv} -K ${ts_decode_key}\r\n`;
    download(ts_file_path, ts_filename, i);
  }
}
// 下载所有ts文件
downloadAll()
// 生成ts解密文件的脚本
fs.writeFileSync(path.resolve(__dirname, encode_dirname, decode_ts_shell_filename), ts_decode_shell_text);
console.log(`Generated ${decode_ts_shell_filename}`);

// 根据https获取的原始M3U8文件重新生成无加密的M3U8文件
m3u8_https_text.split('\r\n').forEach(line => {
  let new_line = line
  // 如果包含#EXT-X-KEY，则不处理，相当于移除了加密
  if (line.includes('#EXT-X-KEY')) {
    //
  } else {
    // 仅保留ts路径的最后一级，即ts的文件路径是当前文件夹
    if (line.endsWith('.ts')) {
      new_line = line.split('/').pop();
    }
    decode_m3u8_text += new_line + '\r\n';
  }
})

fs.writeFileSync(path.resolve(__dirname, encode_dirname, encode_m3u8_filename), decode_m3u8_text);
console.log(`Generated ${encode_m3u8_filename}`);
