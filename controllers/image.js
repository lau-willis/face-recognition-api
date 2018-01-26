const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f47e7466f8684c05a635ee040bb045bc'
});
const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with api'));
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to update entries'));
}

module.exports = {handleImage, handleApiCall};