let map = {};
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