const btnStart = document.getElementById("btnStart");
const canvas = document.getElementById("canvas");

btnStart.addEventListener("click", () => {
	setTimeout(function () {
		btnStart.style.display = "none";
		canvas.style.display = "initial";
    })
});