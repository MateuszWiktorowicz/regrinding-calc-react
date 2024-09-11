import React from "react";


function RegrindingForm() {
    return(
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
                        </div>
                    </div>
                    <div className="d-flex mb-4 flex-column flex-md-row gap-3 justify-content-between mt-3">
                        <div className="d-flex flex-column">
                            <div className="mb-3">
                                <label for="flutes" className="form-label">Liczba ostrzy</label>
                                <select className="form-select" aria-label="flutes" id="flutes">
                                    <option disabled selected>Wybierz ilość ostrzy</option>
                                </select>
                                <div id="cuttingEdges" className="form-text">Wybranie ilości ostrzy odblokowuje formularz.</div>
                            </div>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <div className="mb-3 col-9">
                                    <label for="toolDiameter" className="form-label">Średnica</label>
                                    <select className="form-select" aria-label="toolDiameter" id="toolDiameter" disabled>
                                        <option disabled selected>Wybierz średnicę</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-3 d-none" id="radiusContainer">
                                    <label for="radius" className="form-label">Promień</label>
                                    <input type="number" className="form-control" id="radius" min="0.1" value="1" step="0.01" disabled />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="m-3">
                                    Wybierz elementy geometrii do naostrzenia
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="geometryOption" id="faceRegrindingOption" value="faceRegrindingOption" disabled />
                                    <label className="form-check-label" for="faceRegrindingOption">Ostrzenie czoła</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="geometryOption" id="fullRegrindingOption" value="fullRegrindingOption" disabled />
                                    <label className="form-check-label" for="fullRegrindingOption">Ostrzenie czoła oraz obwodu</label>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <div className="mb-3">
                                    <label for="coating" className="form-label">Pokrycie</label>
                                    <select className="form-select" aria-label="coating" id="coating" disabled>
                                        <option selected>Brak pokrycia</option>
                                    </select>
                                </div>
                            </div>


                        </div>
                        <div className="d-flex flex-column">
                            <div className="mb-3">
                                <label for="quantity" className="form-label">Ilość</label>
                                <input type="number" className="form-control" id="quantity" aria-describedby="quantityText" min="1" value="1" disabled />
                                <div id="quantityText" className="form-text">Podaj ilość narzędzi do ostrzenia.</div>
                            </div>
                            <div className="mb-3">
                                <label for="price" className="form-label">Cena</label>
                                <input type="number" className="form-control" id="price" disabled />
                            </div>
                            <div className="mb-3">
                                <label for="value" className="form-label">Wartość</label>
                                <input type="number" className="form-control" id="value" disabled />
                            </div>
                            <div className="mb-3">
                                <label for="discount" className="form-label">Rabat [%]:</label>
                                <input type="number" className="form-control" id="discount" min="0" max="10" value="0" disabled />

                            </div>
                            <div className="mb-3">
                                <label for="valueDiscounted" className="form-label">Wartość po rabacie:</label>
                                <input type="number" className="form-control" id="valueDiscounted" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-success" disabled>Dodaj do oferty</button>
                    <button type="reset" className="btn btn-danger">Resetuj</button>
                </div>
            </form>
        </div>
    </>
    );
}

export default RegrindingForm;
