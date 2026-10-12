import asyncio
import edge_tts

TEXT = '这是需要输入的文本内容，输出的语音在播放时将听到此处的所有文本内容。'
VOICE = 'zh-CN-XiaoxiaoNeural'
OUTPUT = 'output.mp3'

async def main():
  communicate = edge_tts.Communicate(
    text=TEXT,    # 输入文本
    voice=VOICE,  # 音色
    rate='+0%',   # 语速
    volume='+0%', # 音量
    pitch='+0Hz'  # 音调
  )
  await communicate.save(OUTPUT)
  print(f'已生成：{OUTPUT}')

if __name__ == '__main__':
  asyncio.run(main())
