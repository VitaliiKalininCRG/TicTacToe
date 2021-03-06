import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	StyleSheet,
} from 'react-native';

import PlaygroundContainer from '../components/Playground';
import Player from '../components/player';
import Header from '../components/header';

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingTop: 15,
	},
	HeaderContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	PlayersContainer: {
		flex: 2,
		flexDirection: 'row',
	},
	PlaygroundContainer: {
		flex: 8,
	},
});

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.onMove = this.onMove.bind(this);
		this.onWin = this.onWin.bind(this);
		this.onReset = this.onReset.bind(this);

		this.state = {
			wins: [0, 0],
			active: 0,
			reset: true,
		};
	}

	onMove() {
		this.setState({
			reset: false,
			active: (this.state.active + 1) % 2,
		});
	}

	onReset() {
		Alert.alert(
            'Fair Game',
			'no winner',
			[
				{ text: 'OK',
					onPress: () => {
						this.restart();
					} },
			],
          );
	}

	onWin(id) {
		const winner = this.props.players[id];

		const wins = this.state.wins.slice();
		wins[id] += 1;

		Alert.alert(
            'Winner',
            winner,
			[
				{ text: 'OK',
					onPress: () => {
						this.setState({
							wins,
						});
						this.restart();
					} },
			],
          );
	}

	restart() {
		this.setState({ active: 0, reset: true });
	}

	render() {
		return (
			<View style={styles.MainContainer}>
				<View style={styles.HeaderContainer}>
					<Header />
				</View>
				<View style={styles.PlayersContainer}>
					{
						this.props.players.map((player, index) => (
							<Player
								key={`id_${player}`}
								name={player}
								score={this.state.wins[index]}
								active={this.state.active === index}
							/>
						))
					}
					</View>
				<View style={styles.PlaygroundContainer}>
					<PlaygroundContainer reset={this.state.reset} onReset={this.onReset} active={this.state.active} onMove={this.onMove} onWin={this.onWin} />
				</View>
			</View>
		);
	}
}

Game.defaultProps = {
	players: ['Player 1', 'Player 2'],
};

Game.propTypes = {
	players: React.PropTypes.arrayOf(
		React.PropTypes.string,
	).isRequired,
};

