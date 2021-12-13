export default function changeProgress() {
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #fff ${this.value}%, white 100%)`;
}