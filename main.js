const ENV = (function () {
	const unity = 5;
	const canvasSide = 400;
	const canvas = document.querySelector("canvas");
	canvas.width = canvasSide * devicePixelRatio;
	canvas.height = canvasSide * devicePixelRatio;

	const ctx = canvas.getContext("2d");
	ctx.scale(devicePixelRatio, devicePixelRatio);

	function paint(line, column, colour) {
		ctx.fillStyle = colour ? "black" : "white";
		ctx.fillRect((column - 1) * unity,
					 (line - 1) * unity,
					 unity,
					 unity);
	}

	const lines = canvasSide / unity;
	const columns = canvasSide / unity;
	function index(line, column) {
		const l = line - 1;
		const c = column - 1;
		return (l * columns) + c;
	}

	const env = {};
	// env.sick = [];
	env.population = Array(lines * columns);
	function spawn(line, column) {
		env.population[index(line, column)] = 1;
		paint(line, column, true);
	}

	function kill(line, column) {
		env.population[index(line, column)] = 0;
		paint(line, column);
	}

	function evolve() {
		const pastPopullation = env.population.slice(0);
		// const sick = [];

		let line, lend, column, cend;
		cend = columns + 1;
		lend = lines + 1;
		line = 1;
		while (line < lend) {
			column = 1;
			while (column < cend) {
				const i = index(line, column);
				const alive = pastPopullation[i];
				let livingNeighbours = 0;
				if (line === 1) {
					// no up neighbours
					if (column === 1) {
						// no left neighbours
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right
						//corners
						livingNeighbours += pastPopullation[index(line + 1, column + 1)] ? 1 : 0; // downright
					}
					else if (column === columns) {
						// no right neighbours
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						//corners
						livingNeighbours += pastPopullation[index(line + 1, column - 1)] ? 1 : 0; // downleft
					}
					else {
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right

						//corners
						livingNeighbours += pastPopullation[index(line + 1, column + 1)] ? 1 : 0; // downright
						livingNeighbours += pastPopullation[index(line + 1, column - 1)] ? 1 : 0; // downleft
					}
				}
				else if (line === lines) {
					// no down neighbours
					if (column === 1) {
						// no left neighbours
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right
						//corners
						livingNeighbours += pastPopullation[index(line - 1, column + 1)] ? 1 : 0; // upright
					}
					else if (column === columns) {
						// no right neighbours
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						//corners
						// WAS C+1
						livingNeighbours += pastPopullation[index(line - 1, column - 1)] ? 1 : 0; // upleft
					}
					else {
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right
						//corners
						livingNeighbours += pastPopullation[index(line - 1, column + 1)] ? 1 : 0; // upright
						// WAS L+1
						livingNeighbours += pastPopullation[index(line - 1, column - 1)] ? 1 : 0; // upleft
					}
				}
				else {
					if (column === 1) {
						// no left neighbours
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right
						//corners
						livingNeighbours += pastPopullation[index(line - 1, column + 1)] ? 1 : 0; // upright
						livingNeighbours += pastPopullation[index(line + 1, column + 1)] ? 1 : 0; // downright
					}
					else if (column === columns) {
						// no right neighbours
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						//corners
						livingNeighbours += pastPopullation[index(line - 1, column - 1)] ? 1 : 0; // upleft

						livingNeighbours += pastPopullation[index(line + 1, column - 1)] ? 1 : 0; // downleft
					}
					else {
						livingNeighbours += pastPopullation[index(line - 1, column)] ? 1 : 0; // up
						livingNeighbours += pastPopullation[index(line + 1, column)] ? 1 : 0; // down
						livingNeighbours += pastPopullation[index(line, column - 1)] ? 1 : 0; // left
						livingNeighbours += pastPopullation[index(line, column + 1)] ? 1 : 0; // right

						//corners
						livingNeighbours += pastPopullation[index(line - 1, column - 1)] ? 1 : 0; // upleft
						livingNeighbours += pastPopullation[index(line - 1, column + 1)] ? 1 : 0; // upright
						livingNeighbours += pastPopullation[index(line + 1, column + 1)] ? 1 : 0; // downright
						livingNeighbours += pastPopullation[index(line + 1, column - 1)] ? 1 : 0; // downleft
					}
				}

				if (alive && (livingNeighbours < 2 || livingNeighbours > 3)) {
					kill(line, column);
					// sick.push(line, column); // will die in the next gen
				} else if (!alive && livingNeighbours === 3) {
					spawn(line, column);
				}
				column += 1;
			}
			line += 1;
		}

		// while (env.sick.length) {
		// 	// kill the sick from previous generation
		// 	const l = env.sick.shift();
		// 	const c = env.sick.shift();
		// 	kill(l, c);
		// }
		// env.sick = sick;

		return;
	}

	canvas.addEventListener("mousemove", function (e) {
		if (e.ctrlKey) {
			const column = Math.floor(e.clientX / unity) + 1;
			const line = Math.floor(e.clientY / unity) + 1;
			spawn(line, column);
		}
		if (e.altKey) {
			const column = Math.floor(e.clientX / unity) + 1;
			const line = Math.floor(e.clientY / unity) + 1;
			kill(line, column);
		}
	});

	env.evolve = evolve;
	return env;
}());


window.onload = function () {
	const acc = document.querySelector("#acc");
	const sdn = document.querySelector("#sdn");
	const tick = document.querySelector("#tick");
	const stop = document.querySelector("#stop");
	stop.disabled = true;

	let factor = 1;

	acc.addEventListener("change", function (e) {
		factor = 1 / parseInt(e.target.value);
		sdn.value = 1;
	});

	sdn.addEventListener("change", function (e) {
		factor = parseInt(e.target.value);
		acc.value = 1;
	});

	const duration = 1000;
	let idInterval;
	tick.addEventListener("click", function (e) {
		stop.disabled = false;
		tick.disabled = true;

		const int = Math.round(duration * factor);
		idInterval = setInterval(function () {
			ENV.evolve();
		}, int);
	});

	stop.addEventListener("click", function (e) {
		tick.disabled = false;
		stop.disabled = true;

		clearInterval(idInterval);
	});
}
