const searchForm = document.querySelector('#search-form');
const usernameInput = document.querySelector('#username-input');
const loading = document.querySelector('#loading');
const profileContainer = document.querySelector('#profile-container');

const getGitHubProfile = async (username) => {
    try {
        profileContainer.innerHTML = '';
        loading.style.display = 'block';

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("User tidak ditemukan");
            }
            throw new Error("HTTP Error! Status: " + response.status);
        }

        const data = await response.json();

        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.login}" width="100">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || 'Tidak ada bio'}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">Lihat Profil GitHub</a>
        `;

        profileContainer.appendChild(card);

    } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        profileContainer.innerHTML = `<p class="error">${error.message}</p>`;
    } finally {
        loading.style.display = 'none';
    }
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    getGitHubProfile(username);
});