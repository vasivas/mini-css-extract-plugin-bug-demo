module.exports.externals = map => (context, request, callback) => {
    if (map.has(request)) {
        return callback(null, map.get(request));
    }
    callback();
};
