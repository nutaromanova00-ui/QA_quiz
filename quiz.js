// Модуль тестирования с профессиональными вариантами ответов
class QuizModule {
    constructor(dataSource, progressStorage) {
        this.dataSource = dataSource;
        this.progressStorage = progressStorage;
        this.questions = [];
        this.currentIndex = 0;
        this.userAnswered = false;
    }
    
    init() {
        this.questionElement = document.getElementById('quizQuestion');
        this.optionsContainer = document.getElementById('quizOptions');
        this.explanationContainer = document.getElementById('quizExplanation');
        this.counterElement = document.getElementById('quizCounter');
        
        document.getElementById('nextQuizBtn').addEventListener('click', () => this.next());
        document.getElementById('resetQuizBtn').addEventListener('click', () => this.shuffle());
        
        this.buildQuestions();
        this.shuffle();
    }
    
    // Профессиональные дистракторы (все варианты — реальные IT-термины)
    getDistractors(questionText, correctAnswer) {
        const distractorMap = {
            "DevTools": [
                "Среда для автоматизации тестирования Selenium",
                "Система управления тест-кейсами TestRail",
                "Инструмент для нагрузочного тестирования JMeter"
            ],
            "клиент-сервер": [
                "Архитектура с P2P-подключениями без выделенного сервера",
                "Модель, где все компоненты работают на одной машине",
                "Архитектура, где сервер инициирует все соединения"
            ],
            "REST": [
                "Протокол для синхронизации времени в сети SNTP",
                "Технология удалённого вызова процедур RPC",
                "Фреймворк для разработки веб-сервисов на Java"
            ],
            "SOAP": [
                "Протокол для потокового видео RTSP",
                "Формат обмена данными Protocol Buffers",
                "Механизм удалённого доступа к объектам CORBA"
            ],
            "JSON": [
                "Формат сериализации данных MessagePack",
                "Язык разметки документов Markdown",
                "Протокол передачи сообщений AMQP"
            ],
            "микросервис": [
                "Монолитное приложение на одном сервере",
                "Сервис для управления контейнерами Docker",
                "Архитектура на основе очередей сообщений"
            ],
            "API": [
                "Графический интерфейс пользователя GUI",
                "Протокол прикладного уровня HTTP",
                "Система управления содержимым CMS"
            ],
            "Postman": [
                "Среда интеграции и доставки Jenkins",
                "Инструмент мониторинга серверов Zabbix",
                "Система логирования ELK Stack"
            ],
            "билд": [
                "Процесс отладки приложения в IDE",
                "Стадия планирования релиза",
                "Инструмент автоматизации сборки Maven"
            ],
            "кэш": [
                "Протокол шифрования данных TLS",
                "Механизм балансировки нагрузки",
                "Система резервного копирования"
            ],
            "регрессионное": [
                "Тестирование только новой функциональности",
                "Проверка безопасности приложения",
                "Тестирование документации к продукту"
            ],
            "смоук": [
                "Глубокое функциональное тестирование",
                "Проверка всех сценариев с реальными данными",
                "Нагрузочное тестирование под давлением"
            ],
            "попарное": [
                "Техника случайного тестирования",
                "Метод исчерпывающего перебора всех комбинаций",
                "Анализ только одной пары параметров"
            ],
            "SQL": [
                "Язык для создания веб-страниц HTML",
                "Каскадные таблицы стилей CSS",
                "Язык программирования Python"
            ],
            "аутентификация": [
                "Проверка прав доступа к ресурсу",
                "Подтверждение целостности данных",
                "Шифрование передаваемой информации"
            ],
            "авторизация": [
                "Проверка подлинности пользователя",
                "Создание цифровой подписи",
                "Шифрование пароля в базе данных"
            ]
        };
        
        const lowerQuestion = questionText.toLowerCase();
        let distractors = [];
        
        for (let [keyword, dists] of Object.entries(distractorMap)) {
            if (lowerQuestion.includes(keyword.toLowerCase())) {
                distractors = [...dists];
                break;
            }
        }
        
        // Универсальные предметные дистракторы
        if (distractors.length === 0) {
            distractors = [
                "Методология разработки Agile Scrum",
                "Принципы SOLID в ООП",
                "Паттерн проектирования Model-View-Controller",
                "Система контроля версий Git"
            ];
        }
        
        let shuffled = shuffleArray([...distractors]);
        let result = [];
        for (let d of shuffled) {
            if (d !== correctAnswer && !result.includes(d) && result.length < 3) {
                result.push(d);
            }
        }
        
        while (result.length < 3) {
            result.push("Требует дополнительного изучения по этой теме");
        }
        
        return result;
    }
    
