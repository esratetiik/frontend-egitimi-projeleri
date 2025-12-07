const sorular = document.querySelectorAll('.sss-soru');

sorular.forEach(soru => {
    soru.addEventListener('click', () => {
        soru.classList.toggle('active');

        const cevap = soru.nextElementSibling;

        if (cevap.style.maxHeight) {
            cevap.style.maxHeight = null;
        } else {
            cevap.style.maxHeight = cevap.scrollHeight + "px";
        } 
    });
});