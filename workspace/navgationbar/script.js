const itemEls = document.querySelectorAll(".item");

itemEls.forEach((event, index) => {
    event.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        event.classList.add("active");

        const dotEl = document.querySelector(".dot");
        dotEl.style.left = `${index*100 + 80}px`
    })
});