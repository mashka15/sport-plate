document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();

    // РЕДАКТИРОВАНИЕ ПРОФИЛЯ
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', editProfile);
    }
});

function loadProfileData() {
    // Загрузка данных пользователя
    const user = JSON.parse(localStorage.getItem('fitaiUser') || '{}');
    const totalMacros = JSON.parse(localStorage.getItem('fitaiTotalMacros') || '{"calories":0,"protein":0,"fat":0,"carbs":0}');
    const waterAmount = parseFloat(localStorage.getItem('fitaiWaterAmount') || '0');
    const workoutReport = JSON.parse(localStorage.getItem('fitaiWorkoutReport') || '[]');

    // Обновление полей
    document.getElementById('profileName').textContent = user.name || 'Людмила Карпова';
    document.getElementById('profileCalories').textContent = Math.round(totalMacros.calories);
    document.getElementById('profileProtein').textContent = Math.round(totalMacros.protein);
    document.getElementById('profileFat').textContent = Math.round(totalMacros.fat);
    document.getElementById('profileCarbs').textContent = Math.round(totalMacros.carbs);
    document.getElementById('waterToday').textContent = waterAmount.toFixed(1) + '/2.5л';

    // Последние тренировки
    const recentWorkouts = document.getElementById('recentWorkouts');
    if (recentWorkouts) {
        const recent = workoutReport.slice(-3).map(w =>
            `<div>${w.exercise} • ${w.sets}×${w.reps}</div>`
        ).join('') || 'Нет тренировок';
        recentWorkouts.innerHTML = recent;
    }
}

function editProfile() {
    const name = prompt('Новое имя:', document.getElementById('profileName').textContent);
    if (name && name.trim()) {
        document.getElementById('profileName').textContent = name;
        localStorage.setItem('fitaiUser', JSON.stringify({ name: name.trim() }));
    }
}

console.log('👤 Profile.js загружен');
