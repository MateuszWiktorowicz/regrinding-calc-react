export async function fetchToolPrices() {
    try {
        const response = await fetch('http://dobrzeskadrowane.pl/api/tools');
        const data = await response.json();
        const transformedTools = data.member.map(tool => ({
            id: tool['@id'].split('/').pop(),
            diameter: tool.diameter,
            flutesNumber: tool.flutes_number,
            facePrice: (tool.face_grinding_time_minutes * 3) / 0.6,
            peripheryPrice: (tool.periphery_grinding_time_minutes_2D * 3) / 0.6,
            toolType: tool.tool_type.name
        }));
        return transformedTools;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export async function fetchCoatingPrices() {
    try {
        const response = await fetch('http://dobrzeskadrowane.pl/api/coating_prices');
        const data = await response.json();
        const transformedCoatings = data.member.map(coating => ({
            id: coating['@id'].split('/').pop(),
            diameter: coating.diameter,
            price: coating.price / 0.6,
            code: coating.coating.mastermet_code,
            name: coating.coating.mastermet_name
        }));
        return transformedCoatings;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export async function fetchToolTypes() {
    try {
        const response = await fetch('http://dobrzeskadrowane.pl/api/tool_types');
        const data = await response.json();
        const transformedToolTypes = data.member.map(type => ({
            id: type['@id'].split('/').pop(),
            name: type.name,
        }));
        return transformedToolTypes;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

    export async function fetchCoatingTypes() {
        try {
            const response = await fetch('http://dobrzeskadrowane.pl/api/coating_types');
            const data = await response.json();
            const transformedCoatingTypes = data.member.map(type => ({
                id: type['@id'].split('/').pop(),
                name: type.mastermet_name,
                code: type.mastermet_code
            }));
            return transformedCoatingTypes;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    

    
