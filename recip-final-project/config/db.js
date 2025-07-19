const mongoose=require('mongoose');

mongoose.connect(process.env.URI, {
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});