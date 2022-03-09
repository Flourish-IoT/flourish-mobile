const multiplier = 0.08;
const xp = 1500;
const level = Math.floor(Math.sqrt(xp) * multiplier);

console.log({ xp: xp, level });

// GET THE EXACT SCALING
// let currentLevel = -1;
// for (let i = 0; i < 100000; i += 1) {
// 	const levelAtThisXp = Math.floor(Math.sqrt(i) * multiplier);
// 	if (levelAtThisXp != currentLevel) {
// 		currentLevel++;
// 		console.log({ xp: i, level: levelAtThisXp });
// 	}
// }

function xpForLevel(level) {
	return Math.ceil(Math.pow(level / multiplier, 2));
}

console.log(xpForLevel(level));
