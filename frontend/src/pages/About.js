import React from 'react';
import { Carousel } from 'react-bootstrap';  
import './css/About.css';  

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import photo2 from '../photos/2.png';
import imagei1 from '../photos/aboutt.png'; 

import image1 from '../photos/painter1.jpg';  
import image2 from '../photos/painter5.jpg';  

import image3 from '../photos/painter3.jpg';  
import image4 from '../photos/painter4.jpg';  


import image5 from '../photos/painter2.jpg';  
import image6 from '../photos/paintrer6.jpg';  

import image7 from '../photos/painter7.jpg';  
 

const About = () => {


    function scrollLeft() {
        const scrollContainer = document.querySelector('.painters-scroll');
        scrollContainer.scrollBy({
            left: -200,  
            behavior: 'smooth',  
        });
    }

    function scrollRight() {
        const scrollContainer = document.querySelector('.painters-scroll');
        scrollContainer.scrollBy({
            left: 200,  
            behavior: 'smooth',  
        });
    }


    return (
        <div className="about-container">
            {/* Carousel */}
            <Carousel className="custom-carousel">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagei1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagei1}
                        alt="Second slide"
                    />
                </Carousel.Item>
                {/* Add more Carousel.Items if needed */}
            </Carousel>

            <div className="who-we-are">
                <h2 style={{ fontFamily: 'Frank Ruhl Libre' }}>WHO WE ARE</h2>
            </div>
                       
<div className="two-part-division">
    {/* Left side text */}
    <div className="left-side-text">
        <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
        Step into the enchanting world of Kyl Kalem Gallery of Art, where creativity knows no bounds and every brushstroke carries the weight of a thousand emotions. Nestled at the heart of artistic expression, our gallery is more than just a space for showcasing paintings – it's a sanctuary for the soul, a haven for art enthusiasts, and a testament to the power of imagination.
At Kyl Kalem, we curate a diverse collection of paintings that span a myriad of styles, themes, and genres. From vibrant landscapes that evoke a sense of wanderlust to captivating portraits that capture the essence of the human spirit, each artwork on display is a masterpiece in its own right, waiting to be discovered and cherished.But our gallery is not just about admiring art from afar – it's about experiencing it firsthand. Whether you're a seasoned collector or a curious newcomer, our knowledgeable staff are here to guide you on a journey of exploration, offering insights into the stories behind each painting and the techniques used to bring them to life.
And for those seeking to bring a piece of beauty into their own homes, Kyl Kalem offers a seamless purchasing experience, with a wide range of artworks available for sale. Whether you're looking to add a touch of elegance to your living room or seeking a statement piece for your office, our collection has something to suit every taste and style.
        </p>
   
   
    </div>

    {/* Right side photo */}
    <div className="right-side-photo">
        <img src={photo2} alt="2nd" width="470" height="350" />
    </div>
</div>

{/* Second section */}
{/* <div className="two-part-division">
 
    <div className="left-side-photo">
        <img src={photo2} alt="2nd" width="470" height="350" />
    </div> */}

{/*    
    <div className="right-side-text">
        <p style={{ fontFamily: 'Frank Ruhl Libre' }}>
            Add your text here...
        </p>
    </div>
</div> */}


<div className="painters_text">
                <h2 style={{ fontFamily: 'Frank Ruhl Libre' }}>OUR PAINTERS</h2>
            </div>

 {/* Painters section */}
<div className="painters-section">
<div className="scroll-arrow-left" onClick={scrollLeft}>  <FontAwesomeIcon icon={faAngleLeft} /></div>
    <div className="painters-scroll">
        <div className="painters-line">
            <div className="painter-item">
                <img src={image1} alt="Painter 1" className="circle-image small-image" />
                <p className="painter-name">Painter 1</p>
            </div>
            <div className="painter-item">
                <img src={image2} alt="Painter 2" className="circle-image small-image" />
                <p className="painter-name">Painter 2</p>
            </div>
            <div className="painter-item">
                <img src={image3} alt="Painter 3" className="circle-image small-image" />
                <p className="painter-name">Painter 3</p>
            </div>
            <div className="painter-item">
                <img src={image4} alt="Painter 4" className="circle-image small-image" />
                <p className="painter-name">Painter 4</p>
            </div>
            <div className="painter-item">
                <img src={image5} alt="Painter 5" className="circle-image small-image" />
                <p className="painter-name">Painter 5</p>
            </div>
            <div className="painter-item">
                <img src={image6} alt="Painter 6" className="circle-image small-image" />
                <p className="painter-name">Painter 6</p>
            </div>
            <div className="painter-item">
                <img src={image7} alt="Painter 7" className="circle-image small-image" />
                <p className="painter-name">Painter 7</p>
            </div>
            <div className="scroll-arrow-right" onClick={scrollRight}><FontAwesomeIcon icon={faAngleRight} /> </div>

        </div>
    </div>
</div>




            
        </div>
    );
}

export default About;
