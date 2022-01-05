export const custom = {
    log: function(msg, textContainerId) {
        document.querySelector(`#${textContainerId}`).insertAdjacentHTML('beforeend', `
            <p>${msg}</p>
        `);
    }
}