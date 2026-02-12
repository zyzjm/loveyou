// 表白模式注册表
const PROPOSAL_MODES = {
    classic: {
        name: '经典对话式',
        description: '温馨问答，逐步深入的对话',
        icon: '💬',
        script: null, // 不需要额外脚本，使用 talk.js
        init: function() {
            if (typeof initClassicMode === 'function') {
                initClassicMode();
            }
        }
    },
    escapeButton: {
        name: '逃跑按钮式',
        description: '"不愿意"按钮会躲避鼠标，几乎无法拒绝',
        icon: '🏃',
        script: 'modes/escape-button.js',
        init: function() {
            if (typeof initEscapeButtonMode === 'function') {
                initEscapeButtonMode();
            }
        }
    },
    heartExplosion: {
        name: '心形爆炸式',
        description: '点击屏幕中央大心形，爆炸成无数小心形粒子',
        icon: '💖',
        script: 'modes/heart-explosion.js',
        init: function() {
            if (typeof initHeartExplosionMode === 'function') {
                initHeartExplosionMode();
            }
        }
    },
    typewriter: {
        name: '打字机效果式',
        description: '文字逐字显示，像亲笔写信',
        icon: '✍️',
        script: 'modes/typewriter.js',
        init: function() {
            if (typeof initTypewriterMode === 'function') {
                initTypewriterMode();
            }
        }
    },
    timeline: {
        name: '时间线式',
        description: '滚动展示恋爱历程',
        icon: '📅',
        script: 'modes/timeline.js',
        init: function() {
            if (typeof initTimelineMode === 'function') {
                initTimelineMode();
            }
        }
    }
};

// 获取所有模式ID
function getAllModeIds() {
    return Object.keys(PROPOSAL_MODES);
}

// 获取模式信息
function getModeInfo(modeId) {
    return PROPOSAL_MODES[modeId] || null;
}
