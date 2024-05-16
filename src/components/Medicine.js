import React, { useState, useEffect } from 'react';

const Medicine = ({ salt_forms_json, index }) => {

  const [selectedForm, setSelectedForm] = useState('');
  const [selectedStrength, setSelectedStrength] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState('');

  const [showMoreForms, setShowMoreForms] = useState(false);
  const [showMoreStrengths, setShowMoreStrengths] = useState(false);
  const [showMorePackagings, setShowMorePackagings] = useState(false);

  useEffect(() => {
    const initialForm = Object.keys(salt_forms_json)[0];
    setSelectedForm(initialForm);

    const initialStrength = Object.keys(salt_forms_json[initialForm])[0];
    setSelectedStrength(initialStrength);

    const initialPackaging = Object.keys(salt_forms_json[initialForm][initialStrength])[0];
    setSelectedPackaging(initialPackaging);
  }, [salt_forms_json]);

  const handleFormSelection = (form) => {
    setSelectedForm(form);
    const firstStrength = Object.keys(salt_forms_json[form])[0];
    setSelectedStrength(firstStrength);
    const firstPackaging = Object.keys(salt_forms_json[form][firstStrength])[0];
    setSelectedPackaging(firstPackaging);
  };

  const handleStrengthSelection = (strength) => {
    setSelectedStrength(strength);
    const firstPackaging = Object.keys(salt_forms_json[selectedForm][selectedStrength])[0];
    setSelectedPackaging(firstPackaging);
  };

  const renderButtons = (items, showMore, toggleShowMore, handleSelection, selectedItem) => {
    const displayedItems = showMore ? items : items.slice(0, 4);
    return (
      <>
        {displayedItems.map((item, index) => (
          <button key={index} className={item === selectedItem ? 'selected' : 'not-selected'} onClick={() => handleSelection(item)}>
            <span className={item === selectedItem ? 'btnText-selected' : 'btnText-not-selected'}>{item}</span>
          </button>
        ))}
        {items.length > 4 && (
          <button className="btn-more" onClick={toggleShowMore}>
            <span className='btnMore-text'>{showMore ? 'hide...' : 'more...'}</span>
          </button>
        )}
      </>
    );
  };

  const renderStrengths = () => {
    if (!salt_forms_json[selectedForm]) return null;
    const strengths = Object.keys(salt_forms_json[selectedForm]);
    return renderButtons(strengths, showMoreStrengths, () => setShowMoreStrengths(!showMoreStrengths), handleStrengthSelection, selectedStrength);
  };

  const handlePackagingSelection = (packaging) => {
    setSelectedPackaging(packaging);
  };

  const renderPackagings = () => {
    if (!salt_forms_json[selectedForm] || !salt_forms_json[selectedForm][selectedStrength]) return null;
    const packagings = Object.keys(salt_forms_json[selectedForm][selectedStrength]);
    return renderButtons(packagings, showMorePackagings, () => setShowMorePackagings(!showMorePackagings), handlePackagingSelection, selectedPackaging);
  };

  const getLowestSellingPrice = () => {
    const prices = salt_forms_json[selectedForm]?.[selectedStrength]?.[selectedPackaging];
    if (!prices) return 'N/A';

    const validPrices = Object.values(prices).filter((priceObj) => priceObj !== null && priceObj.length > 0);
    if (validPrices.length === 0) return 'N/A';

    const lowestPrice = validPrices.reduce((minPrice, priceObj) => {
      const price = priceObj[0]?.selling_price;
      return price && price < minPrice ? price : minPrice;
    }, Infinity);

    return 'From Rs' + lowestPrice === Infinity ? 'N/A' : lowestPrice;
  };

  return (
    <div className='salt'>
      <div>
        <div className='form'>
          <span>Form : </span> <div className='btn-container'>
            {/* {Object.keys(salt_forms_json).map((form) => {
          return (
            <button key={form} className={form === selectedForm ? 'selected' : 'not-selected'} onClick={() => handleFormSelection(form)}><span className={form === selectedForm ? 'btnText-selected' : 'btnText-not-selected'}>{form}</span></button>
          )
        })} */}

            {renderButtons(Object.keys(salt_forms_json), showMoreForms, () => setShowMoreForms(!showMoreForms), handleFormSelection, selectedForm)}
          </div>
        </div>
        <div className='strength'>
          <span> Strength: </span>
          <div className="btn-container">
            {renderStrengths()}
          </div>
        </div>
        <div className='packaging'>
          <span> Packaging: </span>
          <div className="btn-container">
            {renderPackagings()}
          </div>
        </div>
      </div>

      <div className="salt-info">
       <div className='label'>{`Salt ${String.fromCharCode(65 + index)}`}</div>
       <div className='info'>{`${selectedForm} | ${selectedStrength} | ${selectedPackaging}`}</div>
      </div>

      <div className="price">
       {getLowestSellingPrice()}
      </div>

    </div>
  )
};

export default Medicine;

