document.addEventListener('DOMContentLoaded', () => {
	const dino = document.querySelector('.dino');
	const grid = document.querySelector('.grid');
	const body = document.querySelector('body');
	const alert = document.getElementById('alert');

	let jumping = false;
	let gravity = 0.9;
	let gameo = false;
	let dinopy = 0;

	document.addEventListener('keyup', jumpcontrol);

	function jumpcontrol(e) {
		if(e.keyCode == 32){
			if(!jumping){
				jumping = true;
				jump()
			}
		}
	}
	
	function jump() {
		let jumpHeight = 300; // Altura máxima do pulo
		let jumpInterval = 10; // Intervalo de tempo do pulo
		let jumpSpeed = 5; // Velocidade do pulo
	
		let timerId = setInterval(function () {
			if (jumpHeight === 0) {
				clearInterval(timerId);
				let fallTimerId = setInterval(function () {
					if (dinopy === 0) {
						clearInterval(fallTimerId);
						jumping = false;
					}
					dinopy -= jumpSpeed;
					if (dinopy < 0) {
						dinopy = 0;
					}
					dino.style.bottom = dinopy + 'px';
				}, jumpInterval);
			}
			dinopy += jumpSpeed;
			if (dinopy > jumpHeight) {
				dinopy = jumpHeight;
			}
			dino.style.bottom = dinopy + 'px';
			jumpHeight -= jumpSpeed;
		}, jumpInterval);
	}

	function gerarobst() {
		let randomTime = Math.random()*4000;
		let obstaclepx = 1000;
		const obstacle = document.createElement('div');

		if(!gameo) obstacle.classList.add('obstacle');
		grid.appendChild(obstacle);
		obstacle.style.left = obstaclepx + 'px'

		let timerId = setInterval(function() {

			if(obstaclepx > 0 && obstaclepx < 60 && dinopy < 60) {
				clearInterval(timerId);
				alert.innerHTML = 'Fim de Jogo!'
				gameo = true;
				body.removeChild(body.firstChild)
				while(grid.firstChild) {
					grid.removeChild(grid.lastChild)
				}
			}

			obstaclepx -= 10;
			obstacle.style.left = obstaclepx + 'px';
		}, 20);

		if(!gameo) setTimeout(gerarobst, randomTime)
	}
	gerarobst() 
})