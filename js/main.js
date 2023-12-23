document.querySelector('.burger').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.nav').classList.toggle('open');
})




document.addEventListener('DOMContentLoaded', function () {
  const totalPages = 8;
  let currentPage = 1;

  document.getElementById('pagination').addEventListener('click', function(e) {
    if (e.target.closest('.pagination__item--prev')) {
      e.preventDefault();
      currentPage = Math.max(1, currentPage - 1); 
      loadPageContent(currentPage);
      updatePagination();
    } else if (e.target.closest('.pagination__item--next')) {
      e.preventDefault();
      currentPage += 1; 
      loadPageContent(currentPage);
      updatePagination();
    }
  });

  function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const svgOlderPost = '<svg class="pagination__svg--prev" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none"><path opacity="0.4" d="M5 1L1 5L5 9" stroke="#171717" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" /></svg>';

    const svgNextPost = '<svg class="pagination__svg--next" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none"><path opacity="0.4" d="M1 1L5 5L1 9" stroke="#171717" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" /></svg>';

    paginationContainer.innerHTML += `<a class="pagination__item--prev" href="#">${svgOlderPost}<span class="pagination-text">OLDER POST</span></a>`;

    if (currentPage > 3) {
      paginationContainer.innerHTML += `<a class="pagination__item" href="#">1</a>`;
      if (currentPage > 4) {
        paginationContainer.innerHTML += '<span class="pagination__item pagination__item--dots">...</span>';
      }
    }
  
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage === 1 || currentPage === 2) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }
  
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 0 && i <= totalPages) {
        paginationContainer.innerHTML += `<a class="pagination__item ${i === currentPage ? 'active' : ''}" href="#">${i}</a>`;
      }
    }
  
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        paginationContainer.innerHTML += '<span class="pagination__item pagination__item--dots">...</span>';
      }
      paginationContainer.innerHTML += `<a class="pagination__item" href="#">${totalPages}</a>`;
    }

    paginationContainer.innerHTML += `<a class="pagination__item--next" href="#"><span class="pagination-text">NEXT POST</span>${svgNextPost}</a>`;
  }


  function loadPageContent(pageNumber) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.classList.add('loading-content');
  
    fetch(`page-content/page${pageNumber}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        contentContainer.innerHTML = html;
        setTimeout(() => {
          contentContainer.classList.remove('loading-content');
        }, 200);
      })
      .catch(error => {
        console.error('Error loading page:', error);
        contentContainer.classList.remove('loading-content');
      });
  }

  updatePagination();
  loadPageContent(1);

  document.getElementById('pagination').addEventListener('click', function (e) {
    if (e.target.classList.contains('pagination__item') && !e.target.classList.contains('pagination__item--dots')) {
      e.preventDefault();
      currentPage = parseInt(e.target.textContent) || currentPage;
      loadPageContent(currentPage);
      updatePagination();
    }


    if (e.target.closest('.pagination__item--prev')) {
      currentPage = Math.max(1, currentPage - 1);
      loadPageContent(currentPage);
    } else if (e.target.closest('.pagination__item--next')) {
      currentPage = Math.min(totalPages, currentPage + 1);
      loadPageContent(currentPage);
    }
  });
});


let isSidebarOpen = false; // Существующий флаг состояния Sidebar
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.sidebar-toggle').addEventListener('click', toggleSidebar);

document.addEventListener('click', function(e) {
  const sidebar = document.querySelector('.sidebar');
  const button = document.querySelector('.sidebar-toggle');

  if (isSidebarOpen && !sidebar.contains(e.target) && !button.contains(e.target)) {
    closeSidebar();
  }
});

// Обработчики событий касания
document.querySelector('.sidebar').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.sidebar').addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const button = document.querySelector('.sidebar-toggle');
  const elementsToBlur = document.querySelectorAll('header, .hero, .page-content, .instagram, .footer');

  if (isSidebarOpen) {
    closeSidebar();
  } else {
    sidebar.style.right = '0';
    button.style.display = 'none';
    elementsToBlur.forEach(el => el.classList.add('blur'));
    isSidebarOpen = true;
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const button = document.querySelector('.sidebar-toggle');
  const elementsToBlur = document.querySelectorAll('header, .hero, .page-content, .instagram, .footer');

  sidebar.style.right = '-300px';
  button.style.display = 'block';
  elementsToBlur.forEach(el => el.classList.remove('blur'));
  isSidebarOpen = false;
}

function handleSwipeGesture() {
  if (Math.abs(touchEndX - touchStartX) > 75) { // Проверка на достаточное движение для свайпа
    closeSidebar();
  }
}





