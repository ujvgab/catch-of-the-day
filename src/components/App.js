import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate () {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
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

    updateFish = (key, updatedFish) => {
        //1. take a copy of the current state
        const fishes = {...this.state.fishes};
        //2. Update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        //1. Take a copy of state
        const fishes = {...this.state.fishes};
        //2. Update a state (remove an item from it)
        fishes[key] = null;
        //3. Update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
        console.log(key);
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                            (<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                addFish={this.addFish} 
                updateFish={this.updateFish} 
                deleteFish={this.deleteFish} 
                loadSampleFishes={this.loadSampleFishes} 
                fishes={this.state.fishes}
                storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;