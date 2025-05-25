import tkinter as tk
from tkinter import ttk, messagebox

# 示例汇率数据，实际使用中可从 API 获取
EXCHANGE_RATES = {
  "USD": 1.0,
  "CNY": 7.2,
  "EUR": 0.92,
  "GBP": 0.82
}


def convert_currency():
  try:
    # 获取用户输入的金额并转换为浮点数
    amount = float(amount_entry.get())
    # 获取用户选择的原始货币
    from_currency = from_currency_combobox.get()
    # 获取用户选择的目标货币
    to_currency = to_currency_combobox.get()

    # 检查选择的货币是否在汇率字典中
    if from_currency not in EXCHANGE_RATES or to_currency not in EXCHANGE_RATES:
      messagebox.showerror("错误", "不支持的货币类型。")
      return

    # 计算转换后的金额
    converted_amount = amount * (EXCHANGE_RATES[to_currency] / EXCHANGE_RATES[from_currency])
    # 显示转换结果
    result_label.config(text=f"{amount} {from_currency} = {converted_amount:.2f} {to_currency}")
  except ValueError:
    # 处理金额输入无效的情况
    messagebox.showerror("错误", "请输入有效的数字金额。")


# 创建主窗口
root = tk.Tk()
root.title("汇率计算器")

# 输入金额
amount_label = tk.Label(root, text="输入金额:")
amount_label.pack()
amount_entry = tk.Entry(root)
amount_entry.pack()

# 选择原始货币
from_currency_label = tk.Label(root, text="从哪种货币:")
from_currency_label.pack()
from_currency_combobox = ttk.Combobox(root, values=list(EXCHANGE_RATES.keys()))
from_currency_combobox.set(list(EXCHANGE_RATES.keys())[0])
from_currency_combobox.pack()

# 选择目标货币
to_currency_label = tk.Label(root, text="转换为哪种货币:")
to_currency_label.pack()
to_currency_combobox = ttk.Combobox(root, values=list(EXCHANGE_RATES.keys()))
to_currency_combobox.set(list(EXCHANGE_RATES.keys())[1])
to_currency_combobox.pack()

# 转换按钮
convert_button = tk.Button(root, text="转换", command=convert_currency)
convert_button.pack()

# 显示结果
result_label = tk.Label(root, text="")
result_label.pack()

# 运行主循环
root.mainloop()
