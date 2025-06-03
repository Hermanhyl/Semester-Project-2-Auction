/**
 * Creates and appends a styled footer element to the document body.
 * The footer contains copyright information and is styled to appear at the bottom of the page.
 *
 * @function
 */
export function createFooter() {
    const footer = document.createElement('footer');
    footer.style.backgroundColor = '#2B2D42'; 
    footer.style.color = '#FFFFFF'; 
    footer.style.padding = '1rem';
    footer.style.textAlign = 'center';
    footer.style.fontSize = '14px';
    footer.style.position = 'absolut';
    footer.style.bottom = '0';
    footer.style.width = '100%';

    footer.textContent = '© 2024 All rights reserved.';

    document.body.appendChild(footer);
}

