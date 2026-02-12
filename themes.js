// 主题配置系统
const THEMES = {
    classic: {
        name: '经典夜空',
        background: 'rgba(0,5,24,1)',
        cityColor: 'normal',
        moonColor: 'rgba(240,219,120,0.8)',
        starColor: 'rgba(255,255,255,0.8)',
        buttonColor: '#d26ae5',
        textColor: '#ffffff',
        fireworkColors: 'random',
        specialEffect: 'none'
    },
    romantic: {
        name: '粉色浪漫',
        background: 'linear-gradient(to bottom, #ff9a9e 0%, #fad0c4 50%, #ffd1ff 100%)',
        cityColor: 'pink',
        moonColor: 'rgba(255,182,193,0.8)',
        starColor: 'rgba(255,255,255,0.9)',
        buttonColor: '#ff6b9d',
        textColor: '#ffffff',
        fireworkColors: ['#ff6b9d', '#ff8fab', '#ffb3c1', '#ffc2d1'],
        specialEffect: 'hearts'
    },
    dreamy: {
        name: '紫色梦幻',
        background: 'linear-gradient(to bottom, #4A00E0 0%, #8E2DE2 50%, #DA22FF 100%)',
        cityColor: 'purple',
        moonColor: 'rgba(218,112,214,0.8)',
        starColor: 'rgba(255,255,255,0.9)',
        buttonColor: '#DA22FF',
        textColor: '#ffffff',
        fireworkColors: ['#DA22FF', '#8E2DE2', '#B24BF3', '#C77DFF'],
        specialEffect: 'shooting-stars'
    },
    starry: {
        name: '蓝色星空',
        background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)',
        cityColor: 'blue',
        moonColor: 'rgba(173,216,230,0.8)',
        starColor: 'rgba(135,206,250,0.9)',
        buttonColor: '#4A90E2',
        textColor: '#ffffff',
        fireworkColors: ['#4A90E2', '#5DA5E8', '#73BAEE', '#89CFF0'],
        specialEffect: 'aurora'
    },
    sakura: {
        name: '樱花主题',
        background: 'linear-gradient(to bottom, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
        cityColor: 'sakura',
        moonColor: 'rgba(255,192,203,0.9)',
        starColor: 'rgba(255,255,255,0.8)',
        buttonColor: '#ffb7c5',
        textColor: '#ff6b9d',
        fireworkColors: ['#ffb7c5', '#ff9eb5', '#ff85a6', '#ff6b9d'],
        specialEffect: 'petals'
    }
};

// 选择主题的函数
function selectTheme() {
    const themeKeys = Object.keys(THEMES);
    const today = new Date();

    // 检查是否有保存的主题偏好
    const savedTheme = localStorage.getItem('loveTheme');
    const savedDate = localStorage.getItem('loveThemeDate');
    const todayStr = today.toDateString();

    // 如果是同一天，使用保存的主题
    if (savedDate === todayStr && savedTheme && THEMES[savedTheme]) {
        return savedTheme;
    }

    // 否则随机选择一个新主题
    const randomIndex = Math.floor(Math.random() * themeKeys.length);
    const selectedTheme = themeKeys[randomIndex];

    // 保存主题选择
    localStorage.setItem('loveTheme', selectedTheme);
    localStorage.setItem('loveThemeDate', todayStr);

    // 增加访问计数
    const visitCount = parseInt(localStorage.getItem('loveVisitCount') || '0') + 1;
    localStorage.setItem('loveVisitCount', visitCount.toString());

    return selectedTheme;
}

// 应用主题
function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    console.log('应用主题:', theme.name);

    // 应用背景
    const canvas = document.getElementById('cas');
    if (canvas) {
        if (theme.background.startsWith('linear-gradient')) {
            canvas.style.background = theme.background;
        } else {
            canvas.style.backgroundColor = theme.background;
        }
    }

    // 应用按钮颜色
    const style = document.createElement('style');
    style.textContent = `
        .btn-a, .btn-a:before, .btn-a:after {
            background: ${theme.buttonColor} !important;
        }
        .text {
            color: ${theme.textColor} !important;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .confirm {
            background: ${theme.buttonColor} !important;
        }
    `;
    document.head.appendChild(style);

    // 将主题信息保存到全局变量，供其他脚本使用
    window.currentTheme = theme;

    // 添加主题特效
    if (theme.specialEffect !== 'none') {
        initSpecialEffect(theme.specialEffect);
    }
}

