document.addEventListener("DOMContentLoaded", function () {

    console.log("ALIZA'FEST - Galerie photos");

    /* =====================================================
       ELEMENTS HTML
    ===================================================== */

    const photoWall =
        document.getElementById("photo-wall");

    const lightbox =
        document.getElementById("photo-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const closeButton =
        document.getElementById("lightbox-close");

    const previousButton =
        document.getElementById("lightbox-prev");

    const nextButton =
        document.getElementById("lightbox-next");

    const counter =
        document.getElementById("lightbox-counter");


    /* =====================================================
       VERIFICATION
    ===================================================== */

    if (!photoWall) {

        console.error(
            "ERREUR : photo-wall introuvable"
        );

        return;
    }


    if (!lightbox) {

        console.error(
            "ERREUR : photo-lightbox introuvable"
        );

        return;
    }


    /* =====================================================
       LISTE DES PHOTOS
    ===================================================== */

    const photos = [

        "image/photos/photos (1).jpg",
        "image/photos/photos (2).jpg",
        "image/photos/photos (3).jpg",
        "image/photos/photos (4).jpg",
        "image/photos/photos (5).jpg",
        "image/photos/photos (6).jpg",
        "image/photos/photos (7).jpg",
        "image/photos/photos (8).jpg",
        "image/photos/photos (9).jpg",
        "image/photos/photos (10).jpg",
        "image/photos/photos (11).jpg",
        "image/photos/photos (12).jpg",
        "image/photos/photos (13).jpg",
        "image/photos/photos (14).jpg",
        "image/photos/photos (15).jpg",
        "image/photos/photos (16).jpg",
        "image/photos/photos (17).jpg",
        "image/photos/photos (18).jpg",
        "image/photos/photos (19).jpg",
        "image/photos/photos (20).jpg"
    ];


    /* =====================================================
       PHOTO ACTUELLE
    ===================================================== */

    let currentPhoto = 0;


    /* =====================================================
       CREATION DES PHOTOS
    ===================================================== */

    photos.forEach(function (photo, index) {

        const item =
            document.createElement("div");

        item.className =
            "photo-item";


        const image =
            document.createElement("img");


        image.src =
            photo;


        image.alt =
            "Photo de l'Aliza'Fest " +
            (index + 1);


        image.loading =
            "lazy";


        /* ================================================
           PHOTO CHARGEE
        ================================================= */

        image.addEventListener(
            "load",
            function () {

                console.log(
                    "Photo chargée :",
                    photo
                );

            }
        );


        /* ================================================
           ERREUR PHOTO
        ================================================= */

        image.addEventListener(
            "error",
            function () {

                console.error(
                    "Photo introuvable :",
                    photo
                );


                item.innerHTML =
                    "<div class=\"photos-error\">" +

                    "Photo introuvable" +

                    "<small>" +
                    photo +
                    "</small>" +

                    "</div>";

            }
        );


        /* ================================================
           CLIC
        ================================================= */

        item.addEventListener(
            "click",
            function () {

                openLightbox(index);

            }
        );


        item.appendChild(image);

        photoWall.appendChild(item);

    });


    /* =====================================================
       SUPPRIMER "CHARGEMENT"
    ===================================================== */

    const loading =
        photoWall.querySelector(
            ".photos-loading"
        );


    if (loading) {

        loading.remove();

    }


    /* =====================================================
       OUVRIR LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        currentPhoto = index;

        updateLightbox();

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       METTRE A JOUR LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        lightboxImage.src =
            photos[currentPhoto];


        lightboxImage.alt =
            "Photo de l'Aliza'Fest " +
            (currentPhoto + 1);


        if (counter) {

            counter.textContent =
                (currentPhoto + 1) +
                " / " +
                photos.length;

        }

    }


    /* =====================================================
       FERMER
    ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       PHOTO PRECEDENTE
    ===================================================== */

    function previousPhoto() {

        currentPhoto--;

        if (currentPhoto < 0) {

            currentPhoto =
                photos.length - 1;

        }

        updateLightbox();

    }


    /* =====================================================
       PHOTO SUIVANTE
    ===================================================== */

    function nextPhoto() {

        currentPhoto++;

        if (
            currentPhoto >=
            photos.length
        ) {

            currentPhoto = 0;

        }

        updateLightbox();

    }


    /* =====================================================
       BOUTONS
    ===================================================== */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    previousButton.addEventListener(
        "click",
        previousPhoto
    );


    nextButton.addEventListener(
        "click",
        nextPhoto
    );


    /* =====================================================
       CLIQUER A COTE DE L'IMAGE
    ===================================================== */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       CLAVIER
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousPhoto();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextPhoto();

            }

        }
    );


    /* =====================================================
       SWIPE TELEPHONE
    ===================================================== */

    let touchStartX = 0;


    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                .screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            const touchEndX =
                event.changedTouches[0]
                .screenX;


            const difference =
                touchEndX -
                touchStartX;


            if (
                Math.abs(difference) <
                50
            ) {

                return;

            }


            if (
                difference > 0
            ) {

                previousPhoto();

            } else {

                nextPhoto();

            }

        },
        {
            passive: true
        }
    );


    console.log(
        "Galerie créée avec " +
        photos.length +
        " photos"
    );

});

