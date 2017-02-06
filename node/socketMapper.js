let map = {};
let socketExists = (id) => {
    let socket = map[id];
    return typeof socket !== 'undefined' && socket !== null;
};

let manager = {
    addSocketForId: (socket, id) => {
        map[id] = socket;        
    },
    getSocketForId: (id) => {
        return map[id];
    },
    removeSocketForId: (id) => {
        delete map[id];
    }
};

module.exports = manager;