import React from 'react';
import PropTypes from 'prop-types';
import Card from "./DealList/DealCard";

const propTypes = {
    card: PropTypes.object
};

const CardDragPreview = (props) => {
    let styles = {
        backgroundColor: '#FAFAFB',
        display: 'inline-block',
        transform: 'rotate(-3deg)',
        WebkitTransform: 'rotate(-3deg)',
        border: '1px solid #e7eaec',
        margin: '0 0 10px 0',
        padding: '10px',
        borderRadius: '2px',
        width: `${props.card.clientWidth || 243}px`,
        height: `${props.card.clientHeight || 243}px`
    }

    return (
        <div style={styles}>
            <Card item={props.card.item}/>
        </div>
    );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
