# JQue

一个类 Jetpack Compose 的前端框架。
这种框架是纯 js 的，和 Jetpack Compose 是纯 kotlin 的好处是一样的，没有 CSS 和 HTML 这些。
利用 js 来表达 CSS 和 HTML 。
这样在组件化的时候，就只要一个 js 语言的文件就可以，去除了脚手架。
Vue 等带脚手架的框架，都是需要编译的，需要把 HTML 转成虚拟节点（也就是JS），CSS 剥离出来动态引入。
jQue 就适合那些无法使用脚手架的项目，比如一些原生使用 jQuery 的项目。
jQue 没有提供动态绑定（也可以说提供了，但是没有那么复杂。只是简单地用来通知刷新），而是响应式的，数据下行，事件上行的类 Jetpack Compose 模式。

## 名字

名字是由 jQuery 去尾 Vue 掐头组合的。 jQ + ue = jQue 了。
