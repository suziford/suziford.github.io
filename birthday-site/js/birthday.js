// Скрипты страницы поздравления
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const birthdayContent = document.querySelector('.birthday-content');
    const backgroundSvg = document.querySelector('.background-svg');
    
    // Устанавливаем цвет фона
    document.body.style.backgroundColor = '#0a0a10';
    
    // Плавно показываем экран загрузки
    setTimeout(function() {
        loadingScreen.classList.add('visible');
    }, 50);
    
    // Фейковая загрузка 5-7 секунд
    const loadingTime = Math.random() * 2000 + 5000; // 5-7 секунд
    
    setTimeout(function() {
        // Плавно скрываем экран загрузки
        loadingScreen.classList.remove('visible');
        
        // После завершения анимации скрываем экран
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            
            // Показываем контент
            birthdayContent.style.display = 'flex';
            
            // Плавно увеличиваем яркость фона только после появления контента
            setTimeout(function() {
                backgroundSvg.style.filter = 'brightness(1.2)';
                document.body.style.backgroundColor = '#271f30';
            }, 500);
            
            // Последовательное появление элементов
            const artWrapper = document.querySelector('.art-wrapper');
            const longText = document.querySelector('.long-text');
            const photoWrappers = document.querySelectorAll('.photo-wrapper');
            const shortText = document.querySelector('.short-text');
            const characterReveal = document.getElementById('characterReveal');
            const continueButton = document.getElementById('continueButton');
            const hiddenContent = document.getElementById('hiddenContent');
            const musicPlayerWrapper = document.querySelector('.music-player-wrapper');
            const charactersContainer = document.querySelector('.characters-container');
            
            // Начинаем анимацию персонажа
            if (characterReveal) {
                characterReveal.classList.add('active');
            }

            // Первый арт со вспышкой
            setTimeout(function() {
                artWrapper.classList.add('flash-in');
            }, 100);

            // Длинный текст
            setTimeout(function() {
                longText.classList.add('fade-in');
            }, 600);

            // Картинки и короткий текст скрыты, показываем только после клика на кнопку
            // Инициализация модального окна для фото
            setupPhotoModal();
            
            // Инициализация эффектов для текстовых элементов
            setupTextEffects();
            
            // Инициализация музыкального плеера
            setupMusicPlayer();
            
            // Инициализация арт-персонажей
            setupCharacters();
            
            // Инициализация персонажа на плеере
            setupMusicPlayerCharacter();
            
            // Инициализация персонажа у текста
            setupTextCharacter();
            
            // Обработчик кнопки продолжения
            if (continueButton) {
                continueButton.addEventListener('click', function(e) {
                    // Создаём ripple эффект внутри кнопки
                    const rect = this.getBoundingClientRect();
                    const ripple = document.createElement('div');
                    ripple.className = 'button-ripple';
                    ripple.style.left = (e.clientX - rect.left) + 'px';
                    ripple.style.top = (e.clientY - rect.top) + 'px';
                    this.appendChild(ripple);
                    
                    // Удаляем ripple после анимации
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                    
                    // Отключаем кнопку
                    this.disabled = true;
                    
                    // Показываем скрытый контент
                    hiddenContent.classList.add('visible');
                    
                    // Плавная прокрутка вниз на небольшое расстояние
                    setTimeout(() => {
                        const currentScroll = window.scrollY;
                        const targetScroll = currentScroll + 200; // Прокручиваем только на 200px
                        smoothScrollTo(targetScroll, 800); // 800ms для плавности
                    }, 100);
                    
                    // Последовательное появление элементов
                    setTimeout(function() {
                        if (musicPlayerWrapper) {
                            musicPlayerWrapper.classList.add('fade-in');
                        }
                    }, 200);
                    
                    photoWrappers.forEach((wrapper, index) => {
                        setTimeout(function() {
                            wrapper.classList.add('fade-in');
                        }, 400 + (index * 400));
                    });

                    // Короткий текст после картинок
                    setTimeout(function() {
                        shortText.classList.add('fade-in');
                    }, 400 + (photoWrappers.length * 400) + 300);
                    
                    // Арт-персонажи после короткого текста
                    setTimeout(function() {
                        if (charactersContainer) {
                            charactersContainer.classList.add('fade-in');
                        }
                    }, 400 + (photoWrappers.length * 400) + 600);
                });
            }
        }, 400);
        
    }, loadingTime);
});

