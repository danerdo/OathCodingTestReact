import fetchJsonp from 'fetch-jsonp';

const flickrKittensUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=kittens';

function getPhotos() {
    // fetch pictures using jsonp
    return fetchJsonp(flickrKittensUrl, {jsonpCallbackFunction: 'jsonFlickrFeed'}).then(
        response => response.json()
    ).catch(
        error => console.log('Error!', error)
    );
}

export default getPhotos;