    buildQuestions() {
        const db = this.dataSource();
        
        this.questions = db.map(card => {
            let distractors = this.getDistractors(card.question, card.answer);
            let options = [card.answer, ...distractors];
            options = shuffleArray(options);
            const correctIndex = options.findIndex(opt => opt === card.answer);
            
            return {
                id: Math.random(),
                question: card.question,
                options: options,
                correctIndex: correctIndex,
                shortAnswer: card.answer,
                explanation: this.getDetailedExplanation(card.question, card.answer)
            };
        });
        
        this.addAllOfTheAboveQuestions();
    }
    
    addAllOfTheAboveQuestions() {
        const allAboveQuestions = [
            {
                question: "Что должен уметь ручной тестировщик?",
                correctAnswer: "Всё перечисленное верно",
                parts: ["Писать тест-кейсы и чек-листы", "Работать с баг-трекинговыми системами", "Тестировать API через Postman"],
                explanation: "Профессиональный тестировщик сочетает все эти навыки: документирование, баг-трекинг и API-тестирование."
            },
            {
                question: "Что относится к обязанностям QA-инженера?",
                correctAnswer: "Все перечисленные варианты",
                parts: ["Анализ требований к продукту", "Написание тестовой документации", "Выполнение функционального тестирования"],
                explanation: "QA охватывает весь цикл: от анализа требований до выполнения тестов."
            },
            {
                question: "Какие инструменты используют тестировщики?",
                correctAnswer: "Всё перечисленное",
                parts: ["Postman для API", "Charles/Fiddler для проксирования", "DevTools для отладки"],
                explanation: "Современный тестировщик владеет разными инструментами под разные задачи."
            },
            {
                question: "Что относится к видам тестирования по времени выполнения?",
                correctAnswer: "Все перечисленные",
                parts: ["Регрессионное тестирование", "Смоук-тестирование", "Санитарное тестирование"],
                explanation: "Эти виды различаются по объёму: смоук — минимум для стабильности, санитарное — быстрая проверка фиксов."
            },
            {
                question: "Что относится к техникам тест-дизайна?",
                correctAnswer: "Всё перечисленное",
                parts: ["Эквивалентное разделение", "Анализ граничных значений", "Попарное тестирование"],
                explanation: "Все эти техники помогают покрыть функционал без избыточных тестов."
            },
            {
                question: "Что входит в качественный баг-репорт?",
                correctAnswer: "Всё перечисленное верно",
                parts: ["Шаги воспроизведения и результат", "Окружение и версию приложения", "Серьёзность и приоритет"],
                explanation: "Хороший баг-репорт содержит все эти поля для воспроизведения и исправления."
            },
            {
                question: "Что относится к HTTP-методам REST API?",
                correctAnswer: "Все перечисленные",
                parts: ["GET и POST", "PUT и DELETE", "PATCH и OPTIONS"],
                explanation: "REST API использует все эти методы для CRUD-операций."
            },
            {
                question: "Какие статус-коды относятся к ошибкам клиента (4xx)?",
                correctAnswer: "Все перечисленные",
                parts: ["400 Bad Request", "401 Unauthorized", "404 Not Found"],
                explanation: "4xx коды — ошибки на стороне клиента: неверный запрос, отсутствие авторизации, ресурс не найден."
            },
            {
                question: "Что относится к основным принципам тестирования?",
                correctAnswer: "Всё перечисленное",
                parts: ["Исчерпывающее тестирование невозможно", "Дефекты кластеризуются", "Тестирование зависит от контекста"],
                explanation: "Это три из семи принципов тестирования по ISTQB."
            },
            {
                question: "Что входит в обязанности тестировщика на этапе анализа требований?",
                correctAnswer: "Всё перечисленное",
                parts: ["Выявление неясных требований", "Оценка тестируемости", "Поиск противоречий в документации"],
                explanation: "Тестировщик участвует в анализе требований ещё до начала разработки."
            },
            {
                question: "Что может быть причиной бага?",
                correctAnswer: "Все перечисленные варианты",
                parts: ["Некорректные требования", "Ошибка в коде разработчика", "Конфигурация окружения"],
                explanation: "Дефекты могут возникать на любом этапе: требования, код, окружение."
            }
        ];
        
        allAboveQuestions.forEach(item => {
            let options = [...item.parts, item.correctAnswer];
            options = shuffleArray(options);
            const correctIndex = options.findIndex(opt => opt === item.correctAnswer);
            const partsList = item.parts.map(p => `✓ ${p}`).join('<br>');
            
            this.questions.push({
                id: Math.random(),
                question: item.question,
                options: options,
                correctIndex: correctIndex,
                shortAnswer: item.correctAnswer,
                explanation: `${item.explanation}<br><br><strong>Правильные пункты:</strong><br>${partsList}`,
                isAllAbove: true
            });
        });
        
        this.questions = shuffleArray(this.questions);
    }
    
