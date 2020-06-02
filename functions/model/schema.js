// user schema
exports.user = (data) => {
    return {
        uid: data.uid,
        name: data.name,
        nim: data.nim,
        class: data.class,
        position: data.position,
        face: data.face,
    };
};

// karya schema
exports.karya = (data) => {
    return {
        uid: data.uid,
        category: data.category,
        description: data.description,
        file: data.file,
        screenshot: data.screenshot,
        status: data.status,
        timestamp: data.timestamp,
        User: {
            uid: data.user.uid,
            name: data.user.name,
            nim: data.user.nim,
            class: data.user.class,
            position: data.user.position,
            face: data.user.face,
        },
    };
};
