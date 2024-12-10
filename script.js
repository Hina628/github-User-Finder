function getUser() {
    const mainContent = document.getElementById('main-content');
    const username = prompt('Write username here...');
    
    if (!username) {
      mainContent.innerHTML = `<p class="error-message">User not found</p>`;
      return;
    }
  
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((user) => {
        mainContent.innerHTML = `
          <div class="user-card">
            <img src="${user.avatar_url}" alt="Avatar">
            <h2>${user.name || 'No Name'}</h2>
            <p>${user.bio || 'No bio available'}</p>
            <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
          </div>
        `;
      })
      .catch((error) => {
        mainContent.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
      });
  }
  
  document.getElementById('fetch-user-btn').addEventListener('click', getUser);
  