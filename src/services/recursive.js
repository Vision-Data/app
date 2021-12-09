function recursive(data, comps) {
    let components = [];

    if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
        components.push({
            component: comps.ValueComponent,
            name: '',
            data: data,
            color: "info",
            isStandalone: true,
        });
    } else {
        const json = Object.keys(data);
        
        json.forEach(key => {
            if (typeof data[key] === "string" || typeof data[key] === "number" || typeof data[key] === "boolean") {
                components.push({
                    component: comps.ValueComponent,
                    name: key,
                    data: data[key],
                    color: "info",
                    isStandalone: true,
                });
            } else if (typeof data[key] === 'object' && (data[key] === null || data[key] === undefined)) {
                data[key] = '(vide)';
                components.push({
                    component: comps.ValueComponent,
                    name: key,
                    data: data[key],
                    color: "info",
                    isStandalone: true,
                });
            } else if (typeof data[key] === "object") {
                if (Array.isArray(data[key])) {
                    components.push({
                        component: comps.ArrayComponent,
                        name: key,
                        data: data[key],
                        color: "warning",
                        isStandalone: false,
                        isFromArray: true
                    });
                } else {
                    components.push({
                        component: comps.ObjectComponent,
                        name: key,
                        data: data[key],
                        color: "error",
                        isStandalone: false,
                    });
                }
            }
        });
    }
    return components
}

export default { recursive }