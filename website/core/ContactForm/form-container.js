/**
 * A container for the partner and newsletter form. It adds the background
 * images for the pages.
 *
 * TODO: Figure out how to import the CompLibrary from here
 */
const React = require('react');

const FieldSet = require(`${process.cwd()}/core/ContactForm/fieldset.js`);
const FormHeader = require(`${process.cwd()}/core/ContactForm/form-header.js`);


const getFields = (fields) => {
  return fields.map((config, idx) => {
    return <FieldSet key={`form-fieldset-${idx}`} {...config} />;
  });
};


const FormContainer = (props) => {
  const {
    children,
    config: {
      baseUrl
    },
    fields,
    formId,
    title,
    subtitle
  } = props;

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
      <FormHeader title={title} subtitle={subtitle} />
      <div className="wrapper">
        <img {...getImageProps('formIcon', 'form-icon.svg')} />
        <img {...getImageProps('bgCircleLeft', 'bg-circle-whole.svg')} />
        <img {...getImageProps('bgCircleBottom', 'bg-circle-half.svg')} />
        <img {...getImageProps('bgCircleRight', 'bg-circle-whole.svg')} />
        <div className="mainContainer documentContainer postContainer">
          <div className="formWrapper">
            <form id={formId}>
              {getFields(fields)}
              <div className="formControlGroup">
                <button className="button right" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = FormContainer;
