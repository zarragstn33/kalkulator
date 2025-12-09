//script.js
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

// Variabel untuk menyimpan keadaan kalkulator
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Fungsi untuk melakukan perhitungan
function calculate(n1, operator, n2) {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);

  if (operator === '+') return num1 + num2;
  if (operator === '-') return num1 - num2;
  if (operator === '*') return num1 * num2;
  if (operator === '/') return num1 / num2;

  return n2; // Mengembalikan nilai kedua jika operator tidak valid
}

// Fungsi untuk menangani input angka dan desimal
function inputDigit(digit) {
  if (waitingForSecondValue) {
      display.value = digit;
      waitingForSecondValue = false;
  } else {
     // Mencegah angka 0 di awal kecuali itu desimal
     display.value = display.value === '0' ? digit : display.value + digit;
  }
}

// Fungsi untuk menangani input desimal
function inputDecimal(dot) {
  if (waitingForSecondValue) {
      display.value = '0.';
      waitingForSecondValue = false;
      return;
  }
  // Hanya tambahkan desimal jika belum ada
  if (!display.value.includes(dot)) {
      display.value += dot;
  }
}

// Fungsi untuk menangani operator
function handleOperator(nextOperator) {
  const inputValue = display.value;

  if (firstValue === null) {
      // Menyimpan nilai pertama dan operator
      firstValue = inputValue;
  } else if (operator) {
     // Melakukan perhitungan jika operator sebelumnya sudah ada
     const result = calculate(firstValue, operator, inputValue);
     display.value = String(result);
     firstValue = String(result); // Hasil menjadi nilai pertama untuk operasi berikutnya
  }

  waitingForSecondValue = true;
  operator = nextOperator; // Menyimpan operator baru
}

// Fungsi untuk mereset kalkulator
function resetCalculator() {
  display.value = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}

// Penanganan Event Klik Tombol
keys.addEventListener('click', (event) => {
  const { target } = event;
  const value = target.value;

// Pastikan yang diklik adalah tombol
if (!target.matches('button')) {
    return;
}

// Menggunakan switch/case untuk memproses aksi berdasarkan nilai tombol
switch (value) {
  case '+':
  case '-':
  case '*':
  case '/':
    handleOperator(value);
    break;
  case '=':
    // Khusus untuk tombol '=', kita pastikan ada operator
    if (operator) {
        handleOperator(value);
        operator = null; // Setelah hitung, operator direset
    }
    break;
case '.':
  inputDecimal(value);
  break;
case 'all-clear':
  resetCalculator();
  break;
default:
  // Kasus default untuk angka
  if (Number.isInteger(parseFloat(value))) {
      inputDigit(value);
  }
 }
});

// Inisialisasi tampilan
resetCalculator();
