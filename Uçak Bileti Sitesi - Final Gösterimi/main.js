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

document.addEventListener('DOMContentLoaded', function() {
    const resimler = document.querySelectorAll('.galeri-card img');
    resimler.forEach(function(img) {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
});

const iletisimFormu = document.querySelector('.form-kutu form');

if (iletisimFormu) {
    iletisimFormu.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Mesajınız başarıyla gönderilmiştir! En kısa sürede size dönüş yapacağız.");
        this.reset();
    });
}

const odemeBtn = document.getElementById("odemeBtn");
const modal = document.getElementById("odemeModal");
const closeBtn = document.querySelector(".close");
const odemeForm = document.getElementById("odemeForm");

if (odemeBtn) {
    odemeBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

if (odemeForm) {
    odemeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Ödeme başarıyla tamamlandı!");
        modal.style.display = "none";
        odemeForm.reset();
    });
}

// SAHTE BİLETLER
const biletler = [
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "ekonomi",
        fiyat: 1200,
        firma: "THY"
    },
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "ekonomi",
        fiyat: 3500,
        firma: "Pegasus"
    },
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "ekonomi",
        fiyat:"990",
        firma: "AnadoluJet"
    },
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "business",
        fiyat: 3400,
        firma: "Pegasus"
    },
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "ekonomi",
        fiyat: 1500,
        firma: "SunExpress"
    },
    {
        kalkis: "istanbul",
        varis: "ankara",
        sinif: "business",
        fiyat: 2200,
        firma: "THY"
    },
    {
        kalkis: "izmir",
        varis: "antalya",
        sinif: "ekonomi",
        fiyat: 950,
        firma: "SunExpress"
    },
    {
        kalkis: "istanbul",
        varis: "izmir",
        sinif: "ekonomi",
        fiyat: 1100,
        firma: "AJet"
    }
];


const form = document.querySelector(".search-form");
const liste = document.getElementById("bilet-listesi");
const siralama = document.getElementById("sirala");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kalkis = document.getElementById("kalkis").value.toLowerCase();
    const varis = document.getElementById("varis").value.toLowerCase();
    const sinif = document.getElementById("sinif").value;

    let sonuc = biletler.filter(bilet =>
        bilet.kalkis === kalkis &&
        bilet.varis === varis &&
        bilet.sinif === sinif
    );

    siralaVeGoster(sonuc);
});

siralama.addEventListener("change", function () {
    const kartlar = [...liste.children];
    let sonuc = kartlar.map(kart => ({
        element: kart,
        fiyat: Number(kart.dataset.fiyat)
    }));

    if (this.value === "artan") {
        sonuc.sort((a, b) => a.fiyat - b.fiyat);
    } else if (this.value === "azalan") {
        sonuc.sort((a, b) => b.fiyat - a.fiyat);
    }

    liste.innerHTML = "";
    sonuc.forEach(x => liste.appendChild(x.element));
});

function siralaVeGoster(biletler) {
    liste.innerHTML = "";

    if (biletler.length === 0) {
        liste.innerHTML = "<p>Uygun bilet bulunamadı.</p>";
        return;
    }

    biletler.forEach((bilet, index) => {
        const div = document.createElement("div");
        div.className = "ticket";
        div.dataset.fiyat = bilet.fiyat;

        div.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-no">Bilet #${index + 1}</span>
                <span class="onaylandı">${bilet.firma}</span>
            </div>
            <div class="ticket-body">
                <div class="route">
                    <div class="city">
                        <h3>${bilet.kalkis.toUpperCase()}</h3>
                        <p>Kalkış</p>
                    </div>
                    ✈
                    <div class="city">
                        <h3>${bilet.varis.toUpperCase()}</h3>
                        <p>Varış</p>
                    </div>
                </div>
                <div class="price-box">
                    <span class="price-label">Toplam Fiyat</span>
                    <span class="price-amount">${bilet.fiyat} ₺</span>
                </div>
            </div>
        `;

        liste.appendChild(div);
    });
}
