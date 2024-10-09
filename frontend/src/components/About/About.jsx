import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'
const About = () => {
  return (
      <section>
          <div className="container">
              <div className='flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                  {/* about img */}
                  <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                      <img src={aboutImg} alt='' />
                      <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22px]">
                      <img src={aboutCardImg} alt='' />
                      </div>
                  </div>

                  {/* about content */}
                  <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                      <h2 className='heading'>Excellence in Care, Trusted Nationwide</h2>
                      <p className='text_para'>
                      As one of the nation's best healthcare providers, we take pride in delivering top-quality medical care and innovative treatment options. Our team of highly skilled doctors, specialists, and healthcare professionals is committed to providing exceptional patient experiences, backed by cutting-edge technology and research. We continuously strive to set the standard for excellence in healthcare, ensuring that every patient receives the best care possible.
                      </p>
                      <p className='text_para'>
                          For 30 years in a row, U.S. News & World Report has recognized us as one of the best publics hospitlas in tha Nation and #1 in Texas. 
                      </p>
                      <Link to='/services'><button className='btn'>Learn More</button></Link>
                  </div>
              </div>
         </div>
    </section>
  )
}

export default About