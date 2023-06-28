const btnStart = document.getElementById("btnStart");
const canvas = document.getElementById("canvas");
const score = document.getElementById("score");

btnStart.addEventListener("click", () => {
	setTimeout(function () {
		btnStart.style.display = "none";
		canvas.style.display = "initial";
		score.style.display = "initial";
    })
});