// Функция плавной прокрутки
function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function для плавности
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const easedProgress = easeInOutQuad(progress);
        
        window.scrollTo(0, startY + distance * easedProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

// Персонаж на музыкальном плеере
function setupMusicPlayerCharacter() {
    const character = document.getElementById('musicPlayerCharacter');
    
    if (character) {
        character.addEventListener('click', function(e) {
            // Предотвращаем распространение события на родительский элемент
            e.stopPropagation();
            
            // Добавляем анимацию сплющивания
            this.classList.remove('squish');
            void this.offsetWidth;
            this.classList.add('squish');
            
            // Создаём партиклы нот из центра персонажа
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createNoteParticles(centerX, centerY);
        });
    }
}

// Персонаж у текста
function setupTextCharacter() {
    const character = document.getElementById('textCharacter');
    
    if (character) {
        character.addEventListener('click', function(e) {
            // Предотвращаем распространение события на родительский элемент
            e.stopPropagation();
            
            // Добавляем анимацию сплющивания
            this.classList.remove('squish');
            void this.offsetWidth;
            this.classList.add('squish');
            
            // Создаём партиклы сердечек из центра персонажа
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createHeartParticles(centerX, centerY);
        });
    }
}

// Партиклы нот
function createNoteParticles(x, y) {
    const notes = ['♪', '♫', '♬', '♩'];
    const colors = ['#ffffff', '#cccccc', '#999999', '#666666', '#333333'];
    
    for (let i = 0; i < 8; i++) {
        const note = document.createElement('div');
        note.className = 'note-particle';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = x + 'px';
        note.style.top = y + 'px';
        note.style.color = colors[Math.floor(Math.random() * colors.length)];
        note.style.fontSize = (15 + Math.random() * 15) + 'px';
        note.style.position = 'fixed';
        note.style.pointerEvents = 'none';
        note.style.zIndex = '1000';
        note.style.opacity = '1';
        note.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(note);
        
        // Случайное направление
        const angle = (Math.random() * Math.PI * 2);
        const distance = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance - 50; // Чуть вверх
        
        setTimeout(() => {
            note.style.left = endX + 'px';
            note.style.top = endY + 'px';
            note.style.opacity = '0';
            note.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        // Удаляем партикл
        setTimeout(() => {
            note.remove();
        }, 1000);
    }
}

// Партиклы сердечек
function createHeartParticles(x, y) {
    const hearts = ['❤', '💕', '💖', '💗', '💓'];
    const colors = ['#ff6b6b', '#ff8e8e', '#ffb4b4', '#ff6b9d', '#ff8fab'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (15 + Math.random() * 15) + 'px';
        heart.style.position = 'fixed';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.opacity = '1';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Случайное направление
        const angle = (Math.random() * Math.PI * 2);
        const distance = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance - 50; // Чуть вверх
        
        setTimeout(() => {
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        // Удаляем партикл
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Арт-персонажи
function setupCharacters() {
    const characterImages = document.querySelectorAll('.character-image');
    
    characterImages.forEach(img => {
        img.addEventListener('click', function() {
            const originalSrc = this.src;
            const gifSrc = this.getAttribute('data-gif');
            
            if (gifSrc && originalSrc !== gifSrc) {
                // Меняем на гифку
                this.src = gifSrc;
                
                // Возвращаем обратно через 6 секунд
                setTimeout(() => {
                    this.src = originalSrc;
                }, 6000);
            }
        });
    });
}

// Музыкальный плеер
function setupMusicPlayer() {
    const playButton = document.getElementById('playButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const progressSlider = document.getElementById('progressSlider');
    const volumeSlider = document.getElementById('volumeSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    
    if (playButton && audioPlayer) {
        // Устанавливаем базовую громкость 10%
        audioPlayer.volume = 0.1;
        
        playButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                this.classList.add('playing');
            } else {
                audioPlayer.pause();
                this.classList.remove('playing');
            }
        });
        
        // Сброс кнопки когда музыка заканчивается
        audioPlayer.addEventListener('ended', function() {
            playButton.classList.remove('playing');
            progressSlider.value = 0;
            updateTimeDisplay();
        });
        
        // Обновление прогресса во время воспроизведения
        audioPlayer.addEventListener('timeupdate', function() {
            if (audioPlayer.duration) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressSlider.value = progress;
                updateTimeDisplay();
            }
        });
        
        // Перемотка при изменении слайдера
        if (progressSlider) {
            progressSlider.addEventListener('input', function() {
                if (audioPlayer.duration) {
                    const seekTime = (this.value / 100) * audioPlayer.duration;
                    audioPlayer.currentTime = seekTime;
                }
            });
        }
        
        // Изменение громкости
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                audioPlayer.volume = this.value / 100;
            });
        }
        
        // Функция обновления времени
        function updateTimeDisplay() {
            if (audioPlayer.duration) {
                const current = formatTime(audioPlayer.currentTime);
                const total = formatTime(audioPlayer.duration);
                timeDisplay.textContent = `${current} / ${total}`;
            }
        }
        
        // Функция форматирования времени
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }
}

// Эффекты для текстовых элементов
function setupTextEffects() {
    const glassBoxes = document.querySelectorAll('.glass-box');
    
    glassBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Добавляем эффект тряски
            this.classList.remove('shake');
            void this.offsetWidth; // Trigger reflow
            this.classList.add('shake');
            
            // Создаём эффект круга
            createClickCircle(e.clientX, e.clientY);
            
            // Создаём партиклы выпадающие с рамки
            createBorderParticles(this);
        });
        
        // Добавляем cursor pointer
        box.style.cursor = 'pointer';
    });
}

