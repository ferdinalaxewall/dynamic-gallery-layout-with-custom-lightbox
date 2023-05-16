const imageLightbox = document.querySelectorAll(".image-lightbox");

imageLightbox.forEach((image) => {
    image.addEventListener('click', async (event) => {
        const lightbox = generateLightbox(image.getAttribute('src'));
        const addLightboxPromise = new Promise((resolve, reject) => {
            addLightboxToBody(lightbox);
            resolve("Lighbox Successfully Added!");
        });

        addLightboxPromise.then(() => {
            setTimeout(() => {
                showLightbox(lightbox);
            }, 150);
        }).then(() => {
            const imageCloseButton = lightbox.querySelector('.close-button');
            const lightboxContent = lightbox.querySelector('.custom-lightbox-content');

            imageCloseButton.addEventListener('click', (event) => {
                closeLightbox(lightbox);
            });

            lightbox.addEventListener('click', (event) => {
                if(!lightboxContent.contains(event.target)){
                    closeLightbox(lightbox);
                }
            });

            document.addEventListener('keyup', (event) => {
                if(event.key === "Escape" || event.which == 27){
                    closeLightbox(lightbox);
                }
            });
        });
    });
});

function generateLightbox(imageUrl) {
    const mainLightbox = document.createElement('div');
    mainLightbox.classList.add('custom-lightbox');

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('custom-lightbox-content');

    const lightboxCloseButton = document.createElement('button');
    lightboxCloseButton.classList.add('close-button');
    lightboxCloseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"></path></svg>`;
    
    const lightboxContentImage = document.createElement('div');
    lightboxContentImage.classList.add('custom-lightbox-content-image');
    lightboxContentImage.innerHTML = `<img src="${imageUrl}" alt="" />`;

    lightboxContent.appendChild(lightboxCloseButton);
    lightboxContent.appendChild(lightboxContentImage);

    mainLightbox.appendChild(lightboxContent);

    return mainLightbox;
}

function addLightboxToBody(lightbox){
    const body = document.querySelector('body');
    const existsLightbox = body.querySelector('.custom-lightbox');
    if(existsLightbox !== null) existsLightbox.remove();

    body.append(lightbox);
}

function showLightbox(lightbox){
    const body = document.querySelector('body');
    
    const animationPromise = new Promise((resolve, reject) => {
        body.setAttribute('data-lightbox-open', true);
        lightbox.classList.add('show');
        resolve("First Animation Successfully Loaded!");
    });

    animationPromise.then(() => {
        setTimeout(() => {
            const lightboxContentImage = document.querySelector('.custom-lightbox .custom-lightbox-content-image');
            
            lightboxContentImage.classList.add('show');
        }, 100);
    });
}

function closeLightbox(lightbox = null){
    const body = document.querySelector('body');
    if(lightbox == null) lightbox = document.querySelector('.custom-lightbox');

    const animationPromise = new Promise((resolve, reject) => {
        lightbox.classList.remove('show');

        resolve('Lightbox was closed!');
    });

    animationPromise.then(() => {
        setTimeout(() => {
            body.removeAttribute('data-lightbox-open');
        }, 200);
    }).then(() => {
        setTimeout(() => {
            lightbox.remove();
        }, 150);
    });
}