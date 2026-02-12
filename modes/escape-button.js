// 逃跑按钮式表白模式
function initEscapeButtonMode() {
    console.log('初始化逃跑按钮模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="escape-mode-container">
            <div class="escape-content">
                <div class="escape-text-wrapper">
                    <img src="a8.png" alt="" style="width: 80px; height: 80px;">
                    <div class="escape-text">
                        宝宝，你愿意嫁给我吗？💍
                    </div>
                </div>
                <div class="escape-btn-group">
                    <button id="yesBtn" class="escape-yes-btn">愿意！💕</button>
                    <button id="noBtn" class="escape-no-btn">不愿意</button>
                </div>
                <div class="escape-hint">试试点击"不愿意"按钮... 😏</div>
            </div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .escape-mode-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
        }
        .escape-content {
            text-align: center;
            padding: 20px;
        }
        .escape-text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-bottom: 40px;
        }
        .escape-text {
            font-size: 24px;
            color: white;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .escape-btn-group {
            display: flex;
            gap: 30px;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            min-height: 120px;
            position: relative;
        }
        .escape-yes-btn, .escape-no-btn {
            padding: 15px 40px;
            font-size: 18px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .escape-yes-btn {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            animation: heartbeat 1.5s ease-in-out infinite;
        }
        .escape-yes-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
        }
        .escape-no-btn {
            background: linear-gradient(135deg, #a8a8a8 0%, #6c6c6c 100%);
            color: white;
            position: fixed;
            transition: all 0.3s ease-out;
        }
        .escape-hint {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
            margin-top: 20px;
        }
        @keyframes heartbeat {
            0%, 100% {
                transform: scale(1);
            }
            25% {
                transform: scale(1.05);
            }
            50% {
                transform: scale(1);
            }
            75% {
                transform: scale(1.05);
            }
        }
        @media (max-width: 768px) {
            .escape-text {
                font-size: 18px;
            }
            .escape-yes-btn, .escape-no-btn {
                padding: 12px 30px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);

    let escapeCount = 0;
    const funnyTexts = [
        '不愿意',
        '别点我！',
        '真的不要点！',
        '我要跑啦！',
        '追不到我吧～',
        '哈哈哈哈',
        '好吧好吧...',
        '我投降了！'
    ];

    // "愿意"按钮：直接成功
    $('#yesBtn').click(function() {
        // 隐藏原界面，避免与弹窗冲突
        $('.escape-mode-container').fadeOut(300);
        modal('我就知道宝宝会答应！💕', function() {
            fireworks();
        });
    });

    // "不愿意"按钮：逃跑逻辑
    const noBtn = document.getElementById('noBtn');

    function moveButton() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // 计算安全范围（避免按钮跑出屏幕或被底部城市建筑遮挡）
        const maxX = windowWidth - btnWidth - 20;
        const maxY = windowHeight - btnHeight - 150; // 留出150px避免被城市建筑遮挡

        // 随机新位置，确保不会跑到底部
        const minY = 50; // 避免跑到顶部
        const newX = Math.random() * maxX;
        const newY = minY + Math.random() * (maxY - minY);

        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';

        // 改变文字增加趣味
        noBtn.textContent = funnyTexts[Math.min(escapeCount, funnyTexts.length - 1)];
        escapeCount++;

        // 逃跑8次后自动变成"愿意"（减少次数）
        if (escapeCount >= 8) {
            noBtn.textContent = '好吧，愿意💕';
            noBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            noBtn.onclick = function() {
                // 隐藏原界面，避免与弹窗冲突
                $('.escape-mode-container').fadeOut(300);
                modal('哈哈！终于抓住你了！💕', function() {
                    fireworks();
                });
            };
            // 移除逃跑事件
            noBtn.onmouseenter = null;
            noBtn.ontouchstart = null;
        }
    }

    // 鼠标悬停时逃跑（桌面端）
    noBtn.onmouseenter = moveButton;

    // 触摸开始时逃跑（移动端）
    noBtn.ontouchstart = function(e) {
        e.preventDefault();
        moveButton();
    };

    // 初始位置居中右侧
    const initialX = window.innerWidth / 2 + 80;
    const initialY = window.innerHeight / 2 - noBtn.offsetHeight / 2;
    noBtn.style.left = initialX + 'px';
    noBtn.style.top = initialY + 'px';
}