// Функция создания круга при клике
function createClickCircle(x, y) {
    const circle = document.createElement('div');
    circle.className = 'click-circle';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    document.body.appendChild(circle);
    
    // Удаляем элемент после анимации
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Функция создания партиклов выпадающих с рамки
function createBorderParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(122, 106, 136, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        // Распределяем партиклы по периметру рамки
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY;
        
        switch(side) {
            case 0: // top
                startX = rect.left + Math.random() * rect.width;
                startY = rect.top;
                break;
            case 1: // right
                startX = rect.right;
                startY = rect.top + Math.random() * rect.height;
                break;
            case 2: // bottom
                startX = rect.left + Math.random() * rect.width;
                startY = rect.bottom;
                break;
            case 3: // left
                startX = rect.left;
                startY = rect.top + Math.random() * rect.height;
                break;
        }
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        // Направление падения (вниз и немного в стороны)
        const vx = (Math.random() - 0.5) * 2;
        const vy = 2 + Math.random() * 2;
        
        document.body.appendChild(particle);
        
        let px = 0;
        let py = 0;
        let opacity = 1;
        
        const animate = () => {
            px += vx;
            py += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${px}px, ${py}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Модальное окно для просмотра фото
function setupPhotoModal() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const photos = document.querySelectorAll('.photo');
    const artImage = document.querySelector('.art-image');
    
    // Переменные для перетаскивания
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;
    
    // Открытие модального окна при клике на фото
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            modalImage.src = this.src;
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            modalImage.classList.remove('zoomed');
            resetPosition();
        });
    });
    
    // Открытие модального окна при клике на арт
    if (artImage) {
        artImage.addEventListener('click', function() {
            modalImage.src = this.src;
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            modalImage.classList.remove('zoomed');
            resetPosition();
        });
    }
    
    // Закрытие по кнопке
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Закрытие по клику вне фото
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Зум при клике на фото
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('zoomed');
        if (!this.classList.contains('zoomed')) {
            resetPosition();
        }
    });
    
    // Перетаскивание зумированного изображения
    modalImage.addEventListener('mousedown', function(e) {
        if (!this.classList.contains('zoomed')) return;
        
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        this.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        
        modalImage.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modalImage.style.cursor = 'grab';
        }
    });
    
    // Touch события для мобильных
    modalImage.addEventListener('touchstart', function(e) {
        if (!this.classList.contains('zoomed')) return;
        
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        
        modalImage.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    function resetPosition() {
        translateX = 0;
        translateY = 0;
        modalImage.style.transform = '';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        modalImage.classList.remove('zoomed');
        resetPosition();
        setTimeout(function() {
            modalImage.src = '';
        }, 300);
    }
}
