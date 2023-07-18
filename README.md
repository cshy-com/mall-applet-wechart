<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-17 14:33:45
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-07-17 11:16:21
 * @FilePath: \mall-admind:\work\mall-applet\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### 小程序用户身份
userType： 1 用户 2 商户

### 小程序中对应二维码规则
``` 
1 扫描二维码领取积分
规则 www.bankservice.shop/file/integral
小程序功能页面 pages/coupon/receive
测试连接 www.bankservice.shop/file/integral?code=

2 商家收款二维码
规则 www.bankservice.shop/file/payment
小程序功能页面 pages/coupon/paymentCode
测试连接 www.bankservice.shop/file/payment?code=

3 订单核销二维码
规则 www.bankservice.shop/file/order
小程序功能页面 pages/order/business-order-detail/business-order-detail
测试地址 www.bankservice.shop/file/order?code=
```
### 快速工具

#### 弹窗
```
// 默认
this.$tip.toast('弹窗的内容')
// 成功
this.$tip.successToast('操作成功的内容')
```

