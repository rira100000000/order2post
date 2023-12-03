import axios from 'axios';

export const csrfTokenCheck = () => {
  const csrfTokenElement = document.querySelector('#csrf-token');
  if (csrfTokenElement) {
    const csrfToken = csrfTokenElement.getAttribute('data-token');
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  } else {
    console.error('CSRF Token element not found');
  }
};
