# 视频剪辑工具
# 支持视频剪切
# 支持视频合并
# 支持添加音频
# 支持调整播放速度
# 支持添加文字水印
# 支持逐帧处理
# 支持批量处理文件夹内的视频
# 支持用户界面

# from moviepy.editor import VideoFileClip
from moviepy.video.io.VideoFileClip import VideoFileClip

# print(dir(VideoFileClip))

def cut_video(input_path, output_path, start_time, end_time):
  # 读取视频
  video = VideoFileClip(input_path)
  # 剪切视频片段（单位：秒）
  clipped_video = video.subclipped(start_time, end_time)
  # 导出视频
  clipped_video.write_videofile(
    output_path,
    codec="libx264",
    audio_codec="aac",
    threads=4  # 推荐添加多线程加速
  )

# 示例：剪切 input.mp4 的第 5 到 15 秒
# cut_video("input.mp4", "output_cut.mp4", 5, 15)

# import tkinter as tk
# from tkinter import filedialog

# class VideoEditorApp:
#     def __init__(self):
#         self.window = tk.Tk()
#         self.window.title("简易视频剪辑工具")
#         # 添加按钮和输入框
#         self.btn_open = tk.Button(self.window, text="选择视频", command=self.open_file)
#         self.btn_open.pack()
#         self.window.mainloop()
    
#     def open_file(self):
#         file_path = filedialog.askopenfilename(filetypes=[("MP4 files", "*.mp4")])
#         if file_path:
#             clip = VideoFileClip(file_path)
#             # 在此添加剪辑逻辑

# if __name__ == "__main__":
#     app = VideoEditorApp()