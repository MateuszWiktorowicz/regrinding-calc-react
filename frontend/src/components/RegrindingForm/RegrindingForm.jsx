import React, { useState, useEffect } from 'react';


function RegrindingForm({ toolPrices, coatingPrices, toolTypes, coatingTypes }) {
    const [selectedToolType, setSelectedToolType] = useState('');
    const [flutesOptions, setFlutesOptions] = useState([]);
    const [selectedFlutes, setSelectedFlutes] = useState('');
    const [diametersOptions, setDiametersOptions] = useState([]);
    const [selectedDiameter, setSelectedDiameter] = useState('');
    const [selectedFaceRegrind, setSelectedFaceRegrind] = useState(false);
    const [selectedBodyRegrind, setSelectedBodyRegrind] = useState(false);
    const [regrindOption, setRegrindOption] = useState('');
    const [coatingOptions, setCoatingOptions] = useState([]);
    const [selectedCoating, setSelectedCoating] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [value, setValue] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountedValue, setDiscountedValue] = useState(0);
    const [radius, setRadius] = useState(2);


    useEffect(() => {
        if (selectedToolType) {
            const uniqueFlutes = getUniqueFlutesForToolType(selectedToolType);
            setFlutesOptions(uniqueFlutes);
                if (selectedFlutes) {
                    const uniqueDiameters = getUniqueDiametersForToolTypeAndFlutes(selectedToolType, selectedFlutes);
                    setDiametersOptions(uniqueDiameters);
                    setCoatingOptions(coatingTypes.map(type => type.code));
                        if (selectedDiameter) {
                            setSelectedFaceRegrind(true);
                            setSelectedBodyRegrind(isPeripheryRegirindPossible(selectedToolType));
                        } else if (selectedDiameter === "") {
                            setQuantity(1);
                            setDiscount(0);
                            setSelectedFaceRegrind(false);
                            setSelectedBodyRegrind(false);
                            setRegrindOption('');
                            setCoatingOptions([]);
                            setSelectedCoating('');
                        }
                } else {
                    setDiametersOptions(['Wybierz średnicę'])
                    setQuantity(1);
                    setDiscount(0);
                    setSelectedFaceRegrind(false);
                    setSelectedBodyRegrind(false);
                    setRegrindOption('');
                    setCoatingOptions([]);
                    setSelectedCoating('');
                }
        } else {
            setFlutesOptions([]);
        }
    }, [selectedToolType, selectedFlutes, selectedDiameter, selectedFaceRegrind, selectedBodyRegrind, regrindOption, selectedCoating]);

    useEffect(() => {
        setPrice(calculatePrice());
        const newPrice = calculatePrice();

        setValue((newPrice * quantity).toFixed(2));

        const newValue = newPrice * quantity
        setDiscountedValue((newValue * ( 1 - discount / 100)).toFixed(2));
    }, [selectedToolType, selectedFlutes, selectedDiameter, selectedFaceRegrind, selectedBodyRegrind, regrindOption, selectedCoating, quantity, discount, radius]);

    

    const getUniqueFlutesForToolType = (toolType) => {
        const flutes = toolPrices
            .filter(tool => tool.toolType === toolType)
            .map(tool => tool.flutesNumber);
        
        return [...new Set(flutes)];
    };

    const getUniqueDiametersForToolTypeAndFlutes = (toolType, flutes) => {
        const diameters = toolPrices
            .filter(tool => (tool.toolType === toolType && tool.flutesNumber === parseInt(flutes)))
            .map(tool => tool.diameter);
        
        return [...new Set(diameters)];
    };

    const isPeripheryRegirindPossible = (toolType) => {
        return toolType === "Frez Walcowy" || toolType === "Frez Promieniowy" ? true : false;
    }

     const calculatePrice = () =>
    {
        let regrindPrice = 0;
        let coatingPrice = 0;
    
        const tool = toolPrices.find(
            (t) =>
                t.toolType === selectedToolType &&
                t.flutesNumber === parseInt(selectedFlutes) &&
                t.diameter === parseInt(selectedDiameter)
        );

        if (!tool) {
            return 0;
        }

    
        if (regrindOption === "faceRegrindingOption") {
            regrindPrice += tool.facePrice;
        }
    
        if (regrindOption === "fullRegrindingOption") {
            regrindPrice += tool.peripheryPrice;
            regrindPrice += tool.facePrice
        }

        if (selectedCoating && selectedCoating !== "Brak pokrycia") {
            const coating = coatingPrices.find((c) => c.code === selectedCoating);
            if (coating) {
                coatingPrice = coating.price;
            }
        }

        if (selectedToolType === "Frez Promieniowy") {
            if (radius <= 1.5) {
                regrindPrice -= 5;
            } else if (radius >= 2.5) {
                regrindPrice += 5;
            }
        }

        let totalPrice = (regrindPrice + coatingPrice);

        return totalPrice.toFixed(2); 
    };

    const handleToolTypeChange = (event) => {
        setSelectedToolType(event.target.value);
        setSelectedFlutes(''); 
    };

    const handleFluteChange = (event) => {
        setSelectedFlutes(event.target.value)
        setSelectedDiameter('');

    };

    const handleDiameterChange = (event) => {
        setSelectedDiameter(event.target.value)
    };

    const handleRadiusChange = event => {
        setRadius(event.target.value);
    }

    const handleRegrindOptionChange = (event) => {
        setRegrindOption(event.target.value);
    };

    const handleCoatingChange = (event) => {
        setSelectedCoating(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    
    const handleValueChange = (event) => {
        setValue((event.target.value).toFixed(2));
    }

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
    }
    
    const handleDiscountedValueChange = (event) => {
        setDiscountedValue(event.target.value);
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <form className="bg-white rounded m-5 p-5" id="regrindForm">
                    <div className="mb-3 text-center">
                        <h1>Kalkulator ostrzenia Mastermet</h1>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-3">
                            <div className="mb-3">Rodzaj czoła do naostrzenia:</div>
                            <div className="form-check-inline d-flex flex-wrap gap-5" id="radioToolTypesContainer">
                            {toolTypes.map(type => (
                                <div key={type.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="toolType"
                                        id={type.id}
                                        value={type.name}
                                        onChange={handleToolTypeChange}
                                    />
                                    <label className="form-check-label" htmlFor={type.id}>
                                        {type.name}
                                    </label>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="d-flex mb-4 flex-column flex-md-row gap-3 justify-content-between mt-3">
                            <div className="d-flex flex-column">
                                <div className="mb-3">
                                    <label htmlFor="flutes" className="form-label">Liczba ostrzy</label>
                            <select 
                                className="form-select" 
                                aria-label="flutes" 
                                id="flutes" 
                                value={selectedFlutes} 
                                onChange={handleFluteChange}
                                disabled={!selectedToolType}
                            >
                                <option value="" disabled>Wybierz ilość ostrzy</option>
                                {flutesOptions.map(flute => (
                                    <option key={flute} value={flute}>{flute}</option>
                                ))}
                            </select>
                                    <div id="cuttingEdges" className="form-text">Wybranie ilości ostrzy odblokowuje formularz.</div>
                                </div>
                                <div className="d-flex flex-column flex-md-row gap-3">
                                    <div className="mb-3 col-9">
                                        <label htmlFor="toolDiameter" className="form-label">Średnica</label>
                                        <select 
                                        className="form-select" 
                                        aria-label="diameter" 
                                        id="diameter" 
                                        value={selectedDiameter} 
                                        onChange={handleDiameterChange}
                                        disabled={!selectedFlutes}
                                        >
                                            <option value="" disabled>Wybierz średnicę</option>
                                            {diametersOptions.map(diameter => (
                                    <option key={diameter} value={diameter}>{diameter}</option>
                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-3" id="radiusContainer">
                                        <label htmlFor="radius" className="form-label" hidden={selectedToolType !== "Frez Promieniowy"}>Promień</label>
                                        <input 
                                        type="number" 
                                        className="form-control" 
                                        id="radius" 
                                        min="0.1" 
                                        value={radius} 
                                        step="0.01" 
                                        onChange={handleRadiusChange}
                                        hidden={selectedToolType !== "Frez Promieniowy"}
                                        disabled={selectedToolType !== "Frez Promieniowy" || regrindOption === ''} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="m-3">
                                        Wybierz elementy geometrii do naostrzenia
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                        className="form-check-input" 
                                        type="radio" name="geometryOption" 
                                        id="faceRegrindingOption" 
                                        value="faceRegrindingOption" 
                                        disabled={!selectedFaceRegrind}
                                        checked={regrindOption === "faceRegrindingOption"}
                                        onChange={handleRegrindOptionChange}
                                        />
                                        <label className="form-check-label" htmlFor="faceRegrindingOption">Ostrzenie czoła</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                        className="form-check-input" 
                                        type="radio" name="geometryOption" 
                                        id="fullRegrindingOption" 
                                        value="fullRegrindingOption" 
                                        disabled={!selectedBodyRegrind} 
                                        checked={regrindOption === "fullRegrindingOption"}
                                        onChange={handleRegrindOptionChange}
                                        />
                                        <label className="form-check-label" htmlFor="fullRegrindingOption">Ostrzenie czoła oraz obwodu</label>
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-md-row gap-3">
                                    <div className="mb-3">
                                        <label htmlFor="coating" className="form-label">Pokrycie</label>
                                        <select 
                                        className="form-select" 
                                        aria-label="coating" 
                                        id="coating" 
                                        value={selectedCoating} 
                                        onChange={handleCoatingChange}
                                        disabled={coatingOptions.length === 0}>
                                            <option value="none">Brak pokrycia</option>
                                            {coatingOptions.map(coating => (
                                    <option key={coating} value={coating}>{coating}</option>
                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">Ilość</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="quantity" 
                                    aria-describedby="quantityText" 
                                    min="1" 
                                    value={quantity}
                                    onChange={handleQuantityChange} 
                                    disabled={regrindOption === ''} />
                                    <div id="quantityText" className="form-text">Podaj ilość narzędzi do ostrzenia.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Cena</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="price" 
                                    value={price}
                                    onChange={handlePriceChange}
                                    disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="value" className="form-label">Wartość</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="value"
                                    value={(value)}
                                    onChange={handleValueChange} 
                                    disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discount" className="form-label">Rabat [%]:</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="discount" 
                                    min="0" 
                                    max="10" 
                                    value={(discount)}
                                    onChange={handleDiscountChange} 
                                    disabled={regrindOption === ''} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="valueDiscounted" className="form-label">Wartość po rabacie:</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="valueDiscounted"
                                    value={(discountedValue)}
                                    onChange={handleDiscountedValueChange} 
                                    disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <button type="submit" className="btn btn-success" disabled>Dodaj do oferty</button>
                        <button type="reset" className="btn btn-danger">Resetuj</button>
                    </div> */}
                </form>
            </div>
        </>
    );
}

export default RegrindingForm;
