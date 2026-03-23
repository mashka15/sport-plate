// БАЗА ЕДЫ ДЛЯ ИИ-РАСПОЗНАВАНИЯ
function getRandomMacros() {
    const foods = [
        { name: 'Куриная грудка 150г + рис', cal: 450, pro: 35, fat: 12, carbs: 40 },
        { name: 'Лосось 200г + овощи', cal: 620, pro: 42, fat: 38, carbs: 15 },
        { name: 'Овсянка 100г + банан', cal: 380, pro: 12, fat: 6, carbs: 65 },
        { name: 'Гречка 120г + индейка', cal: 420, pro: 32, fat: 8, carbs: 55 },
        { name: 'Творог 200г + мёд', cal: 280, pro: 36, fat: 8, carbs: 15 }
    ];
    return foods[Math.floor(Math.random() * foods.length)];
}

document.addEventListener('DOMContentLoaded', function() {
    let totalMacros = JSON.parse(localStorage.getItem('fitaiTotalMacros') || '{"calories":0,"protein":0,"fat":0,"carbs":0}');
    let waterAmount = parseFloat(localStorage.getItem('fitaiWaterAmount') || '0');

    // ТАБЫ ПИТАНИЯ
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // ФОТО ЕДЫ → КБЖУ
    document.querySelectorAll('.food-placeholder').forEach(slot => {
        slot.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file'; input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const slotContainer = slot.closest('.food-slot');
                    const result = slotContainer.querySelector('.food-result');
                    slot.style.display = 'none';
                    result.classList.add('show');
                    result.querySelector('.food-image').style.backgroundImage = `url(${URL.createObjectURL(file)})`;

                    const macros = getRandomMacros();
                    const spans = result.querySelectorAll('.macros span');
                    result.querySelector('h4').textContent = `Определено: ${macros.name}`;
                    spans[0].textContent = `🔥 ${macros.cal} ккал`;
                    spans[1].textContent = `🥩 Б:${macros.pro}г`;
                    spans[2].textContent = `🍗 Ж:${macros.fat}г`;
                    spans[3].textContent = `🍚 У:${macros.carbs}г`;

                    // ТОТАЛЫ
                    totalMacros.calories += macros.cal;
                    totalMacros.protein += macros.pro;
                    totalMacros.fat += macros.fat;
                    totalMacros.carbs += macros.carbs;
                    localStorage.setItem('fitaiTotalMacros', JSON.stringify(totalMacros));
                    updateTotalMacros();
                }
            };
            input.click();
        });
    });

    // ТРЕКЕР ВОДЫ
    window.addWater = function(amount) {
        waterAmount += amount;
        if (waterAmount > 2.5) waterAmount = 2.5;
        localStorage.setItem('fitaiWaterAmount', waterAmount.toString());
        document.getElementById('waterAmount').textContent = waterAmount.toFixed(1);
        document.querySelector('.water-fill').style.width = (waterAmount / 2.5 * 100) + '%';
    }

    function updateTotalMacros() {
        const totalMacros = JSON.parse(localStorage.getItem('fitaiTotalMacros') || '{"calories":0,"protein":0,"fat":0,"carbs":0}');
        document.getElementById('totalCalories').textContent = Math.round(totalMacros.calories);
        document.getElementById('totalProtein').textContent = Math.round(totalMacros.protein);
        document.getElementById('totalFat').textContent = Math.round(totalMacros.fat);
        document.getElementById('totalCarbs').textContent = Math.round(totalMacros.carbs);
    }
});
