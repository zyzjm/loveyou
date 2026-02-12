// 时间线式表白模式
function initTimelineMode() {
    console.log('初始化时间线模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="timeline-mode-container">
            <div class="timeline-header">
                <h1>我们的故事 📖</h1>
                <p>滚动查看我们的美好回忆</p>
            </div>
            <div class="timeline-content" id="timelineContent"></div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .timeline-mode-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow-y: auto;
            z-index: 200;
            padding: 40px 20px;
            padding-bottom: 180px;
            background: rgba(0, 0, 0, 0.3);
        }
        .timeline-header {
            text-align: center;
            margin-bottom: 60px;
            color: white;
        }
        .timeline-header h1 {
            font-size: 36px;
            margin-bottom: 10px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .timeline-header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .timeline-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            padding: 20px 0;
        }
        .timeline-content::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg,
                transparent 0%,
                rgba(255, 255, 255, 0.5) 10%,
                rgba(255, 255, 255, 0.5) 90%,
                transparent 100%);
            transform: translateX(-50%);
        }
        .timeline-item {
            position: relative;
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item.left .timeline-card {
            margin-right: 50%;
            padding-right: 40px;
        }
        .timeline-item.right .timeline-card {
            margin-left: 50%;
            padding-left: 40px;
        }
        .timeline-dot {
            position: absolute;
            left: 50%;
            top: 20px;
            width: 20px;
            height: 20px;
            background: white;
            border: 4px solid #f5576c;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 2;
            box-shadow: 0 0 20px rgba(245, 87, 108, 0.5);
        }
        .timeline-card {
            background: rgba(255, 255, 255, 0.95);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            position: relative;
        }
        .timeline-date {
            font-size: 14px;
            color: #f5576c;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .timeline-title {
            font-size: 20px;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .timeline-description {
            font-size: 15px;
            color: #666;
            line-height: 1.6;
        }
        .timeline-emoji {
            font-size: 24px;
        }
        .proposal-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            text-align: center;
            padding: 40px 30px;
        }
        .proposal-card .timeline-title {
            color: white;
            font-size: 28px;
            justify-content: center;
            margin-bottom: 20px;
        }
        .proposal-card .timeline-description {
            color: white;
            font-size: 18px;
            margin-bottom: 30px;
        }
        .proposal-card button {
            padding: 15px 40px;
            font-size: 18px;
            background: white;
            color: #f5576c;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
        }
        .proposal-card button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
            .timeline-header h1 {
                font-size: 28px;
            }
            .timeline-content::before {
                left: 20px;
            }
            .timeline-item.left .timeline-card,
            .timeline-item.right .timeline-card {
                margin-left: 50px;
                margin-right: 0;
                padding-left: 20px;
                padding-right: 20px;
            }
            .timeline-dot {
                left: 20px;
            }
            .timeline-title {
                font-size: 18px;
            }
            .timeline-description {
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);

    // 时间线事件（可自定义）
    const timelineEvents = [
        {
            date: '2025年1月7日',
            title: '第一次出去',
            description: '我们一起看了电影，吃了你给的糖葫芦。那晚的月亮很美，但你更美。',
            emoji: '🎬',
            side: 'right'
        },
        {
            date: '2025年1月13日',
            title: '第一次约会',
            description: '我们一起吃了火锅、看了电影。那晚听你说了一路，天气虽然很冷，但和你在一起就没那么冷了。',
            emoji: '🍡&🎬',
            side: 'left'
        },
        {
            date: '2025年1月17日',
            title: '第一次拥抱',
            description: '那是一次你考试过后，我们吃了火锅鸡，走在路上，我第一次抱你，那时候我的心跳的很快。',
            emoji: '💗',
            side: 'right'
        },
        {
            date: '2025年1月20日',
            title: '第一次牵手',
            description: '在去千岛湖玩时，我牵起了你的手，那好像是我第一次那么紧的抓住你的手。',
            emoji: '🤝',
            side: 'left'
        },
        {
            date: '2025年1月23日',
            title: '确定关系',
            description: '吃过火锅后，我在地下停车场向你表白了。你说愿意，那是我人生中最幸福的时刻。',
            emoji: '💑',
            side: 'right'
        },
                {
            date: '现在',
            title: '向你求婚',
            description: '经历了这么多美好的时光，我想和你一起走完余生。宝宝，你愿意嫁给我吗？',
            emoji: '💍',
            side: 'proposal'
        }
    ];

    // 生成时间线
    let timelineHtml = '';
    timelineEvents.forEach((event, index) => {
        if (event.side === 'proposal') {
            timelineHtml += `
                <div class="timeline-item ${event.side}" data-index="${index}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card proposal-card">
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-title">
                            <span class="timeline-emoji">${event.emoji}</span>
                            <span>${event.title}</span>
                        </div>
                        <div class="timeline-description">${event.description}</div>
                        <button id="timelineYesBtn">我愿意！💕</button>
                    </div>
                </div>
            `;
        } else {
            timelineHtml += `
                <div class="timeline-item ${event.side}" data-index="${index}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card">
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-title">
                            <span class="timeline-emoji">${event.emoji}</span>
                            <span>${event.title}</span>
                        </div>
                        <div class="timeline-description">${event.description}</div>
                    </div>
                </div>
            `;
        }
    });

    $('#timelineContent').html(timelineHtml);

    // 滚动触发动画
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // 按钮事件
    $(document).on('click', '#timelineYesBtn', function() {
        // 隐藏原界面，避免与弹窗冲突
        $('.timeline-mode-container').fadeOut(300);
        modal('谢谢你，让我们一起创造更多美好的回忆！💕', function() {
            fireworks();
        });
    });

    // 自动滚动到顶部
    $('.timeline-mode-container').scrollTop(0);
}
