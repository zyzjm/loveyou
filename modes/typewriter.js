// 打字机效果式表白模式
function initTypewriterMode() {
    console.log('初始化打字机模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="typewriter-mode-container">
            <div class="letter-paper">
                <div class="letter-header">
                    <div class="letter-to">致我最爱的宝宝</div>
                    <div class="letter-date">${new Date().toLocaleDateString('zh-CN')}</div>
                </div>
                <div class="letter-content"></div>
                <div class="letter-signature" style="display: none;">
                    <div class="signature-text">永远爱你的</div>
                    <div class="signature-name">你的宝贝 ❤️</div>
                </div>
            </div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .typewriter-mode-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
            overflow-y: auto;
            padding: 20px;
            padding-bottom: 180px;
        }
        .letter-paper {
            background: rgba(255, 255, 255, 0.95);
            max-width: 600px;
            width: 100%;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .letter-paper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
        }
        .letter-header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        .letter-to {
            font-size: 20px;
            color: #333;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .letter-date {
            font-size: 14px;
            color: #999;
            font-style: italic;
        }
        .letter-content {
            font-size: 16px;
            line-height: 2;
            color: #333;
            font-family: 'KaiTi', 'STKaiti', 'BiauKai', serif;
            min-height: 300px;
            position: relative;
        }
        .letter-content::after {
            content: '|';
            animation: blink 1s infinite;
            margin-left: 2px;
        }
        .letter-content.typing-complete::after {
            display: none;
        }
        .letter-signature {
            margin-top: 30px;
            text-align: right;
            font-family: 'KaiTi', 'STKaiti', 'BiauKai', serif;
        }
        .signature-text {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .signature-name {
            font-size: 18px;
            color: #f5576c;
            font-weight: bold;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        @media (max-width: 768px) {
            .letter-paper {
                padding: 25px;
            }
            .letter-to {
                font-size: 18px;
            }
            .letter-content {
                font-size: 14px;
                line-height: 1.8;
            }
        }
    `;
    document.head.appendChild(style);

    // 情书内容（可自定义）
    const letterParagraphs = [
        '亲爱的宝宝：',
        '',
        '从遇见你的那一刻起，我的世界就变得不一样了。你的笑容如同春日的暖阳，照亮了我生命中的每一个角落。',
        '',
        '我想把所有的温柔都给你，想在每一个清晨看到你的笑脸，在每一个夜晚给你最温暖的拥抱。',
        '',
        '我想和你一起看日出日落，想陪你走过春夏秋冬。我想给你做饭，想听你讲每一件小事，想成为你最坚强的依靠。',
        '',
        '宝宝，我爱你，想一辈子照顾你、宠你、爱你。',
        '',
        '所以，请让我问你一句：',
        '',
        '你愿意嫁给我吗？💍'
    ];

    let currentParagraph = 0;
    let currentChar = 0;
    const contentEl = document.querySelector('.letter-content');

    function typeNextChar() {
        if (currentParagraph >= letterParagraphs.length) {
            // 打字完成
            contentEl.classList.add('typing-complete');
            setTimeout(showSignatureAndButton, 500);
            return;
        }

        const paragraph = letterParagraphs[currentParagraph];

        if (currentChar < paragraph.length) {
            // 逐字添加当前段落
            const currentText = contentEl.textContent.replace('|', '');
            contentEl.textContent = currentText + paragraph[currentChar];
            currentChar++;

            // 随机速度，模拟真实打字
            const delay = paragraph[currentChar - 1] === '，' || paragraph[currentChar - 1] === '。' || paragraph[currentChar - 1] === '？' || paragraph[currentChar - 1] === '！' ? 300 : 80 + Math.random() * 40;
            setTimeout(typeNextChar, delay);
        } else {
            // 当前段落完成，换行并继续下一段
            const currentText = contentEl.textContent.replace('|', '');
            contentEl.textContent = currentText + '\n';
            currentParagraph++;
            currentChar = 0;
            setTimeout(typeNextChar, 500);
        }
    }

    function showSignatureAndButton() {
        // 显示签名
        $('.letter-signature').fadeIn(1000);

        // 1秒后添加按钮
        setTimeout(() => {
            const buttonHtml = `
                <div style="text-align: center; margin-top: 30px;">
                    <button id="typewriterYesBtn" style="
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
                    ">我愿意！💕</button>
                </div>
            `;
            $('.letter-paper').append(buttonHtml);

            $('#typewriterYesBtn').hover(
                function() {
                    $(this).css({
                        'transform': 'scale(1.1)',
                        'box-shadow': '0 6px 20px rgba(245, 87, 108, 0.6)'
                    });
                },
                function() {
                    $(this).css({
                        'transform': 'scale(1)',
                        'box-shadow': '0 4px 15px rgba(245, 87, 108, 0.4)'
                    });
                }
            );

            $('#typewriterYesBtn').click(function() {
                // 隐藏原界面，避免与弹窗冲突
                $('.typewriter-mode-container').fadeOut(300);
                modal('爱你！💕', function() {
                    fireworks();
                });
            });
        }, 1000);
    }

    // 开始打字
    setTimeout(typeNextChar, 500);
}
