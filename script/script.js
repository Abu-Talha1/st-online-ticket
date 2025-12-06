const cols = document.getElementById("cols");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const discountAmount = document.getElementById("discountAmount");
const grandTotal = document.getElementById("grandTotal");

const seatPrice = 550;
let selectedSeats = [];
let discount = 0;

const letters = "ABCDEFGHIJ".split("");

// Generate 10 columns with 4 seats each
letters.forEach(letter => {
    const seatRow = document.createElement("div");
    seatRow.className = "flex gap-3";

    for (let r = 1; r <= 4; r++) {
        const seat = document.createElement("div");
        const seatId = `${letter}${r}`;

        seat.className = `
            w-12 h-12 flex items-center justify-center font-semibold
            bg-gray-100 border border-gray-300 rounded-lg shadow
            cursor-pointer transition
        `;

        seat.textContent = seatId;

        seat.onclick = () => {
            const isSelected = selectedSeats.includes(seatId);

            if (!isSelected) {
                if (selectedSeats.length >= 4) {
                    alert("You can select maximum 4 seats!");
                    return;
                }

                selectedSeats.push(seatId);
                seat.classList.remove("bg-gray-100");
                seat.classList.add("bg-green-300");

            } else {
                selectedSeats = selectedSeats.filter(s => s !== seatId);
                seat.classList.remove("bg-green-300");
                seat.classList.add("bg-gray-100");
            }

            updateCart();
        };

        seatRow.appendChild(seat);
    }

    cols.appendChild(seatRow);
});

// Update cart and totals
function updateCart() {
    cartItems.innerHTML = "";

    if (selectedSeats.length === 0) {
        cartItems.innerHTML = `<p class="text-sm text-gray-500 text-center">No seats selected</p>`;
    } else {
        selectedSeats.forEach(s => {
            const item = document.createElement("div");
            item.className = "flex justify-around items-center p-2 rounded text-sm font-semibold";

            item.innerHTML = `
                <span>${s}</span>
                <span class="text-gray-600">Business</span>
                <span>${seatPrice} TK</span>
            `;

            cartItems.appendChild(item);
        });
    }

    const total = selectedSeats.length * seatPrice;
    totalPrice.textContent = total + " TK";

    const discountTK = Math.floor(total * discount);
    discountAmount.textContent = discountTK + " TK";

    const finalTotal = total - discountTK;
    grandTotal.textContent = finalTotal + " TK";
}

// Voucher system
function applyVoucher() {
    const code = document.getElementById("voucherInput").value.trim().toUpperCase();

    if (code === "NEW15") {
        discount = 0.15;
    } else if (code === "COUPLE20") {
        discount = 0.20;
    } else {
        discount = 0;
        alert("Invalid voucher code!");
    }

    updateCart();
} 

// success messege 
function nextToSuccess (){
    const inputNumber = document.getElementById("input-id");
    const nextBtn = document.getElementById('next-btn');
    const busSitDiv = document.getElementById('bus-sit-div');
    const successDiv = document.getElementById('Success-div');
    inputNumber.oninput = () => {
        nextBtn.classList.toggle("hidden", inputNumber.value.length !== 11);
    };
    busSitDiv.classList.add("hidden");
    successDiv.classList.remove("hidden");
}