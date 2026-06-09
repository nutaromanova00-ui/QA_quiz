// Основной модуль приложения
class App {
    constructor() {
        this.flashcardsModule = null;
        this.quizModule = null;
        this.currentMode = 'flashcard';
    }
    
    init() {
        // Инициализация модулей
        this.flashcardsModule = new FlashcardsModule(getDatabaseCopy);
        this.quizModule = new QuizModule(getDatabaseCopy, progressStorage);
        
        this.flashcardsModule.init();
        this.quizModule.init();
        
        // Настройка вкладок
        this.setupTabs();
        
        // Кнопка сброса статистики
        document.getElementById('clearStatsBtn').addEventListener('click', () => {
            if (confirm('Сбросить всю статистику ответов? Прогресс будет потерян.')) {
                progressStorage.reset();
                this.quizModule.updateProgressUI();
                alert('Статистика сброшена!');
            }
        });
        
        // Стартовый режим
        this.setMode('flashcard');
    }
    
    setupTabs() {
        const modeBtns = document.querySelectorAll('.mode-btn');
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setMode(btn.getAttribute('data-mode'));
            });
        });
    }
    
    setMode(mode) {
        this.currentMode = mode;
        const flashcardDiv = document.getElementById('flashcardMode');
        const quizDiv = document.getElementById('quizMode');
        
        if (mode === 'flashcard') {
            flashcardDiv.style.display = 'block';
            quizDiv.style.display = 'none';
        } else {
            flashcardDiv.style.display = 'none';
            quizDiv.style.display = 'block';
            this.quizModule.updateProgressUI();
        }
    }
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});