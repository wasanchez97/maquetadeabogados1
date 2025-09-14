// Navbar color al scrollear
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animaciones reveal al scrollear
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach((el) => observer.observe(el));

// --- Menú hamburguesa ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Servicios


const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const cards = document.querySelectorAll(".card-servicio");

let index = 0;
const totalCards = cards.length;
const visibleCards = 3;
const maxIndex = totalCards - visibleCards; // 2 con 5 cards

function updateCarousel() {
  // calcular ancho exacto de un paso
  const step = track.scrollWidth / totalCards;

  // clamp: nunca salir de los límites
  index = Math.max(0, Math.min(index, maxIndex));

  // mover
  const offset = index * step;
  track.style.transform = `translateX(-${offset}px)`;

  // activar/desactivar botones
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === maxIndex;
}

// eventos
nextBtn.addEventListener("click", () => {
  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// ajuste en resize
window.addEventListener("resize", updateCarousel);

// inicializar
updateCarousel();






//Testimonios
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");

  // Crear dots según número de slides
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  let index = 0;

  function showSlide(i) {
    slides.forEach((s, j) => {
      s.classList.toggle("active", j === i);
    });
    dots.forEach((d, j) => {
      d.classList.toggle("active", j === i);
    });
    index = i;
  }

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // Flechas (solo desktop, siguen funcionando)
  const leftArrows = document.querySelectorAll(".carousel-arrow.left");
  const rightArrows = document.querySelectorAll(".carousel-arrow.right");

  leftArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      let newIndex = (index - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    });
  });

  rightArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      let newIndex = (index + 1) % slides.length;
      showSlide(newIndex);
    });
  });

  // Swipe en móvil
  let startX = 0;
  let endX = 0;

  document.querySelector(".testimonial-carousel").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.querySelector(".testimonial-carousel").addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      // swipe left → siguiente
      let newIndex = (index + 1) % slides.length;
      showSlide(newIndex);
    } else if (endX - startX > 50) {
      // swipe right → anterior
      let newIndex = (index - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }
  });

  // Autoplay opcional
  setInterval(() => {
    let newIndex = (index + 1) % slides.length;
    showSlide(newIndex);
  }, 6000);
});


// Pasos despliegue una x una 
  document.addEventListener("DOMContentLoaded", () => {
    const detalles = document.querySelectorAll(".lista-pasos details");

    detalles.forEach((det) => {
      det.addEventListener("toggle", () => {
        if (det.open) {
          // Cierra todos los demás cuando uno se abre
          detalles.forEach((other) => {
            if (other !== det) {
              other.removeAttribute("open");
            }
          });
        }
      });
    });
  });

//valores
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".valores-cards");
  const cards = Array.from(track.querySelectorAll(".valor-card"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let index = 0; // siempre inicia en el primer card

  const isMobile = () => window.innerWidth <= 650;

  function scrollToIndex(i, smooth = true) {
    if (!cards[i]) return;
    const card = cards[i];
    // centramos el card en pantalla
    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: smooth ? "smooth" : "auto" });
    index = i;
    updateButtons();
  }

  function updateButtons() {
    if (!isMobile()) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= cards.length - 1;
    prevBtn.style.opacity = prevBtn.disabled ? 0.4 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.4 : 1;
  }

  // Flechas
  nextBtn.addEventListener("click", () => {
    if (index < cards.length - 1) scrollToIndex(index + 1);
  });
  prevBtn.addEventListener("click", () => {
    if (index > 0) scrollToIndex(index - 1);
  });

  // Swipe/manual scroll → actualiza index
  track.addEventListener("scroll", () => {
    if (!isMobile()) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        nearest = i;
      }
    });
    index = nearest;
    updateButtons();
  });

  // Resize
  window.addEventListener("resize", () => {
    if (isMobile()) {
      scrollToIndex(index, false);
    } else {
      track.scrollTo({ left: 0, behavior: "auto" });
      index = 0;
    }
    updateButtons();
  });

  // Inicializar
  setTimeout(() => {
    scrollToIndex(0, false); // siempre arranca en la PRIMER card
    updateButtons();
  }, 100);
});

//Modal de servicios 
  const servicioInput = document.getElementById("servicio");
  const modal = document.getElementById("servicio-modal");
  const cerrarModalBtn = document.querySelector(".cerrar-modal");
  const opciones = document.querySelectorAll(".servicios-lista li");

  // Abrir modal al hacer clic en el input
  servicioInput.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cerrar modal con botón
  cerrarModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Seleccionar servicio
  opciones.forEach(opcion => {
    opcion.addEventListener("click", () => {
      servicioInput.value = opcion.textContent;
      modal.style.display = "none";
    });
  });

  // Cerrar si clic fuera del modal
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });