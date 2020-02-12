import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fishes: {},
            order: {}
        };
    }
    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const newFishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes valuable
        newFishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({
            fishes: newFishes
        });
    }
    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />       
            </div>
        )
    }
}

export default App;