    getDetailedExplanation(question, answer) {
        const explanations = {
            "DevTools": "DevTools (F12) — встроенный инструмент браузера для отладки, анализа сети и проверки вёрстки.",
            "пирамида тестирования": "Пирамида тестирования рекомендует много модульных тестов (быстрые и дёшевые), меньше интеграционных и ещё меньше UI/E2E (медленных и дорогих).",
            "7 принципов": "Семь принципов тестирования по ISTQB — основа профессионального подхода к тестированию.",
            "ошибка дефект сбой": "Человек совершает ошибку (error) → появляется дефект в коде (defect) → при работе программы происходит сбой (failure).",
            "аутентификация": "Аутентификация отвечает на вопрос 'кто ты?', авторизация — 'что тебе можно?', верификация — 'соответствует ли требованиям?'.",
            "симулятор эмулятор": "Симулятор имитирует поведение (мягко), эмулятор — аппаратуру (жёстко). Например, эмулятор Android эмулирует ARM-процессор."
        };
        
        for (let [key, exp] of Object.entries(explanations)) {
            if (question.toLowerCase().includes(key.toLowerCase())) {
                return exp;
            }
        }
        
        return `${answer} — правильный ответ. ${question.substring(0, 50)} — важная тема для собеседования.`;
    }
    
    shuffle() {
        this.questions = shuffleArray([...this.questions]);
        this.currentIndex = 0;
        this.loadCurrent();
    }
    
    loadCurrent() {
        if (!this.questions.length) return;
        const q = this.questions[this.currentIndex];
        this.questionElement.innerHTML = q.question;
        this.optionsContainer.innerHTML = '';
        
        this.userAnswered = false;
        this.explanationContainer.innerHTML = '';
        
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = `${String.fromCharCode(65 + idx)}. ${opt}`;
            btn.addEventListener('click', () => this.handleAnswer(idx));
            this.optionsContainer.appendChild(btn);
        });
        
        this.counterElement.innerText = `Вопрос ${this.currentIndex + 1} из ${this.questions.length}`;
        this.updateProgressUI();
    }
    
    handleAnswer(selectedIdx) {
        if (this.userAnswered) return;
        
        const currentQ = this.questions[this.currentIndex];
        const isCorrect = (selectedIdx === currentQ.correctIndex);
        this.userAnswered = true;
        
        let explanationHtml = '';
        if (isCorrect) {
            explanationHtml = `
                <div class="explanation-box">
                    <div class="result-badge correct">✅ Верно!</div>
                    <p>${currentQ.explanation}</p>
                </div>
            `;
            this.progressStorage.addCorrect();
        } else {
            const correctAnswerText = currentQ.options[currentQ.correctIndex];
            explanationHtml = `
                <div class="explanation-box">
                    <div class="result-badge wrong">❌ Неправильно</div>
                    <p><strong>Правильный ответ:</strong> ${correctAnswerText}</p>
                    <p>📘 <strong>Почему:</strong> ${currentQ.explanation}</p>
                </div>
            `;
            this.progressStorage.addWrong();
        }
        
        this.explanationContainer.innerHTML = explanationHtml;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        this.updateProgressUI();
    }
    
    next() {
        if (!this.questions.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.questions.length;
        this.loadCurrent();
    }
    
    updateProgressUI() {
        const stats = this.progressStorage.getStats();
        const totalElement = document.getElementById('correctStats');
        const fillElement = document.getElementById('progressFill');
        const percentElement = document.getElementById('percentLabel');
        
        if (totalElement) totalElement.innerHTML = `✅ ${stats.correct} / ${stats.total}`;
        if (fillElement) fillElement.style.width = `${stats.percent}%`;
        if (percentElement) percentElement.innerHTML = `📈 ${Math.round(stats.percent)}% правильных ответов`;
    }
}