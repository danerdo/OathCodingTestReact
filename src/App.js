import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import * as moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      cols: 1
    };
  }

  // style for the cards to make them appear clickable
  pointer = {
    cursor: 'pointer'
  }

  // dynamically sets the number of columns based on horizontal resolution
  getCols() {
    if (window.innerWidth > 1440) {
      this.setState({cols: 5});
    } else if (window.innerWidth > 1080) {
      this.setState({cols: 4});
    } else if (window.innerWidth > 800) {
      this.setState({cols: 3});
    } else if (window.innerWidth > 500) {
      this.setState({cols: 2});
    } else if (window.innerWidth > 160) {
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

    // fetch pictures using jsonp
    fetchJsonp(
      'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=kittens', {
        jsonpCallbackFunction: 'jsonFlickrFeed'
      }
    ).then(response => response.json()).then(
      json => { 
        this.setState({
          items: json.items,
          isLoaded: true
        });
      }
    ).catch(
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  // remove the listener for the resize event before component is unmounted
  componentWillUnmount() {
    window.removeEventListener("resize", this.getCols);
  }

  // opens a new tab and goes to the flickr page for the photo
  goToFlickrPage(link) {
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
          {items.map(item => (
            <GridListTile style={this.pointer} key={item.link} onClick={() => this.goToFlickrPage(item.link)}>
              <img src={item.media.m} alt={item.title} />
              <GridListTileBar
                title={item.title}
                subtitle={<span>{item.author}</span>}
                titlePosition="top"
              />
              <GridListTileBar
                title={<span>Published on {moment(item.published, moment.ISO_8601).format('MMM D, YYYY')}</span>}
                subtitle={<span>{item.tags}</span>}
                titlePosition="bottom"
              />
            </GridListTile>
          ))}
        </GridList>
      );
    }
  }
}

export default App;
