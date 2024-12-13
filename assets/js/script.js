function handleSearch(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Pindah ke halaman pencarian tanpa query
    window.location.href = "halaman_pencarian.html";
  }
}

function toggleFilterPopup() {
  const filterPopup = document.getElementById("filterPopup");
  filterPopup.classList.toggle("d-none");
}

function applyFilters() {
  // Pindah ke halaman pencarian
  window.location.href = "halaman_pencarian.html";
}
function closeFilterPopup() {
  document.getElementById("filterPopup").classList.add("d-none");
}
let currentMenu = {
  name: "",
  image: "",
  availablePortions: 0,
  price: 0,
  quantity: 1,
};

// Function to open the modal with the selected menu data
function openOrderModal(name, image, availablePortions, price) {
  currentMenu.name = name;
  currentMenu.image = image;
  currentMenu.availablePortions = availablePortions;
  currentMenu.price = price;
  currentMenu.quantity = 1;

  // Update modal content
  document.getElementById("menuName").textContent = name;
  document.getElementById("menuImage").src = image;
  document.getElementById("menuPrice").textContent = price;
  document.getElementById("availablePortions").textContent = availablePortions;
  document.getElementById("quantity").textContent = currentMenu.quantity;

  // Show the modal
  let orderModal = new bootstrap.Modal(document.getElementById("orderModal"));
  orderModal.show();
}

// Increase quantity
function increaseQuantity() {
  if (currentMenu.quantity < currentMenu.availablePortions) {
    currentMenu.quantity++;
    document.getElementById("quantity").textContent = currentMenu.quantity;
  }
}

// Decrease quantity
function decreaseQuantity() {
  if (currentMenu.quantity > 1) {
    currentMenu.quantity--;
    document.getElementById("quantity").textContent = currentMenu.quantity;
  }
}

// Function to add the selected quantity to the cart
function addToCart() {
  alert(
    `${currentMenu.quantity} porsi ${currentMenu.name} telah ditambahkan ke keranjang!`
  );
  // You can implement additional cart functionality here
}

function redirectToShipping() {
  window.location.href = "halaman_pengiriman.html";
}

// Script untuk mengaktifkan tombol checkout
const updateTotals = () => {
  let totalItems = 0;
  let totalPrice = 0;

  document.querySelectorAll(".card").forEach((card) => {
    const price = parseInt(card.dataset.price);
    const quantity = parseInt(card.querySelector(".item-quantity").value);
    const itemTotal = price * quantity;

    card.querySelector(
      ".item-total"
    ).textContent = `Rp${itemTotal.toLocaleString("id-ID")}`;
    totalItems += quantity;
    totalPrice += itemTotal;
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById(
    "total-price"
  ).textContent = `Rp${totalPrice.toLocaleString("id-ID")}`;
};

document.querySelectorAll(".btn-increase").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector(".item-quantity");
    input.value = parseInt(input.value) + 1;
    updateTotals();
  });
});

document.querySelectorAll(".btn-decrease").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector(".item-quantity");
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
      updateTotals();
    }
  });
});

document.querySelectorAll(".item-quantity").forEach((input) => {
  input.addEventListener("input", () => {
    if (parseInt(input.value) < 1) input.value = 1;
    updateTotals();
  });
});

const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const checkoutButton = document.getElementById("checkoutButton");

paymentMethods.forEach((method) => {
  method.addEventListener("change", () => {
    checkoutButton.disabled = false;
  });
});

// Fungsi untuk mengatur jumlah makanan
document.querySelectorAll(".card").forEach((card) => {
  const minusBtn = card.querySelector("button:nth-child(1)");
  const plusBtn = card.querySelector("button:nth-child(3)");
  const quantityInput = card.querySelector('input[type="number"]');
  const priceText = card.querySelector(".card-body p").textContent;
  const totalText = card.querySelector(".card-body span");
  const price = parseInt(priceText.match(/\d+/)[0]);

  minusBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity -= 1;
      quantityInput.value = quantity;
      totalText.textContent = `Rp${quantity * price}`;
      updateTotal();
    }
  });

  plusBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    quantity += 1;
    quantityInput.value = quantity;
    totalText.textContent = `Rp${quantity * price}`;
    updateTotal();
  });
});

// Fungsi untuk menghitung total harga dan barang
function updateTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  document.querySelectorAll(".card").forEach((card) => {
    const quantity = parseInt(card.querySelector('input[type="number"]').value);
    const priceText = card.querySelector(".card-body p").textContent;
    const price = parseInt(priceText.match(/\d+/)[0]);
    totalItems += quantity;
    totalPrice += quantity * price;
  });

  document.querySelector(
    ".total-section .d-flex:nth-child(1) span:last-child"
  ).textContent = totalItems;
  document.querySelector(
    ".total-section .d-flex:nth-child(2) span:last-child"
  ).textContent = `Rp${totalPrice}`;
}

// Popup untuk metode pembayaran Transfer Bank
const transferRadio = document.getElementById("transfer");
transferRadio.addEventListener("change", () => {
  const modalHtml = `
    <div class="modal fade" id="transferModal" tabindex="-1" aria-labelledby="transferModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="transferModalLabel">Informasi Transfer Bank</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Silakan transfer ke rekening berikut:</p>
            <p><strong>Bank BNI: 1234567890</strong></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn custom-btn-primary" data-bs-dismiss="modal">Selesai</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tambahkan modal ke dalam halaman
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const transferModal = new bootstrap.Modal(
    document.getElementById("transferModal")
  );
  transferModal.show();
});

// Fungsi untuk tombol Barang Diterima
function confirmDelivery() {
  window.location.href = "barang_diterima.html"; // Redirect ke halaman terimakasih
}

// Fungsi checkout notifikasi
function checkoutSekarang() {
  window.location.href = "halaman_keranjang.html"; // Redirect ke halaman terimakasih
}

function logout() {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    setTimeout(function () {
      window.location.href = "masuk.html";
    }, 1000); // Mengalihkan ke halaman_utama.html setelah 3 detik
    alert("Anda telah logout.");
  }
}

const stars = document.querySelectorAll(".star");
stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.getAttribute("data-value");
    stars.forEach((s) => {
      s.classList.remove("active");
      if (s.getAttribute("data-value") <= rating) {
        s.classList.add("active");
      }
    });
  });
});

function redirectToProfile() {
  window.location.href = "profil.html";
}

// Fungsi untuk redirection ke papan peringkat
function redirectToRanking() {
  window.location.href = "papan_peringkat.html";
}

// Fungsi untuk redirection ke halaman donasi
function redirectToDonation() {
  window.location.href = "donasi.html";
}

// Fungsi untuk redirection ke halaman pendapatan
function redirectToEarnings() {
  window.location.href = "pendapatan.html";
}

function tambahDonasi() {
  window.location.href = "tambah_donasi.html";
}

function daftarSekarang() {
  window.location.href = "daftar.html";
}

function diskonMakanan() {
  window.location.href = "halaman_pencarian.html";
}

function donasiMakanan() {
  window.location.href = "donasi.html";
}
