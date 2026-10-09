const body = document.body;
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const modalLabel = document.querySelector(".modal-label");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const cards = document.querySelectorAll(".gallery-card");
const tabs = document.querySelectorAll(".tab");

function openModal(card) {
    modalImage.src = card.dataset.image;
    modalImage.alt = card.querySelector("img").alt;
    modalLabel.textContent = card.querySelector(".card-label").textContent;
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modal.hidden = false;
    body.classList.add("modal-open");
    modal.querySelector(".close-button").focus();
}

function closeModal() {
    modal.hidden = true;
    body.classList.remove("modal-open");
    modalImage.src = "";
}

function filterGallery(category) {
    cards.forEach((card) => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !shouldShow);
    });
}

cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
});

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((item) => {
            item.classList.remove("is-active");
            item.setAttribute("aria-pressed", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-pressed", "true");
        filterGallery(tab.dataset.filter);
    });
});

modal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        closeModal();
    }
});
