// Ambil elemen tombol burger dan menu mobile
const burgerBtn = document.getElementById("burger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const burgerIcon = document.getElementById("burger-icon");
let menuOpen = false; // Status menu

// Event klik tombol burger
burgerBtn.addEventListener("click", () => {
  menuOpen = !menuOpen; // Toggle status menu
  mobileMenu.classList.toggle("show"); // Tampilkan/sembunyikan menu mobile

  // Ganti ikon burger <-> close
  burgerIcon.innerHTML = menuOpen
    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />';
});
