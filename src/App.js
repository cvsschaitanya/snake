import React, { Component } from "react";
import Snake from "./components/snake";

function getXY(loc, consts) {
	return {
		X: Math.floor(loc / consts.height),
		Y: loc % consts.height,
	};
}

class App extends Component {
	constructor(props) {
		super(props);
		window.addEventListener("keydown", (event) => {
			if (event.code === "ArrowUp") {
				console.log("up arrow");
				this.start(this.UP);
			} else if (event.code === "ArrowDown") {
				console.log("down arrow");
				this.start(this.DOWN);
			} else if (event.code === "ArrowLeft") {
				console.log("left arrow");
				this.start(this.LEFT);
			} else if (event.code === "ArrowRight") {
				console.log("right arrow");
				this.start(this.RIGHT);
			}
		});
	}

	state = {
		snake: [2025, 2024, 2023, 2022, 2021],
		snack: 2040,
		timeInt: 50,
	};
	interval = setInterval(function () {}, this.timeInt);

	consts = {
		unit: 10,
		width: 80,
		height: 50,
	};

	render() {
		return (
			<React.Fragment>
				<div
					style={{
						boxSizing: "content-box",
						position: "relative",
						border: 2 * this.consts.unit + "px solid black",
						// width: 800,
						width: this.consts.width * this.consts.unit,
						height: this.consts.height * this.consts.unit,
					}}
				>
					<Snake
						snake={this.state.snake}
						consts={this.consts}
					></Snake>

					<div
						style={{
							position: "absolute",
							left:
								getXY(this.state.snack, this.consts).X *
								this.consts.unit,
							top:
								getXY(this.state.snack, this.consts).Y *
								this.consts.unit,
							width: 1 * this.consts.unit,
							height: 1 * this.consts.unit,
							backgroundColor: "blue",
						}}
					></div>
				</div>

				<button
					id="up-button"
					className="btn btn-primary m-2"
					onClick={() => {
						this.start(this.UP);
					}}
				>
					UP
				</button>
				<button
					id="right-button"
					className="btn btn-primary m-2"
					onClick={() => {
						this.start(this.RIGHT);
					}}
				>
					RIGHT
				</button>
				<button
					id="down-button"
					className="btn btn-primary m-2"
					onClick={() => {
						this.start(this.DOWN);
					}}
				>
					DOWN
				</button>
				<button
					id="left-button"
					className="btn btn-primary m-2"
					onClick={() => {
						this.start(this.LEFT);
					}}
				>
					LEFT
				</button>
			</React.Fragment>
		);
	}

	move(inc) {
		let arr = [this.state.snake[0] + inc];
		this.state.snake.forEach((loc) => {
			arr.push(loc);
		});
		if (arr[0] === this.state.snack) {
			let newsnack = Math.floor(
				Math.random() * this.consts.height * this.consts.width
			);
			this.setState({ snake: arr, snack: newsnack });
		} else {
			arr.pop();
			this.setState({ snake: arr });
		}
		console.log(arr);
	}

	UP = () => {
		if (getXY(this.state.snake[0], this.consts).Y === 0) this.hit();
		this.move(-1);
	};

	RIGHT = () => {
		if (getXY(this.state.snake[0], this.consts).X === this.consts.width - 1)
			this.hit();
		this.move(this.consts.height);
	};

	DOWN = () => {
		if (
			getXY(this.state.snake[0], this.consts).Y ===
			this.consts.height - 1
		)
			this.hit();
		this.move(1);
	};

	LEFT = () => {
		if (getXY(this.state.snake[0], this.consts).X === 0) this.hit();
		this.move(-this.consts.height);
	};

	start = (func) => {
		if (this.blockedFunc === func || this.runningFunc === func) return;

		console.log(func);
		clearInterval(this.interval);
		this.interval = setInterval(func, this.state.timeInt);

		if (func === this.UP) {
			this.blockedFunc = this.DOWN;
			this.runningFunc = this.UP;
		} else if (func === this.DOWN) {
			this.blockedFunc = this.UP;
			this.runningFunc = this.DOWN;
		} else if (func === this.LEFT) {
			this.blockedFunc = this.RIGHT;
			this.runningFunc = this.LEFT;
		} else if (func === this.RIGHT) {
			this.blockedFunc = this.LEFT;
			this.runningFunc = this.RIGHT;
		}

		// func();
	};

	hit = () => {
		alert(`You lost!\nScore = ${this.score}\nTime = ${this.time}`);
		this.setState({
			snake: [2025, 2024, 2023, 2022, 2021, 2020],
			snack: 2040,
		});
		clearInterval(this.interval);
	};

	blockedFunc = this.UP;
	runningFunc = null;
}
export default App;
