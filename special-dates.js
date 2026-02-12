// 特殊日期主题配置
const SPECIAL_DATES = {
    valentine: {
        dates: ['02-14'], // 2月14日情人节
        theme: 'romantic',
        message: '💝 情人节快乐！'
    },
    qixi: {
        dates: ['08-04', '08-22'], // 七夕（农历，近似阳历日期）
        theme: 'sakura',
        message: '💕 七夕快乐！'
    },
    christmas: {
        dates: ['12-24', '12-25'], // 圣诞节
        theme: 'starry',
        message: '🎄 圣诞快乐！'
    },
    newYear: {
        dates: ['01-01'], // 元旦
        theme: 'dreamy',
        message: '🎆 新年快乐！'
    }
};

// 检查今天是否是特殊日期
function checkSpecialDate() {
    const today = new Date();
    const monthDay = String(today.getMonth() + 1).padStart(2, '0') + '-' +
                     String(today.getDate()).padStart(2, '0');

    for (let event in SPECIAL_DATES) {
        const specialEvent = SPECIAL_DATES[event];
        if (specialEvent.dates.includes(monthDay)) {
            return specialEvent;
        }
    }
    return null;
}

// 显示特殊日期消息
function showSpecialDateMessage(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="text-align: center; font-size: 20px; font-weight: bold;">
            ${message}
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 10002;
        animation: scaleIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards;
        pointer-events: none;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    setTimeout(function() {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// 初始化特殊日期检查
document.addEventListener('DOMContentLoaded', function() {
    const specialDate = checkSpecialDate();
    if (specialDate) {
        // 强制使用特殊日期主题
        localStorage.setItem('loveTheme', specialDate.theme);
        localStorage.setItem('loveThemeDate', new Date().toDateString());

        // 延迟显示消息，确保页面已加载
        setTimeout(function() {
            showSpecialDateMessage(specialDate.message);
        }, 1500);
    }
});

// 按键彩蛋：连续按 LOVE 可以触发特殊效果
(function() {
    let keySequence = '';
    let sequenceTimeout = null;

    document.addEventListener('keypress', function(e) {
        clearTimeout(sequenceTimeout);

        keySequence += e.key.toLowerCase();

        if (keySequence.includes('love')) {
            triggerLoveEasterEgg();
            keySequence = '';
        }

        if (keySequence.length > 10) {
            keySequence = keySequence.slice(-10);
        }

        sequenceTimeout = setTimeout(function() {
            keySequence = '';
        }, 2000);
    });

    function triggerLoveEasterEgg() {
        // 创建满屏的心形雨
        for (let i = 0; i < 50; i++) {
            setTimeout(function() {
                createHeart();
            }, i * 100);
        }

        // 显示消息
        const message = document.createElement('div');
        message.textContent = '💕 LOVE YOU 💕';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: #ff6b9d;
            text-shadow: 0 0 20px rgba(255, 107, 157, 0.8);
            z-index: 10003;
            animation: heartbeat 1s infinite, fadeOut 0.5s ease-in 4.5s forwards;
            pointer-events: none;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartbeat {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);

        setTimeout(function() {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 5000);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.zIndex = '10003';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);

        const duration = Math.random() * 3000 + 2000;
        const rotation = Math.random() * 360;

        heart.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg)`,
                opacity: 0.5
            }
        ], {
            duration: duration,
            easing: 'linear'
        });

        setTimeout(function() {
            if (heart.parentNode) {
                document.body.removeChild(heart);
            }
        }, duration);
    }
})();

// 导出函数供外部使用
window.checkSpecialDate = checkSpecialDate;
