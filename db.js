import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

const userShcema = new mongoose.Schema({
    name: { type: String, required: true },
});

export const User = mongoose.model('User', userShcema);


