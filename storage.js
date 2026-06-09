// Управление статистикой в localStorage
class ProgressStorage {
    constructor() {
        this.stats = {
            totalAnswered: 0,
            correctCount: 0
        };
        this.load();
    }
    
    load() {
        const saved = localStorage.getItem("qa_progress_stats");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.stats.totalAnswered = parsed.totalAnswered || 0;
                this.stats.correctCount = parsed.correctCount || 0;
            } catch(e) {
                console.warn("Failed to load stats", e);
            }
        }
    }
    
    save() {
        localStorage.setItem("qa_progress_stats", JSON.stringify(this.stats));
    }
    
    addCorrect() {
        this.stats.totalAnswered++;
        this.stats.correctCount++;
        this.save();
    }
    
    addWrong() {
        this.stats.totalAnswered++;
        this.save();
    }
    
    reset() {
        this.stats.totalAnswered = 0;
        this.stats.correctCount = 0;
        this.save();
    }
    
    getProgress() {
        if (this.stats.totalAnswered === 0) return 0;
        return (this.stats.correctCount / this.stats.totalAnswered) * 100;
    }
    
    getStats() {
        return {
            total: this.stats.totalAnswered,
            correct: this.stats.correctCount,
            percent: this.getProgress()
        };
    }
}

// Создаём глобальный экземпляр
const progressStorage = new ProgressStorage();