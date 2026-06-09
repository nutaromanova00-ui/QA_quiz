// Модуль карточек (флип-карты)
class FlashcardsModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.cards = [];
        this.currentIndex = 0;
        this.flashcardElement = null;
        this.frontTextElement = null;
        this.backTextElement = null;
        this.counterElement = null;
    }
    
    init() {
        this.flashcardElement = document.getElementById('flashcardEl');
        this.frontTextElement = document.getElementById('frontText');
        this.backTextElement = document.getElementById('backText');
        this.counterElement = document.getElementById('flashcardCounter');
        
        this.shuffle();
        
        // Обработчики
        this.flashcardElement.addEventListener('click', () => this.flip());
        document.getElementById('prevCardBtn').addEventListener('click', () => this.prev());
        document.getElementById('nextCardBtn').addEventListener('click', () => this.next());
        document.getElementById('resetFlipBtn').addEventListener('click', () => this.shuffle());
    }
    
    shuffle() {
        this.cards = shuffleArray(this.dataSource());
        this.currentIndex = 0;
        this.updateUI();
    }
    
    updateUI() {
        const card = this.cards[this.currentIndex];
        if (card) {
            this.frontTextElement.innerText = card.question;
            this.backTextElement.innerHTML = card.answer;
            this.counterElement.innerText = `${this.currentIndex + 1} / ${this.cards.length}`;
        }
        this.flipBack(); // сбрасываем переворот
    }
    
    flip() {
        this.flashcardElement.classList.toggle('flipped');
    }
    
    flipBack() {
        this.flashcardElement.classList.remove('flipped');
    }
    
    prev() {
        if (this.cards.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateUI();
    }
    
    next() {
        if (this.cards.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateUI();
    }
}