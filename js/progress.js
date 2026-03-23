document.addEventListener('DOMContentLoaded', function() {
    loadProgressData();
    drawCharts();
});

function loadProgressData() {
    const workoutReport = JSON.parse(localStorage.getItem('fitaiWorkoutReport') || '[]');
    const totalMacros = JSON.parse(localStorage.getItem('fitaiTotalMacros') || '{"calories":0,"protein":0,"fat":0,"carbs":0}');

    // История тренировок
    const history = document.getElementById('workoutHistory');
    if (history) {
        history.innerHTML = workoutReport.map(w =>
            `<div class="history-item">${w.exercise} ${w.sets}×${w.reps}</div>`
        ).join('') || 'Нет данных';
    }
}

function drawCharts() {
    // ПРОСТОЙ ГРАФИК СИЛЫ (canvas)
    const ctx = document.getElementById('strengthChart')?.getContext('2d');
    if (ctx) {
        // Имитация данных прогресса
        const data = [50, 55, 62, 68, 70, 75]; // кг жим лежа
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(50, 300 - data[data.length-1], 30, data[data.length-1]);
        ctx.fillText('Жим лежа: 75кг', 90, 290);
    }
}

// СБРОС ДАННЫХ (кнопка)
window.resetProgress = function() {
    if (confirm('Сбросить всю статистику?')) {
        localStorage.clear();
        location.reload();
    }
}

console.log('📊 Progress.js загружен');
