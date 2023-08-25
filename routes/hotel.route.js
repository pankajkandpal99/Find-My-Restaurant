const hotelController = require('../controllers/hotel.controller');

module.exports = function(app){

    app.post('/api/restaurant/add', hotelController.addHotel);

    app.get('/api/restaurant/', hotelController.fetchAllHotels);

    app.get('/api/restaurant/categories', hotelController.getCategory);

    app.get('/api/restaurant/categories/:categoryName', hotelController.HotelsByCategory);

    app.get('/api/restaurant/:id', hotelController.HotelById);

    app.get('/api/restaurant/rating/:ratingValue', hotelController.HotelRatingValue);

    app.put('/api/restaurant/:id', hotelController.UpdateHotel);

    app.delete('/api/restaurant/:id', hotelController.DeleteHotel);

    app.delete('/api/restaurant', hotelController.DeleteAllHotels);
    
}