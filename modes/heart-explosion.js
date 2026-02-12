// 心形爆炸式表白模式
function initHeartExplosionMode() {
    console.log('初始化心形爆炸模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="heart-explosion-container">
            <div class="heart-explosion-content">
                <div class="big-heart" id="bigHeart">❤️</div>
                <div class="heart-hint">点击心形，见证爱的绽放</div>
            </div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .heart-explosion-container {
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
        .heart-explosion-content {
            text-align: center;
        }
        .big-heart {
            font-size: 150px;
            cursor: pointer;
            animation: pulse 1.5s ease-in-out infinite;
            transition: transform 0.3s;
            user-select: none;
        }
        .big-heart:hover {
            transform: scale(1.1);
        }
        .big-heart:active {
            transform: scale(0.95);
        }
        .heart-hint {
            margin-top: 30px;
            font-size: 18px;
            color: white;
            font-weight: 500;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: fadeInOut 2s ease-in-out infinite;
        }
        .heart-particle {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            font-size: 20px;
            animation: heartFloat 2s ease-out forwards;
        }
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        @keyframes fadeInOut {
            0%, 100% {
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
        }
        @keyframes heartFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--tx), var(--ty)) rotate(var(--rotate)) scale(0);
            }
        }
        .proposal-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
            z-index: 10000;
            animation: scaleIn 0.5s ease-out;
        }
        .proposal-message h2 {
            font-size: 28px;
            color: #f5576c;
            margin-bottom: 20px;
        }
        .proposal-message p {
            font-size: 16px;
            color: #333;
            line-height: 1.8;
            margin-bottom: 30px;
        }
        .proposal-message button {
            padding: 15px 40px;
            font-size: 18px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
            transition: all 0.3s;
        }
        .proposal-message button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(245, 87, 108, 0.6);
        }
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
        @media (max-width: 768px) {
            .big-heart {
                font-size: 100px;
            }
            .heart-hint {
                font-size: 16px;
            }
            .proposal-message {
                padding: 30px 20px;
                width: 90%;
                max-width: 400px;
            }
            .proposal-message h2 {
                font-size: 24px;
            }
            .proposal-message p {
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);

    let exploded = false;

    // 点击大心形触发爆炸
    $('#bigHeart').click(function(e) {
        if (exploded) return;
        exploded = true;

        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 隐藏大心形
        $(this).fadeOut(300);
        $('.heart-hint').fadeOut(300);

        // 创建100个心形粒子
        const particleCount = 100;
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                createHeartParticle(
                    centerX,
                    centerY,
                    heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
                );
            }, i * 10); // 略微错开时间，看起来更自然
        }

        // 1.5秒后显示表白消息
        setTimeout(showProposalMessage, 1500);
    });

    function createHeartParticle(x, y, emoji) {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.textContent = emoji;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // 随机方向和距离
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotate = Math.random() * 720 - 360;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.setProperty('--rotate', rotate + 'deg');

        document.body.appendChild(particle);

        // 动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    function showProposalMessage() {
        const messageHtml = `
            <div class="proposal-message">
                <h2>💍 宝宝，嫁给我好吗？</h2>
                <p>
                    就像这些心形一样，我的爱会在你的世界里绽放。<br>
                    我想用一生的时间，给你全部的爱和温柔。<br>
                    让我们一起创造属于我们的浪漫吧！
                </p>
                <button id="heartExplosionYesBtn">我愿意！💕</button>
            </div>
        `;

        $('body').append(messageHtml);

        $('#heartExplosionYesBtn').click(function() {
            $('.proposal-message').fadeOut(300, function() {
                // 隐藏原界面，避免与弹窗冲突
                $('.heart-explosion-container').fadeOut(300);
                modal('谢谢你，我最爱的宝宝！💕', function() {
                    fireworks();
                });
            });
        });
    }
}
