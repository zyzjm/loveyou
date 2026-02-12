// 自定义配置示例
// 复制此文件为 config.js 并在 index.html 中引入即可使用自定义配置

// 自定义主题（可添加到 themes.js 中的 THEMES 对象）
const customTheme = {
    myTheme: {
        name: '我的专属主题',
        background: 'linear-gradient(to bottom, #yourColor1 0%, #yourColor2 100%)',
        cityColor: 'custom',
        moonColor: 'rgba(255,255,255,0.8)',
        starColor: 'rgba(255,255,255,0.9)',
        buttonColor: '#yourButtonColor',
        textColor: '#ffffff',
        fireworkColors: ['#color1', '#color2', '#color3', '#color4'],
        specialEffect: 'hearts' // 可选: none, hearts, shooting-stars, aurora, petals
    }
};

// 自定义对话内容（可替换 talk.js 中的对话）
const customDialogues = [
    '第一句对话',
    '第二句对话',
    '第三句对话',
    // ... 添加更多对话
];

// 自定义特殊日期
const customSpecialDates = {
    ourAnniversary: {
        dates: ['03-15'], // 你们的纪念日
        theme: 'romantic',
        message: '💕 纪念日快乐！'
    },
    herBirthday: {
        dates: ['06-20'], // TA的生日
        theme: 'sakura',
        message: '🎂 生日快乐，宝贝！'
    }
    // 添加更多特殊日期...
};

// 渐变色生成工具
// 使用方法：在浏览器控制台输入 generateGradient()
function generateGradient(color1 = '#667eea', color2 = '#764ba2', direction = 'to bottom') {
    return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
}

// 颜色建议
const colorSuggestions = {
    romantic: {
        gradient: generateGradient('#ff9a9e', '#fad0c4'),
        button: '#ff6b9d',
        fireworks: ['#ff6b9d', '#ff8fab', '#ffb3c1', '#ffc2d1']
    },
    dreamy: {
        gradient: generateGradient('#4A00E0', '#8E2DE2'),
        button: '#DA22FF',
        fireworks: ['#DA22FF', '#8E2DE2', '#B24BF3', '#C77DFF']
    },
    fresh: {
        gradient: generateGradient('#43e97b', '#38f9d7'),
        button: '#00D2FF',
        fireworks: ['#43e97b', '#38f9d7', '#00D2FF', '#4facfe']
    },
    warm: {
        gradient: generateGradient('#fa709a', '#fee140'),
        button: '#fa709a',
        fireworks: ['#fa709a', '#fee140', '#ff9068', '#fd746c']
    },
    cool: {
        gradient: generateGradient('#4facfe', '#00f2fe'),
        button: '#0093E9',
        fireworks: ['#4facfe', '#00f2fe', '#0093E9', '#80D0C7']
    }
};

// 在线渐变工具推荐
// 1. https://uigradients.com/
// 2. https://cssgradient.io/
// 3. https://www.grabient.com/

// 使用示例：
// 1. 打开 themes.js
// 2. 在 THEMES 对象中添加你的自定义主题
// 3. 保存并刷新页面
// 4. 使用主题选择器选择你的主题

console.log('配置示例已加载！');
console.log('颜色建议:', colorSuggestions);
