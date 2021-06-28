document.addEventListener("DOMContentLoaded", function () {
  crearGaleria();
  scrollNav();
  navegacionFija();
});

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("img");
    imagen.src = `build/img/thumb/${i}.webp`;

    imagen.dataset.imagenId = i;
    imagen.onclick = mostrarImagen;

    const lista = document.createElement("li");
    lista.appendChild(imagen);

    galeria.appendChild(lista);
  }
}

function mostrarImagen(e) {
  const id = parseInt(e.target.dataset.imagenId);

  const imagen = document.createElement("img");

  imagen.src = `build/img/grande/${id}.webp`;

  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  overlay.onclick = () => {
    overlay.remove();
  };

  const cerrarImagen = document.createElement("p");
  cerrarImagen.textContent = "x";
  cerrarImagen.classList.add("btn-cerrar");
  overlay.appendChild(cerrarImagen);

  cerrarImagen.onclick = () => {
    overlay.remove();
  };

  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();

      const seccion = document.querySelector(e.target.attributes.href.value);

      seccion.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function navegacionFija() {
  const barra = document.querySelector(".header");

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      barra.classList.remove("fijo");
    } else {
      barra.classList.add("fijo");
    }
  });

  observer.observe(document.querySelector(".sobre-festival"));
}
