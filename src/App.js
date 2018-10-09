import React, { Component } from 'react';
import './App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Photo from './components/photo';
import getPhotos from './services/flickrPublicPhotosService';

class App extends Component {
  // style for the cards to make them appear clickable
  pointer = {
      cursor: 'pointer'
  }
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      cols: 1
    };
  }

  // dynamically sets the number of columns based on horizontal resolution
  getCols() {
    if (window.innerWidth > 1440) {
      this.setState({cols: 5});
    } else if (window.innerWidth > 1080) {
      this.setState({cols: 4});
    } else if (window.innerWidth > 800) {
      this.setState({cols: 3});
    } else if (window.innerWidth > 380) {
      this.setState({cols: 2});
    } else {
      this.setState({cols: 1});
    }
  }

  // set initial column count
  componentWillMount() {
    this.getCols();
  }

  componentDidMount() {
    // each time the window is resized, recalculate number of columns
    window.addEventListener("resize", this.getCols.bind(this));

    // call getPhotos in flickr service to retrieve photos from API
    getPhotos().then(
      json => { 
        this.setState({
          items: json.items,
          isLoaded: true
        });
      }
    );
  }

  // remove the listener for the resize event before component is unmounted
  componentWillUnmount() {
    window.removeEventListener("resize", this.getCols);
  }

  // opens a new tab and goes to the flickr page for the photo
  handlePhotoClick(link) {
    window.open(link, '_blank');
  }

  render() {
    // destructure the values of properties in this.state into their own vars
    const {error, isLoaded, items, cols} = this.state;

    // handle if there are errors or the retrieval hasn't finished yet
    if (error) {
      return <div>Error!</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        // using material UI components for the generation of the cards
        <GridList cellHeight={270} cols={cols}>
          <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }}>
            <ListSubheader component="div">Flickr Public Photos of Kittens</ListSubheader>
          </GridListTile>
          {items.map(item => 
            <GridListTile style={this.pointer} onClick={() => this.handlePhotoClick(item.link)} key={item.link}>
              <Photo item={item}></Photo>
            </GridListTile>
          )}
        </GridList>
      );
    }
  }
}

export default App;
