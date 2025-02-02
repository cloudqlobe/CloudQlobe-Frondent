import React from "react";
import styles from "./About.module.css";
import aboutContent from "../../Strings/en_strings.json"; 
import CustomizedQuotesForm from "../components/DIDQuotation";
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={aboutContent["ABOUT_BANNER_IMAGE_SRC"]}
            alt={aboutContent["ABOUT_BANNER_IMAGE_ALT"]}
            layout="responsive"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className={styles.servicesBody}>
          {/* Section 1 */}
          <section className={styles.services}>
            <div className={styles.content}>
              <div className={styles.illustration}>
                <img
                  src={aboutContent["ABOUT_SECTION_1_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_1_IMAGE_ALT"]}
                  className={styles.illustrationImage}
                />
              </div>

              <div className={styles.textContent}>
                <p className={styles.serviceDescription}>
                  {aboutContent["ABOUT_SECTION_1_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className={styles.services}>
            <div className={styles.content}>
              <div className={styles.textContent}>
                <p className={styles.serviceDescription}>
                  {aboutContent["ABOUT_SECTION_2_DESCRIPTION"]}
                </p>
              </div>

              <div className={styles.illustration}>
                <img
                  src={aboutContent["ABOUT_SECTION_2_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_2_IMAGE_ALT"]}
                  className={styles.illustrationImage}
                />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className={styles.services}>
            <div className={styles.content}>
              <div className={styles.illustration}>
                <img
                  src={aboutContent["ABOUT_SECTION_3_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_3_IMAGE_ALT"]}
                  className={styles.illustrationImage}
                />
              </div>

              <div className={styles.textContent}>
                <p className={styles.serviceDescription}>
                  {aboutContent["ABOUT_SECTION_3_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>
        </div>

        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default About;