// 表白模式管理器

// 获取今天的日期字符串 (YYYY-MM-DD)
function getTodayDateString() {
    const today = new Date();
    return today.getFullYear() + '-' +
           String(today.getMonth() + 1).padStart(2, '0') + '-' +
           String(today.getDate()).padStart(2, '0');
}

// 选择今日模式（如果今天已选择过，则返回缓存的模式）
function selectTodayMode() {
    const todayDate = getTodayDateString();
    const savedDate = localStorage.getItem('proposalModeDate');
    const savedMode = localStorage.getItem('proposalMode');

    // 检查URL参数，如果有 ?random=true 则强制重新随机
    const urlParams = new URLSearchParams(window.location.search);
    const forceRandom = urlParams.get('random') === 'true';

    // 检查是否是2月14日（情人节）
    const today = new Date();
    const isValentineDay = (today.getMonth() + 1) === 2 && today.getDate() === 14;

    // 如果是2月14日且没有 random=true 参数，固定使用时间线模式
    if (isValentineDay && !forceRandom) {
        console.log('今天是2月14日，使用固定的时间线模式 💕');
        const fixedMode = 'timeline';
        // 保存到 localStorage
        localStorage.setItem('proposalMode', fixedMode);
        localStorage.setItem('proposalModeDate', todayDate);
        return fixedMode;
    }

    // 如果是同一天且有保存的模式，并且不是强制随机，使用保存的模式
    if (savedDate === todayDate && savedMode && getModeInfo(savedMode) && !forceRandom) {
        console.log('使用缓存的今日模式:', savedMode);
        return savedMode;
    }

    // 否则随机选择一个新模式
    const modeIds = getAllModeIds();
    const randomIndex = Math.floor(Math.random() * modeIds.length);
    const selectedMode = modeIds[randomIndex];

    // 保存到 localStorage
    localStorage.setItem('proposalMode', selectedMode);
    localStorage.setItem('proposalModeDate', todayDate);

    console.log('随机选择新模式:', selectedMode);
    return selectedMode;
}

// 动态加载脚本
function loadModeScript(scriptPath) {
    return new Promise((resolve, reject) => {
        if (!scriptPath) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = () => {
            console.log('模式脚本加载成功:', scriptPath);
            resolve();
        };
        script.onerror = () => {
            console.error('模式脚本加载失败:', scriptPath);
            reject(new Error('Failed to load script: ' + scriptPath));
        };
        document.body.appendChild(script);
    });
}

// 显示模式提示 toast
function showModeToast(modeInfo) {
    const toast = document.createElement('div');
    toast.className = 'mode-toast';
    toast.innerHTML = `
        <span class="mode-icon">${modeInfo.icon}</span>
        <span class="mode-name">${modeInfo.name}</span>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .mode-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 24px;
            border-radius: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideDown 0.5s ease-out, fadeOut 0.5s ease-in 2.5s;
            pointer-events: none;
        }
        .mode-icon {
            font-size: 20px;
        }
        .mode-name {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
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

    // 3秒后移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 初始化表白模式系统
async function initProposalMode() {
    try {
        // 选择今日模式
        const modeId = selectTodayMode();
        const modeInfo = getModeInfo(modeId);

        if (!modeInfo) {
            console.error('无效的模式ID:', modeId);
            return;
        }

        console.log('正在初始化模式:', modeInfo.name);

        // 注释掉模式提示，保持惊喜感
        // showModeToast(modeInfo);

        // 如果需要加载脚本，先加载
        if (modeInfo.script) {
            await loadModeScript(modeInfo.script);
        }

        // 初始化模式
        if (typeof modeInfo.init === 'function') {
            modeInfo.init();
        } else {
            console.error('模式初始化函数不存在:', modeId);
        }
    } catch (error) {
        console.error('初始化模式失败:', error);
        // 失败时回退到经典模式
        if (typeof initClassicMode === 'function') {
            initClassicMode();
        }
    }
}

// 手动切换模式（可选功能，用于测试）
function switchToMode(modeId) {
    const modeInfo = getModeInfo(modeId);
    if (!modeInfo) {
        console.error('无效的模式ID:', modeId);
        return;
    }

    // 保存到 localStorage
    localStorage.setItem('proposalMode', modeId);
    localStorage.setItem('proposalModeDate', getTodayDateString());

    // 重新加载页面
    window.location.reload();
}

// 页面加载完成后自动初始化
$(document).ready(function() {
    initProposalMode();
});
