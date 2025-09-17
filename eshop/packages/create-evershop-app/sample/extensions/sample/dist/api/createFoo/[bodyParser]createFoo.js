export default (request, response, next) => {
    const { name, description } = request.body;
    if (!name || !description) {
        return response
            .status(400)
            .json({ error: 'Name and description are required' });
    }
    // Create the new foo item
    const newFoo = {
        id: Date.now(),
        name,
        description
    };
    // Simulate saving to a database
    console.log('Creating new foo:', newFoo);
    // Respond with the created foo item
    response.status(201).json({
        success: true,
        data: {
            foo: newFoo
        }
    });
};
//# sourceMappingURL=%5BbodyParser%5DcreateFoo.js.map