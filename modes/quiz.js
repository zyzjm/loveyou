// 问答游戏式表白模式
function initQuizMode() {
    console.log('初始化问答游戏模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="quiz-mode-container">
            <div class="quiz-card">
                <div class="quiz-header">
                    <div class="quiz-title">💝 爱的考验</div>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text"><span id="currentQ">1</span> / <span id="totalQ">6</span></div>
                    </div>
                </div>
                <div class="quiz-content">
                    <div class="question-text" id="questionText"></div>
                    <div class="answer-options" id="answerOptions"></div>
                </div>
                <div class="quiz-feedback" id="quizFeedback"></div>
            </div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .quiz-mode-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
            padding: 20px;
            padding-bottom: 180px;
        }
        .quiz-card {
            background: rgba(255, 255, 255, 0.95);
            max-width: 600px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .quiz-header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 25px;
            color: white;
        }
        .quiz-title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }
        .quiz-progress {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .progress-bar {
            flex: 1;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: white;
            border-radius: 10px;
            transition: width 0.5s ease;
            width: 0%;
        }
        .progress-text {
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
        }
        .quiz-content {
            padding: 40px 30px;
        }
        .question-text {
            font-size: 20px;
            color: #333;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 500;
            line-height: 1.6;
        }
        .answer-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .answer-option {
            padding: 15px 20px;
            background: #f5f5f5;
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 16px;
            color: #333;
            text-align: left;
        }
        .answer-option:hover {
            background: #e8e8e8;
            border-color: #f5576c;
            transform: translateX(5px);
        }
        .answer-option.correct {
            background: #d4edda;
            border-color: #28a745;
            animation: correctAnswer 0.5s;
        }
        .answer-option.wrong {
            background: #f8d7da;
            border-color: #dc3545;
            animation: wrongAnswer 0.5s;
        }
        .quiz-feedback {
            padding: 0 30px 30px;
            text-align: center;
            font-size: 16px;
            color: #666;
            min-height: 30px;
        }
        @keyframes correctAnswer {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        @keyframes wrongAnswer {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        @media (max-width: 768px) {
            .quiz-title {
                font-size: 20px;
            }
            .question-text {
                font-size: 18px;
            }
            .answer-option {
                font-size: 14px;
                padding: 12px 15px;
            }
            .quiz-content {
                padding: 30px 20px;
            }
        }
    `;
    document.head.appendChild(style);

    // 问题列表（可自定义）
    const questions = [
        {
            question: '我们第一次见面是在什么地方？',
            options: ['咖啡店', '公园', '朋友聚会', '网络上'],
            correct: 2, // 索引，请根据实际情况修改
            feedback: '对啦！那次聚会真是命中注定的相遇 💕'
        },
        {
            question: '我最喜欢吃的食物是什么？',
            options: ['火锅', '烤肉', '甜点', '海鲜'],
            correct: 0,
            feedback: '宝宝真了解我！下次一起去吃吧 🍲'
        },
        {
            question: '我们在一起多久了？',
            options: ['半年', '一年', '两年', '三年'],
            correct: 1,
            feedback: '时光飞逝，但每一天都很珍贵 ⏰'
        },
        {
            question: '我最喜欢的颜色是？',
            options: ['红色', '蓝色', '粉色', '紫色'],
            correct: 2,
            feedback: '就像你一样，温柔又美好 🌸'
        },
        {
            question: '我们的纪念日是哪一天？',
            options: ['1月1日', '2月14日', '5月20日', '我们每一天都是纪念日'],
            correct: 3,
            feedback: '说得太对了！每一天和你在一起都值得纪念 💝'
        },
        {
            question: '最后一个问题：你愿意嫁给我吗？',
            options: ['愿意！💕', '非常愿意！💖', '超级愿意！💗', '当然愿意！💓'],
            correct: -1, // 所有答案都正确
            feedback: '我就知道你会答应的！'
        }
    ];

    let currentQuestion = 0;

    function showQuestion() {
        const q = questions[currentQuestion];
        const total = questions.length;

        // 更新进度
        $('#currentQ').text(currentQuestion + 1);
        $('#totalQ').text(total);
        $('#progressFill').css('width', ((currentQuestion / total) * 100) + '%');

        // 显示问题
        $('#questionText').text(q.question);

        // 显示选项
        const optionsHtml = q.options.map((option, index) => {
            return `<div class="answer-option" data-index="${index}">${option}</div>`;
        }).join('');
        $('#answerOptions').html(optionsHtml);

        // 清空反馈
        $('#quizFeedback').text('');

        // 绑定点击事件
        $('.answer-option').click(function() {
            const selectedIndex = parseInt($(this).data('index'));
            handleAnswer(selectedIndex, $(this));
        });
    }

    function handleAnswer(selectedIndex, element) {
        const q = questions[currentQuestion];
        const isLastQuestion = currentQuestion === questions.length - 1;

        // 禁用所有选项
        $('.answer-option').css('pointer-events', 'none');

        // 如果是最后一个问题，所有答案都正确
        if (isLastQuestion) {
            element.addClass('correct');
            $('#quizFeedback').html('<span style="color: #28a745;">💕 ' + q.feedback + '</span>');

            setTimeout(() => {
                // 隐藏原界面，避免与弹窗冲突
                $('.quiz-mode-container').fadeOut(300);
                modal('谢谢你通过了爱的考验！你愿意嫁给我吗？💍', function() {
                    fireworks();
                });
            }, 1500);
            return;
        }

        // 检查答案
        if (selectedIndex === q.correct) {
            element.addClass('correct');
            $('#quizFeedback').html('<span style="color: #28a745;">✓ ' + q.feedback + '</span>');

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion();
                }
            }, 1500);
        } else {
            element.addClass('wrong');
            $('#quizFeedback').html('<span style="color: #dc3545;">再想想哦~ 😊</span>');

            // 1秒后重新启用选项
            setTimeout(() => {
                element.removeClass('wrong');
                $('.answer-option').css('pointer-events', 'auto');
                $('#quizFeedback').text('');
            }, 1000);
        }
    }

    // 开始游戏
    showQuestion();
}
