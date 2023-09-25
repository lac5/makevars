export default function make(make) {
    if (make == null) {
        throw new TypeError('vars(make): make is undefined');
    }
    
    return new Proxy({}, typeof make.get === 'function' || typeof make.set === 'function' ? {
        get: make.get && function(vars, key, proxy) {
            return vars.hasOwnProperty(key) ? vars[key] : (vars[key] = make.get(key, proxy));
        },
        set: make.set && function(vars, key, value, proxy) {
            delete vars[key];
            make.set(key, value, proxy);
        },
    } : typeof make.call === 'function' ? {
        get(vars, key, proxy) {
            return vars.hasOwnProperty(key) ? vars[key] : (vars[key] = make.call(vars, key, proxy));
        },
    } : typeof make[Symbol.iterator] === 'function' ? {
        get(vars, key) {
            if (vars.hasOwnProperty(key)) return vars[key];
            for (let [name, value] of make) {
                if (key === name) {
                    return value;
                }
            }
        },
    } : {
        get(vars, key) {
            return vars.hasOwnProperty(key) ? vars[key] : (vars[key] = make[key]);
        },
        set(vars, key, value) {
            return (vars[key] = (make[key] = value));
        },
    });
}
