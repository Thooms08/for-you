document.addEventListener("DOMContentLoaded", () => {
    const heartContainer = document.getElementById("heart-container");
    const starsContainer = document.getElementById("stars-container");
    const btnOpenMessage = document.getElementById("btn-open-message");
    const messageModal = document.getElementById("message-modal");
    const btnReadDone = document.getElementById("btn-read-done");
    const bgMusic = document.getElementById("bg-music");

    // SPA sections
    const heroSection = document.getElementById("hero-section");
    const loveSection = document.getElementById("love-section");
    const loveHeading = document.getElementById("love-heading");
    const loveSubtitle = document.getElementById("love-subtitle");

    // Love section containers (for SPA)
    const heartContainerLove = document.getElementById("heart-container-love");
    const starsContainerLove = document.getElementById("stars-container-love");

    // 1. Fungsi Membuat Efek Love Melayang 
    if (heartContainer) {
        const isMobile = window.innerWidth < 768;

        const createHeart = () => {
            const heart = document.createElement("i");
            heart.classList.add("fa-solid", "fa-heart", "floating-heart", "text-pink-400");
            
            const randomXStart = Math.random() * 100;
            // Limit spread based on screen width to prevent off-screen overflow
            const maxSpread = isMobile ? window.innerWidth * 0.3 : 400;
            const randomXEnd = (Math.random() - 0.5) * maxSpread * 2;
            const randomScale = isMobile ? Math.random() * 0.6 + 0.6 : Math.random() * 1.2 + 0.8;
            const randomDuration = isMobile ? Math.random() * 4 + 5 : Math.random() * 5 + 5;
            const randomRotate = Math.random() * 360;

            heart.style.left = `${randomXStart}%`;
            heart.style.setProperty("--x-end", `${randomXEnd}px`);
            heart.style.setProperty("--scale", randomScale);
            heart.style.setProperty("--duration", `${randomDuration}s`);
            heart.style.setProperty("--rotate", `${randomRotate}deg`);
            
            // Variasi warna
            if (Math.random() > 0.5) {
                heart.classList.remove("text-pink-400");
                heart.classList.add("text-blue-400", "opacity-60");
            } else {
                heart.classList.add("opacity-70");
            }

            heartContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, randomDuration * 1000);
        };

        setInterval(createHeart, 300);
    }

    // 2. Fungsi Membuat Bintang Gemerlap di love.html
    if (starsContainer) {
        const createStar = () => {
            const star = document.createElement("div");
            star.classList.add("sparkle-star");
            
            const size = Math.random() * 6 + 4;
            const topPos = Math.random() * 100;
            const leftPos = Math.random() * 100;
            const duration = Math.random() * 2 + 1.5;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${topPos}%`;
            star.style.left = `${leftPos}%`;
            star.style.setProperty("--duration", `${duration}s`);

            starsContainer.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, duration * 1000);
        };

        for(let i = 0; i < 40; i++) {
            setTimeout(createStar, Math.random() * 3000);
        }
        setInterval(createStar, 150);
    }

    // 3. Autoplay Audio dari Awal + Loop
    if (bgMusic) {
        bgMusic.loop = true;

        // Jika ada posisi tersimpan dari halaman sebelumnya, lanjutkan dari sana
        const savedTime = sessionStorage.getItem("bgMusicTime");
        if (savedTime !== null) {
            bgMusic.currentTime = parseFloat(savedTime);
        } else {
            bgMusic.currentTime = 0;
        }

        const tryPlay = () => {
            bgMusic.play().catch(() => {
                // Retry on first user interaction if browser blocks autoplay
                document.addEventListener("click", tryPlay, { once: true });
                document.addEventListener("touchstart", tryPlay, { once: true });
            });
        };
        tryPlay();

        // Pastikan audio loop dari awal saat berakhir
        bgMusic.addEventListener("ended", () => {
            bgMusic.currentTime = 0;
            bgMusic.play();
        });

        // Simpan posisi audio secara berkala
        setInterval(() => {
            if (!bgMusic.paused) {
                sessionStorage.setItem("bgMusicTime", bgMusic.currentTime);
            }
        }, 500);
    }

    // 4. Interaksi Buka Pesan
    if (btnOpenMessage && messageModal) {
        btnOpenMessage.addEventListener("click", () => {
            // Fallback play jika autoplay diblokir browser
            if (bgMusic) {
                bgMusic.play().catch(() => {});
            }

            messageModal.classList.remove("opacity-0", "pointer-events-none");
            messageModal.querySelector("div").classList.remove("scale-95");
            messageModal.querySelector("div").classList.add("scale-100");
        });
    }

    // 5. SPA: Transition to Love Section (no page reload — audio keeps playing)
    if (btnReadDone) {
        btnReadDone.addEventListener("click", () => {
            // Close modal
            messageModal.classList.add("opacity-0", "pointer-events-none");

            setTimeout(() => {
                // Hide hero
                if (heroSection) heroSection.style.display = "none";

                // Show love section
                if (loveSection) {
                    loveSection.classList.remove("section-hidden");
                    loveSection.classList.add("section-visible");
                }

                // Switch body background to love palette
                document.body.classList.remove("page-index");
                document.body.classList.add("page-love");

                // Animate love heading in
                if (loveHeading) {
                    loveHeading.classList.add("animate-wind-in");
                    loveHeading.style.opacity = "1";
                }

                // Fade in subtitle after heading
                setTimeout(() => {
                    if (loveSubtitle) {
                        loveSubtitle.classList.add("animate-fade-in");
                        loveSubtitle.style.opacity = "1";
                    }
                }, 1200);

                // Start hearts in love section
                if (heartContainerLove) {
                    const isMobile = window.innerWidth < 768;
                    const createHeartLove = () => {
                        const heart = document.createElement("i");
                        heart.classList.add("fa-solid", "fa-heart", "floating-heart", "text-pink-400");
                        const randomXStart = Math.random() * 100;
                        const maxSpread = isMobile ? window.innerWidth * 0.3 : 400;
                        const randomXEnd = (Math.random() - 0.5) * maxSpread * 2;
                        const randomScale = isMobile ? Math.random() * 0.6 + 0.6 : Math.random() * 1.2 + 0.8;
                        const randomDuration = isMobile ? Math.random() * 4 + 5 : Math.random() * 5 + 5;
                        const randomRotate = Math.random() * 360;
                        heart.style.left = `${randomXStart}%`;
                        heart.style.setProperty("--x-end", `${randomXEnd}px`);
                        heart.style.setProperty("--scale", randomScale);
                        heart.style.setProperty("--duration", `${randomDuration}s`);
                        heart.style.setProperty("--rotate", `${randomRotate}deg`);
                        if (Math.random() > 0.5) {
                            heart.classList.remove("text-pink-400");
                            heart.classList.add("text-blue-400", "opacity-60");
                        } else {
                            heart.classList.add("opacity-70");
                        }
                        heartContainerLove.appendChild(heart);
                        setTimeout(() => heart.remove(), randomDuration * 1000);
                    };
                    setInterval(createHeartLove, 300);
                }

                // Start stars in love section
                if (starsContainerLove) {
                    const createStarLove = () => {
                        const star = document.createElement("div");
                        star.classList.add("sparkle-star");
                        const size = Math.random() * 6 + 4;
                        star.style.width = `${size}px`;
                        star.style.height = `${size}px`;
                        star.style.top = `${Math.random() * 100}%`;
                        star.style.left = `${Math.random() * 100}%`;
                        const duration = Math.random() * 2 + 1.5;
                        star.style.setProperty("--duration", `${duration}s`);
                        starsContainerLove.appendChild(star);
                        setTimeout(() => star.remove(), duration * 1000);
                    };
                    for (let i = 0; i < 40; i++) {
                        setTimeout(createStarLove, Math.random() * 3000);
                    }
                    setInterval(createStarLove, 150);
                }
            }, 500);
        });
    }
});