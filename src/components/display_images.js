import React from "react";

const DisplayImages = (props) => {
    const {
        images, incrementScore
    } = props;

    return (
        <div className="image-container">
            {images.map((image) => (
                <img 
                    key={image} 
                    src={image} 
                    alt={image}
                    id={image}
                    onClick={incrementScore}
                    className='image'
                />
            ))}
        </div>
    )
};

export default DisplayImages;