// 初始化特殊效果
function initSpecialEffect(effect) {
    switch(effect) {
        case 'hearts':
            createFloatingHearts();
            break;
        case 'shooting-stars':
            createShootingStars();
            break;
        case 'aurora':
            createAurora();
            break;
        case 'petals':
            createFallingPetals();
            break;
    }
}

// 漂浮的心形效果
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.zIndex = '50';
            heart.style.opacity = '0.6';
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'all 5s linear';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.bottom = '110%';
                heart.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                document.body.removeChild(heart);
            }, 5100);
        }
    }, 1000);
}

// 流星效果
function createShootingStars() {
    setInterval(() => {
        if (Math.random() > 0.8) {
            const star = document.createElement('div');
            star.style.position = 'fixed';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.background = 'white';
            star.style.boxShadow = '0 0 10px 2px rgba(255,255,255,0.8)';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 50 + '%';
            star.style.zIndex = '50';
            star.style.pointerEvents = 'none';
            document.body.appendChild(star);

            const duration = Math.random() * 1000 + 500;
            const angle = Math.random() * 45 - 22.5;

            star.animate([
                { transform: 'translate(0, 0) rotate(' + angle + 'deg)', opacity: 1 },
                { transform: 'translate(200px, 200px) rotate(' + angle + 'deg)', opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            });

            setTimeout(() => {
                if (star.parentNode) {
                    document.body.removeChild(star);
                }
            }, duration);
        }
    }, 2000);
}

// 极光效果
function createAurora() {
    const aurora = document.createElement('div');
    aurora.style.position = 'fixed';
    aurora.style.top = '0';
    aurora.style.left = '0';
    aurora.style.width = '100%';
    aurora.style.height = '40%';
    aurora.style.background = 'linear-gradient(to bottom, rgba(0,255,200,0.1), transparent)';
    aurora.style.zIndex = '1';
    aurora.style.pointerEvents = 'none';
    aurora.style.opacity = '0';
    document.body.appendChild(aurora);

    setInterval(() => {
        aurora.animate([
            { opacity: 0 },
            { opacity: 0.3 },
            { opacity: 0 }
        ], {
            duration: 5000,
            easing: 'ease-in-out'
        });
    }, 8000);
}

// 飘落的花瓣
function createFallingPetals() {
    setInterval(() => {
        if (Math.random() > 0.6) {
            const petal = document.createElement('div');
            petal.innerHTML = '🌸';
            petal.style.position = 'fixed';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = '-50px';
            petal.style.fontSize = (Math.random() * 15 + 10) + 'px';
            petal.style.zIndex = '50';
            petal.style.opacity = '0.7';
            petal.style.pointerEvents = 'none';
            document.body.appendChild(petal);

            const duration = Math.random() * 5000 + 5000;
            const sway = Math.random() * 100 - 50;

            petal.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0.7 },
                { transform: 'translateY(50vh) translateX(' + sway + 'px) rotate(180deg)', opacity: 0.5 },
                { transform: 'translateY(110vh) translateX(0) rotate(360deg)', opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            });

            setTimeout(() => {
                if (petal.parentNode) {
                    document.body.removeChild(petal);
                }
            }, duration);
        }
    }, 500);
}

// 页面加载时初始化主题
document.addEventListener('DOMContentLoaded', function() {
    const selectedTheme = selectTheme();
    applyTheme(selectedTheme);

    // 在控制台显示访问次数和当前主题
    const visitCount = localStorage.getItem('loveVisitCount') || '1';
    console.log(`这是第 ${visitCount} 次打开这个页面 ❤️`);
    console.log(`当前主题: ${THEMES[selectedTheme].name}`);

    // 首次访问提示
    const hasSeenWelcome = localStorage.getItem('loveSeenWelcome');
    if (!hasSeenWelcome) {
        setTimeout(function() {
            showWelcomeToast();
            localStorage.setItem('loveSeenWelcome', 'true');
        }, 2000);
    }
});

// 欢迎提示
function showWelcomeToast() {
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🎨</span>
            <div>
                <div style="font-weight: bold; margin-bottom: 5px;">欢迎！</div>
                <div style="font-size: 12px; opacity: 0.9;">点击右下角按钮或按 T 键可切换主题</div>
            </div>
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
        pointer-events: none;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    setTimeout(function() {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    }, 5000);
}
