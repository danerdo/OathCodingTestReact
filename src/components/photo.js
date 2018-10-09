import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import * as moment from 'moment';


const Photo = ({item}) => {

    return (
        <span>
            <img src={item.media.m} alt={item.title} style={{width: 'auto', height: '100%'}} />
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
        </span>
    );
}

export default Photo;