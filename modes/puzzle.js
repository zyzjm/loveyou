// 拼图解锁式表白模式
function initPuzzleMode() {
    console.log('初始化拼图解锁模式');

    // 清空并重建界面
    $('.page_one').html(`
        <div class="puzzle-mode-container">
            <div class="puzzle-header">
                <h2>💝 拼图解锁爱的表白</h2>
                <p>将拼图块拖动到正确位置</p>
            </div>
            <div class="puzzle-board" id="puzzleBoard"></div>
            <div class="puzzle-pieces" id="puzzlePieces"></div>
            <div class="puzzle-hint">提示：将下方的拼图块拖动到上方对应的位置</div>
        </div>
    `);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .puzzle-mode-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 200;
            padding: 20px;
            padding-bottom: 180px;
            gap: 20px;
        }
        .puzzle-header {
            text-align: center;
            color: white;
        }
        .puzzle-header h2 {
            font-size: 28px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .puzzle-header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .puzzle-board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 5px;
            background: rgba(255, 255, 255, 0.2);
            padding: 10px;
            border-radius: 10px;
        }
        .puzzle-slot {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.3);
            border: 2px dashed rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s;
        }
        .puzzle-slot.drag-over {
            background: rgba(255, 255, 255, 0.5);
            border-color: #f5576c;
            transform: scale(1.05);
        }
        .puzzle-pieces {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            max-width: 500px;
        }
        .puzzle-piece {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            cursor: move;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: all 0.3s;
            user-select: none;
        }
        .puzzle-piece:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        }
        .puzzle-piece.dragging {
            opacity: 0.5;
            cursor: grabbing;
        }
        .puzzle-piece.placed {
            cursor: default;
        }
        .puzzle-slot .puzzle-piece {
            width: 100%;
            height: 100%;
            cursor: default;
            box-shadow: none;
        }
        .puzzle-slot .puzzle-piece:hover {
            transform: none;
        }
        .puzzle-hint {
            text-align: center;
            color: white;
            font-size: 14px;
            opacity: 0.8;
            max-width: 400px;
            margin-bottom: 20px;
        }
        @media (max-width: 768px) {
            .puzzle-mode-container {
                padding-bottom: 160px;
            }
            .puzzle-board {
                grid-template-columns: repeat(3, 80px);
                grid-template-rows: repeat(3, 80px);
            }
            .puzzle-slot {
                width: 80px;
                height: 80px;
            }
            .puzzle-piece {
                width: 65px;
                height: 65px;
                font-size: 28px;
            }
            .puzzle-header h2 {
                font-size: 24px;
            }
        }
    `;
    document.head.appendChild(style);

    // 拼图内容（9宫格，使用表情符号）
    const puzzleData = [
        { id: 0, content: '❤️', emoji: '❤️' },
        { id: 1, content: '我', emoji: '🙋' },
        { id: 2, content: '爱', emoji: '💕' },
        { id: 3, content: '你', emoji: '👫' },
        { id: 4, content: '嫁', emoji: '👰' },
        { id: 5, content: '给', emoji: '💍' },
        { id: 6, content: '我', emoji: '🤵' },
        { id: 7, content: '好', emoji: '✨' },
        { id: 8, content: '吗', emoji: '❓' }
    ];

    // 打乱拼图顺序
    const shuffledPieces = [...puzzleData].sort(() => Math.random() - 0.5);

    // 创建拼图板（空槽位）
    let boardHtml = '';
    for (let i = 0; i < 9; i++) {
        boardHtml += `<div class="puzzle-slot" data-slot="${i}"></div>`;
    }
    $('#puzzleBoard').html(boardHtml);

    // 创建拼图块
    let piecesHtml = '';
    shuffledPieces.forEach(piece => {
        piecesHtml += `
            <div class="puzzle-piece" draggable="true" data-id="${piece.id}">
                <span style="font-size: 40px;">${piece.emoji}</span>
            </div>
        `;
    });
    $('#puzzlePieces').html(piecesHtml);

    // 已放置的拼图数量
    let placedCount = 0;

    // 拖拽事件
    let draggedPiece = null;

    $('.puzzle-piece').on('dragstart', function(e) {
        if ($(this).hasClass('placed')) return;
        draggedPiece = this;
        $(this).addClass('dragging');
    });

    $('.puzzle-piece').on('dragend', function(e) {
        $(this).removeClass('dragging');
    });

    $('.puzzle-slot').on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('drag-over');
    });

    $('.puzzle-slot').on('dragleave', function(e) {
        $(this).removeClass('drag-over');
    });

    $('.puzzle-slot').on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('drag-over');

        if (!draggedPiece) return;

        const pieceId = parseInt($(draggedPiece).data('id'));
        const slotId = parseInt($(this).data('slot'));

        // 检查是否放置正确
        if (pieceId === slotId) {
            // 正确放置
            $(draggedPiece).addClass('placed');
            $(draggedPiece).css({
                'cursor': 'default',
                'box-shadow': 'none'
            });
            $(this).append(draggedPiece);
            placedCount++;

            // 检查是否完成
            if (placedCount === 9) {
                setTimeout(onPuzzleComplete, 500);
            }
        } else {
            // 错误放置，抖动提示
            $(draggedPiece).css('animation', 'shake 0.5s');
            setTimeout(() => {
                $(draggedPiece).css('animation', '');
            }, 500);
        }

        draggedPiece = null;
    });

    // 添加抖动动画
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // 触摸事件支持（移动端）
    let touchPiece = null;

    $('.puzzle-piece').on('touchstart', function(e) {
        if ($(this).hasClass('placed')) return;
        e.preventDefault();
        touchPiece = this;
        $(this).addClass('dragging');
    });

    $('.puzzle-piece').on('touchend', function(e) {
        e.preventDefault();
        $(this).removeClass('dragging');

        if (!touchPiece) return;

        const touch = e.originalEvent.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        const slot = $(dropTarget).closest('.puzzle-slot');

        if (slot.length > 0) {
            const pieceId = parseInt($(touchPiece).data('id'));
            const slotId = parseInt(slot.data('slot'));

            if (pieceId === slotId) {
                $(touchPiece).addClass('placed');
                $(touchPiece).css({
                    'cursor': 'default',
                    'box-shadow': 'none'
                });
                slot.append(touchPiece);
                placedCount++;

                if (placedCount === 9) {
                    setTimeout(onPuzzleComplete, 500);
                }
            } else {
                $(touchPiece).css('animation', 'shake 0.5s');
                setTimeout(() => {
                    $(touchPiece).css('animation', '');
                }, 500);
            }
        }

        touchPiece = null;
    });

    function onPuzzleComplete() {
        // 拼图完成，显示完整文字
        $('#puzzleBoard').addClass('completed');

        // 添加完成动画
        $('.puzzle-piece').each(function(index) {
            setTimeout(() => {
                $(this).css({
                    'animation': 'bounceIn 0.5s',
                    'transform': 'scale(1.1)'
                });
                setTimeout(() => {
                    $(this).css('transform', 'scale(1)');
                }, 500);
            }, index * 100);
        });

        setTimeout(() => {
            // 隐藏原界面，避免与弹窗冲突
            $('.puzzle-mode-container').fadeOut(300);
            modal('你拼出了我的心声！宝宝，你愿意嫁给我吗？💍', function() {
                fireworks();
            });
        }, 1500);
    }

    // 添加完成动画样式
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounceIn {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(bounceStyle);
}
