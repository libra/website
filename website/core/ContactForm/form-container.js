/**
 * A container for the partner and newsletter form. It adds the background
 * images for the pages.
 *
 * TODO (joshua): Figure out how to import the CompLibrary from here
 */
const React = require('react');


const FormContainer = ({ children, config: siteConfig  }) => {
  const {baseUrl} = siteConfig;

  /**
   * Get the className and src props for the img elements.
   */
  const getImageProps = (className, image) => {
    return {
      className: `formBgImage ${className}`,
      src: `${baseUrl}img/${image}`
    };
  };

  return (
    <div className="mainContainer formPage">
      <div className="wrapper">
        <img {...getImageProps('formIcon', 'form-icon.svg')} />
        <img {...getImageProps('bgCircleLeft', 'bg-circle-whole.svg')} />
        <img {...getImageProps('bgCircleBottom', 'bg-circle-half.svg')} />
        <img {...getImageProps('bgCircleRight', 'bg-circle-whole.svg')} />
        <div className="mainContainer documentContainer postContainer">
          <div className="formWrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = FormContainer;
