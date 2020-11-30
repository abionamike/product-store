import app from './server.js';

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
