# Anime.js 网页动画指南

## 简介

Anime.js 是一个轻量级的 JavaScript 动画库，能够帮助你创建各种复杂的网页动画。这个库具有良好的性能和灵活性，可以用于各种网页元素的动画效果。

## 基本使用

### 引入 Anime.js

首先，你需要在HTML文件中引入Anime.js库：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
```

### 基本动画

创建一个简单的动画：

```javascript
// 选择目标元素并制作动画
anime({
  targets: '.element', // CSS选择器或DOM元素
  translateX: 250, // 属性和终值
  rotate: '1turn', // CSS变换
  duration: 800, // 持续时间（毫秒）
  easing: 'easeInOutQuad' // 缓动函数
});
```

## 动画属性

### 常用属性

- **位置/变换**：`translateX`, `translateY`, `translateZ`, `rotate`, `scale`, `skew`
- **尺寸**：`width`, `height`, `borderRadius`
- **可见性**：`opacity`
- **颜色**：`backgroundColor`, `color`, `borderColor`
- **SVG**：`strokeDashoffset`, `fill`

### 属性值表示法

```javascript
// 基本值
translateX: 250

// 单位值
translateX: '50%',
rotate: '1turn',
borderRadius: '5px'

// 相对值 (+=, -=)
translateX: '+=50px'

// 函数值
translateX: function() {
  return anime.random(0, 100);
}

// 动画路径
translateX: [0, 100, 50]
```

## 时间控制

```javascript
// 持续时间（毫秒）
duration: 1000

// 延迟
delay: 500

// 函数延迟
delay: function(el, i, l) {
  return i * 100; // 级联延迟
}

// 循环
loop: true
loop: 3 // 指定次数

// 方向
direction: 'alternate' // 正向和反向交替
```

## 缓动函数

```javascript
// 内置缓动
easing: 'easeInOutQuad'

// 弹簧效果
easing: 'spring(mass, stiffness, damping, velocity)'

// 弹跳效果
easing: 'easeOutElastic(amplitude, period)'
```

常用的缓动函数：
- `linear`：线性
- `easeInOutQuad`：二次曲线缓入缓出
- `easeOutExpo`：指数曲线缓出
- `easeInOutBack`：回弹效果
- `easeOutBounce`：弹跳效果

## 时间轴

时间轴允许你创建一系列按顺序执行的动画：

```javascript
const timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

// 添加动画到时间轴
timeline
  .add({
    targets: '.element1',
    translateX: 250
  })
  .add({
    targets: '.element2',
    translateX: 250
  }, '-=500'); // 可以在第一个动画还未结束前就开始第二个动画
```

## 回调函数

```javascript
anime({
  targets: '.element',
  translateX: 250,
  duration: 1000,
  // 动画开始前
  begin: function(anim) {
    console.log('动画开始');
  },
  // 每一帧更新
  update: function(anim) {
    console.log('更新：' + Math.round(anim.progress) + '%');
  },
  // 动画完成时
  complete: function(anim) {
    console.log('动画完成');
  }
});
```

## SVG动画

SVG路径绘制动画：

```javascript
// 获取路径长度
const path = document.querySelector('.my-path');
const pathLength = path.getTotalLength();

// 初始化路径
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

// 创建绘制动画
anime({
  targets: path,
  strokeDashoffset: [pathLength, 0],
  duration: 2000,
  easing: 'easeInOutSine'
});
```

## 一些实用技巧

### 元素出现动画

```javascript
// 滚动时元素出现
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

window.addEventListener('scroll', function() {
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    if (isElementInViewport(element) && !element.classList.contains('animated')) {
      element.classList.add('animated');
      
      anime({
        targets: element,
        opacity: [0, 1],
        translateY: [50, 0],
        easing: 'easeOutExpo',
        duration: 800
      });
    }
  });
});
```

### 交互动画

```javascript
// 悬停动画
const hoverElement = document.querySelector('.hover-element');
hoverElement.addEventListener('mouseenter', function() {
  anime({
    targets: this,
    scale: 1.1,
    duration: 300,
    easing: 'easeOutQuad'
  });
});

hoverElement.addEventListener('mouseleave', function() {
  anime({
    targets: this,
    scale: 1.0,
    duration: 300,
    easing: 'easeOutQuad'
  });
});
```

### 创建粒子动画

```javascript
// 创建多个粒子及其动画
function createParticles(container, count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机初始位置
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // 粒子动画
    anime({
      targets: particle,
      translateX: function() { return anime.random(-100, 100) + 'px'; },
      translateY: function() { return anime.random(-100, 100) + 'px'; },
      scale: function() { return anime.random(0.1, 1); },
      opacity: [0.2, 0.6, 0.2],
      easing: 'easeInOutQuad',
      duration: function() { return anime.random(3000, 8000); },
      loop: true,
      direction: 'alternate'
    });
  }
}
```

## 实际应用示例

### 加载动画

```javascript
// 创建加载动画
const loader = document.querySelector('.loader');
anime({
  targets: loader.querySelectorAll('circle'),
  scale: [0, 1],
  opacity: [0, 1],
  easing: 'easeInOutQuad',
  duration: 1000,
  delay: anime.stagger(200),
  loop: true,
  direction: 'alternate'
});
```

### 页面过渡动画

```javascript
// 页面切换动画
const transition = document.querySelector('.page-transition');
function pageTransition(url) {
  anime.timeline()
    .add({
      targets: transition,
      scaleX: [0, 1],
      duration: 600,
      easing: 'easeInOutExpo',
      complete: function() {
        window.location.href = url;
      }
    });
}
```

### 按钮点击效果

```javascript
// 按钮点击波纹效果
document.querySelectorAll('.ripple-button').forEach(button => {
  button.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    
    const rect = this.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left - diameter/2}px`;
    circle.style.top = `${e.clientY - rect.top - diameter/2}px`;
    
    this.appendChild(circle);
    
    anime({
      targets: circle,
      scale: [0, 1],
      opacity: [1, 0],
      easing: 'easeOutQuad',
      duration: 600,
      complete: function() {
        circle.remove();
      }
    });
  });
});
```

## 进阶技巧与性能优化

1. **使用transform和opacity**：尽可能使用transform和opacity进行动画，这些属性的动画效率更高。

2. **使用requestAnimationFrame**：对于复杂动画，使用`requestAnimationFrame`进行更精细的控制。

3. **批量更新**：如果有多个元素需要动画，使用`targets`一次选择所有元素，而不是创建多个动画实例。

4. **使用GPU加速**：添加`will-change`属性提示浏览器提前准备动画。

   ```css
   .animating-element {
     will-change: transform, opacity;
   }
   ```

5. **谨慎使用复杂动画**：在移动设备上尤其要注意性能问题，避免过多同时进行的复杂动画。

## 资源与学习

- [官方文档](https://animejs.com/documentation/)
- [GitHub仓库](https://github.com/juliangarnier/anime/)
- [官方示例](https://animejs.com/documentation/#examples)

## 总结

Anime.js提供了一种简洁而强大的方式来创建网页动画。它的灵活性和性能使它成为前端动画的首选工具之一。掌握了这些基础知识后，你可以创建从简单到复杂的各种动画效果，提升用户体验。 