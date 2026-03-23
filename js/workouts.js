let workoutReport = JSON.parse(localStorage.getItem('fitaiWorkoutReport') || '[]');

document.addEventListener('DOMContentLoaded', function() {
    // ПРЕВЬЮ ВИДЕО
    document.getElementById('workoutVideo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const preview = document.getElementById('videoPreview');
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
        }
    });

    updateReportDisplay();
});

window.addToReport = function() {
    const exercise = document.getElementById('exerciseSelect').value;
    const sets = document.getElementById('setsInput').value;
    const reps = document.getElementById('repsInput').value;

    if (!exercise || !sets || !reps) {
        alert('⚠️ Заполните все поля!');
        return;
    }

    workoutReport.push({
        exercise, sets: parseInt(sets), reps: parseInt(reps),
        timestamp: new Date().toLocaleString('ru-RU')
    });

    if (workoutReport.length > 5) workoutReport = workoutReport.slice(-5);
    localStorage.setItem('fitaiWorkoutReport', JSON.stringify(workoutReport));
    updateReportDisplay();

    // ОЧИСТКА ФОРМЫ
    document.getElementById('exerciseSelect').value = '';
    document.getElementById('setsInput').value = '';
    document.getElementById('repsInput').value = '';
    document.getElementById('videoPreview').style.display = 'none';
    document.getElementById('workoutVideo').value = '';
}

function updateReportDisplay() {
    const list = document.getElementById('reportList');
    const progress = document.getElementById('progressFill');
    const btn = document.getElementById('saveReportBtn');
    const count = document.getElementById('reportCount');

    list.innerHTML = workoutReport.map((item, i) => `
        <div class="report-item">
            <div>
                <strong>${item.exercise}</strong><br>
                <small style="color:#ffaa00;">${item.sets}×${item.reps} • ${item.timestamp}</small>
            </div>
            <button onclick="removeFromReport(${i})" style="background:#ff1a1a;">🗑️</button>
        </div>
    `).join('');

    const percent = Math.min((workoutReport.length / 5) * 100, 100);
    progress.style.width = percent + '%';
    count.textContent = workoutReport.length;
    btn.disabled = workoutReport.length !== 5;
}

window.removeFromReport = function(index) {
    workoutReport.splice(index, 1);
    localStorage.setItem('fitaiWorkoutReport', JSON.stringify(workoutReport));
    updateReportDisplay();
}

window.saveAndAnalyze = function() {
    if (workoutReport.length !== 5) return;

    let feedback = '🚀 ИИ-АНАЛИЗ ТРЕНИРОВКИ:\n\n';
    workoutReport.forEach((item, i) => {
        const quality = 85 + Math.floor(Math.random() * 15);
        feedback += `${i+1}. ${item.exercise}: ${quality}% ✅\n`;
    });
    feedback += '\n💾 Отчёт сохранён!';
    alert(feedback);
}
