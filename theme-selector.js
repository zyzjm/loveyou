// 主题切换器 - 按下键盘 'T' 键可以打开主题选择面板

(function() {
    let themePanel = null;
    let isPanelOpen = false;

    // 创建主题选择面板
    function createThemePanel() {
        if (themePanel) return;

        themePanel = document.createElement('div');
        themePanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: none;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
        `;

        const title = document.createElement('h2');
        title.textContent = '🎨 主题选择器';
        title.style.cssText = `
            margin: 0 0 20px 0;
            color: #333;
            text-align: center;
            font-size: 24px;
        `;
        themePanel.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.textContent = '选择一个主题立即预览（刷新页面生效）';
        subtitle.style.cssText = `
            margin: 0 0 20px 0;
            color: #666;
            text-align: center;
            font-size: 14px;
        `;
        themePanel.appendChild(subtitle);

        // 创建主题卡片
        const themesContainer = document.createElement('div');
        themesContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        `;

        Object.keys(THEMES).forEach(themeKey => {
            const theme = THEMES[themeKey];
            const card = document.createElement('div');
            card.style.cssText = `
                padding: 20px;
                border-radius: 10px;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
                border: 3px solid transparent;
                background: ${theme.background.startsWith('linear') ? theme.background : 'linear-gradient(135deg, ' + theme.background + ' 0%, ' + theme.buttonColor + ' 100%)'};
            `;

            // 当前选中的主题
            const currentTheme = localStorage.getItem('loveTheme');
            if (currentTheme === themeKey) {
                card.style.borderColor = '#FFD700';
                card.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            }

            const themeName = document.createElement('div');
            themeName.textContent = theme.name;
            themeName.style.cssText = `
                font-size: 18px;
                font-weight: bold;
                color: white;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                margin-bottom: 10px;
                text-align: center;
            `;

            const themeEffect = document.createElement('div');
            const effectMap = {
                'none': '经典效果',
                'hearts': '❤️ 飘心',
                'shooting-stars': '🌠 流星',
                'aurora': '🌌 极光',
                'petals': '🌸 花瓣'
            };
            themeEffect.textContent = effectMap[theme.specialEffect] || '特殊效果';
            themeEffect.style.cssText = `
                font-size: 14px;
                color: rgba(255,255,255,0.9);
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                text-align: center;
            `;

            card.appendChild(themeName);
            card.appendChild(themeEffect);

            card.addEventListener('mouseenter', function() {
                if (currentTheme !== themeKey) {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (currentTheme !== themeKey) {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                }
            });

            card.addEventListener('click', function() {
                localStorage.setItem('loveTheme', themeKey);
                localStorage.setItem('loveThemeDate', new Date().toDateString());
                location.reload();
            });

            themesContainer.appendChild(card);
        });

        themePanel.appendChild(themesContainer);

        // 关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '关闭';
        closeBtn.style.cssText = `
            display: block;
            width: 100%;
            padding: 12px;
            background: #ff6b9d;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        `;
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = '#ff4d7f';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = '#ff6b9d';
        });
        closeBtn.addEventListener('click', closeThemePanel);

        themePanel.appendChild(closeBtn);

        // 提示信息
        const hint = document.createElement('div');
        hint.textContent = '按 T 键可以随时打开/关闭主题选择器';
        hint.style.cssText = `
            margin-top: 15px;
            text-align: center;
            color: #999;
            font-size: 12px;
        `;
        themePanel.appendChild(hint);

        document.body.appendChild(themePanel);
    }

    // 打开面板
    function openThemePanel() {
        if (!themePanel) {
            createThemePanel();
        }
        themePanel.style.display = 'block';
        isPanelOpen = true;
    }

    // 关闭面板
    function closeThemePanel() {
        if (themePanel) {
            themePanel.style.display = 'none';
        }
        isPanelOpen = false;
    }

    // 切换面板
    function toggleThemePanel() {
        if (isPanelOpen) {
            closeThemePanel();
        } else {
            openThemePanel();
        }
    }

    // 监听键盘事件
    document.addEventListener('keydown', function(e) {
        // 按 T 键打开主题选择器
        if (e.key === 't' || e.key === 'T') {
            // 确保不在输入框中
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                toggleThemePanel();
            }
        }
        // 按 ESC 键关闭
        if (e.key === 'Escape') {
            closeThemePanel();
        }
    });

    // 导出函数供外部调用
    window.openThemeSelector = openThemePanel;
})();
