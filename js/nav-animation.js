// 导航菜单动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单效果
    initNavMenu();
    
    // 添加滚动监听
    window.addEventListener('scroll', function() {
        updateNavbarOnScroll();
    });
    
    // 初始触发一次滚动事件以设置初始状态
    updateNavbarOnScroll();
});

// 初始化导航菜单
function initNavMenu() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    // 为每个导航链接添加鼠标悬停效果
    navLinks.forEach(link => {
        // 当前页面激活状态
        if (link.href === window.location.href || window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
        
        // 添加鼠标悬停效果
        link.addEventListener('mouseenter', function() {
            this.classList.add('perspective-active');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('perspective-active');
        });
    });
    
    // 使用Anime.js为导航栏添加加载动画
    if (typeof anime !== 'undefined') {
        anime.timeline({
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.navbar-brand',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 800
        })
        .add({
            targets: '.nav-item',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 600,
            delay: anime.stagger(100)
        }, '-=600');
    }
}

// 根据滚动位置更新导航栏样式
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        // 滚动后导航栏样式
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        // 初始导航栏样式
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        navbar.style.backgroundColor = '#000000';
    }
} 