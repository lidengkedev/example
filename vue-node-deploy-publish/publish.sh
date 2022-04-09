# npm publish（npm包） 发布脚本
npm config set registry=https://registry.npmjs.org

# 登陆 ，如果有 OTP, 邮箱会接收到验证码，输入即可
npm login

# 登录成功后，短时间内会保存状态，可以直接 npm pubish
# 可能会提示名称已存在，换个名字，获取使用作用域包（@xxx/xxx）
npm publish
# 还原淘宝镜像
npm config set registry=https://registry.npm.taobao.org
