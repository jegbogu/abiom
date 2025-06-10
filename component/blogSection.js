'use client';

import { useRef } from 'react';
import classes from './blogSection.module.css';

const blogPosts = [
  { id: 1, name: 'The Spicy Truth About Red Pepper: Health Benefits and Dangers', image: '/pepper.jpg', link: "https://blog.abiomsupply.com/2023/04/26/the-spicy-truth-about-red-pepper-health-benefits-and-dangers/" },
  { id: 2, name: 'Garri Makes You Healthy: Nutritional Perks of this West African Staple', image: '/garri.avif', link: "https://blog.abiomsupply.com/2023/04/26/garri-makes-you-healthy-nutritional-perks-of-this-west-african-staple/" },
  { id: 3, name: 'Crunch into Good Health: Why You Should Eat More of this Leafy Green', image: '/delicious-veggie.avif', link: "https://blog.abiomsupply.com/2023/04/26/crunch-into-good-health-why-you-should-eat-more-of-this-leafy-green/" },
];

export default function BlogSection() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={classes.section}>
      {/* Navigation Buttons */}
      <div className={classes.carouselBtns}>
        <button onClick={() => scroll('left')} className={classes.navButton}>&#10094;</button>
        <button onClick={() => scroll('right')} className={classes.navButton}>&#10095;</button>
      </div>

      {/* Carousel */}
      <div className={classes.carouselWrapper}>
        <div className={classes.carouselContainer}>
          <div ref={carouselRef} className={classes.carousel}>
            {blogPosts.map((post) => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className={classes.postCard}>
                <div className={classes.figure}>
                  <img src={post.image} alt={post.name} className={classes.postImage} />
                </div>
                <p className={classes.postName}>{post.name}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
