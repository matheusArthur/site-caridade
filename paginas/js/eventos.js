function extractYouTubeID(url) {
    const regex = /(?:v=|\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".event-card").forEach(card => {
        const link = card.dataset.youtube;
        const id = extractYouTubeID(link);

        if (id) {
            const thumbnail = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            card.style.backgroundImage = `url('${thumbnail}')`;

            card.addEventListener("click", () => {
                window.open(link, "_blank");
            });
        }
    });
});
