import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
import ttkbootstrap as ttb
from PIL import Image

# 全局变量，用于存储选择的图片路径
selected_image_path = ""


def select_image():
    global selected_image_path
    selected_image_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg;*.jpeg;*.png;*.webp;*.gif;*.awebp")])
    if selected_image_path:
        status_label.config(text=f"已选择图片: {selected_image_path}")
        convert_button.state(['!disabled'])
        output_format_combobox.state(['!readonly'])


def convert_image():
    if selected_image_path:
        output_format = output_format_combobox.get()
        output_path = filedialog.asksaveasfilename(defaultextension=f".{output_format}",
                                                   filetypes=[(f"{output_format.upper()} files", f"*.{output_format}")])
        if output_path:
            try:
                img = Image.open(selected_image_path)
                img.save(output_path)
                status_label.config(text="转换成功！")
            except Exception as e:
                status_label.config(text=f"转换失败: {e}")


# 创建主窗口
root = ttb.Window(themename="flatly")
root.title("图片格式转换工具")
root.geometry("400x300")

# 选择图片按钮
select_image_button = ttb.Button(root, text="选择图片", command=select_image)
select_image_button.pack(pady=20)

# 输出格式选择下拉框
output_format_label = ttb.Label(root, text="选择输出格式:")
output_format_label.pack(pady=5)
output_formats = ["jpg", "jpeg", "png", "webp", "gif"]
output_format_combobox = ttb.Combobox(root, values=output_formats, state='readonly')
output_format_combobox.set("jpg")
output_format_combobox.pack(pady=5)

# 转换按钮，初始禁用
convert_button = ttb.Button(root, text="开始转换", command=convert_image, state='disabled')
convert_button.pack(pady=20)

# 状态标签
status_label = ttb.Label(root, text="请选择图片")
status_label.pack(pady=10)

# 运行主循环
root.mainloop()
