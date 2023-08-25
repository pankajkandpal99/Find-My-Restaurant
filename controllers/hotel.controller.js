const Hotel = require('../models/hotel.model');

exports.addHotel = async(req, res) => {

    /**
     * post all hotels details......
     *     if req.body is empty then print--> "Content can not be empty."
     *     if not empty then create data to the database...
     */

    if(Object.keys(req.body).length==="0"){
        return res.status(400).json({
            message: "Content can not be empty."
        });
    }

    const data = {
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        imageURL : req.body.imageURL,
        location : req.body.location,
        phone : req.body.phone,
        rating : req.body.rating,
    }

    try {
         
      const user = await Hotel.create(data);

      res.status(200).send({
        _id : user._id,
        name: user.name,
        description : user.description,
        category : user.category,
        imageURL : user.imageURL,
        location : user.location,
        phone : user.phone,
        rating : user.rating,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt,
      });

    } catch (err){
        console.log("Error creating user : " + err);
        res.status(500).send({
            message: "Internal Server error!"
        });
    }
}

// get all hotels details ---------------->>>>>>>>>>>>>>

exports.fetchAllHotels = async(req, res)=>{

    /**
     *  get all hotels -- >
     *  check hotel is available or not??
     *  if available, then get all hotels in json.
     */
    
    try {

        let hotelQuery = {};
        const hotels = await Hotel.find(hotelQuery);
        
        if(hotels.length === 0){
            return res.status(200).json({
                restaurent : [],
                message : "Restaurent fetched Successfully."
            });
        }
        
        res.status(200).json({
            restaurent : hotels,
            message : "Restaurants fetched successfully."
        })

    } catch (err){
       console.log("your fetching hotels data generating error : "+ err);
       res.status(500).json({
           message: "Internal Server Error."
       });
    }
}


// -------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * This API returns the list of all the categories of restaurants present.
[
    "Dineout",
    "Takeout"
]
 If there are no categories of restaurants in the database, return an empty list.
some error occurs while fetching the categories, return error code 500 with the message
 "Some error occurred while fetching Categories"
 */


exports.getCategory = async(req, res)=>{

    try {
       
        const categories = await Hotel.distinct('category');   // Retrieve all the unique category from the User(hotels) collection.....distinct method khud hi alag-alag objects ko iterate karke usme define ki gayi keys me se distinct values nikal leta hai. Ye process collection ke andar specified field me difine ki gayi keys ki unique values ko retrieve karne mein madad karta hai.
        
        res.status(200).send(categories);

    } catch(err){
        console.log("Your fetching categories creating error : "+ err);
        res.status(500).send({
            message : "Internal Server Error."
        });
    }
}


//--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>????????????????????????????>>>>>>>>>>>>>>>>>>>

// GET /api/restaurant/categories/categoryName
// Example: /api/restaurant/categories/dineout
// This API returns details of all the restaurants of a particular category in the database.
/**
 * If there are no restaurants for a given category in the database, return an empty list with status code 200.
     In case, some error occurs while fetching the restaurant of a particular category, 
    return error code 500 with the message "Some error occured while fetching the Restaurant."
*/

exports.HotelsByCategory = async (req, res)=>{
   
    try {
        
        const { categoryName } = req.params;

        const fetchCategory = await Hotel.find({ category : categoryName });

        if(fetchCategory.length === 0){
            console.log(`hotels with categoryName ${categoryName} are not found.`);
            return res.status(200).json([]);
        }
         
        res.status(200).send(fetchCategory);

    } catch (err){
        console.log("Error coming of your Fetching category : "+ err);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}


// ______________________________________------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/**
 * GET /api/restaurant/id
 *   Example: GET /api/restaurant/62de74beba2aea34590c628f
 *   This API returns details of the restaurant with a particular id.

 *   If a restaurant with a given ID is not present, the following message should be displayed and
    the status code to be returned is 404.
 */

exports.HotelById = async (req, res)=>{

     try {
        const { id } = req.params;

        const hotelById = await Hotel.findOne({_id : id });

        if(!hotelById){
            console.log(`hotels with id ${id} are not found.`);
            return res.status(404).json({
                message : `restaurant with a given ID is not present.`
            });
        }
         
        res.status(200).json(hotelById);

    } catch(err){
        console.log("Error coming of your Fetching id : " + err);
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
      
}

//----------____________________________????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

// GET /api/restaurant/rating/ratingValue
// Example: /api/restaurant/rating/4
// This API returns details of all the restaurants with ratings greater than equal to the given rating.

/**
 * If there are no restaurants with equal to or more than the given rating in the database, 
     an empty list will be returned. The status code to be returned is 200.
 * In case some error occurs while fetching the restaurant of a particular category, 
     return error code 500 with the message "Some error occured while fetching the Restaurant."
 */


exports.HotelRatingValue = async (req, res)=>{

    try {
        const { ratingValue } = req.params;

        // const ratingValueHotel = await Hotel.find({rating :  { $gte: ratingValue }});      // '$gte' is a query operator in MongoDB that stands for "greater than or equal." It is used to compare values in a query and fetch documents where the specified field value is greater than or equal to the given value.
        
        // if you do not use $gte then this code will work... 
        //find all hotel and fetch the hotels which rating is greater than and equal to given ratingValue...

        const ratingValueHotel = await Hotel.find();

        const filteredHotel = [];
        for(const hotel of ratingValueHotel){
            if(hotel.rating >= ratingValue) {
                filteredHotel.push(hotel);
            }
        }

        if(!ratingValue){                      // if hotel rating value is not present.
            console.log(`Not present Hotel of your given rating number: ${ratingValue}.`);
            return res.status(200).json([]);
        }
        
        res.status(200).send(filteredHotel);     // return all hotels which rating is greater than and equal to given rating value.

    } catch(err){
        console.log(`Error coming your fetching rating value : ${ratingValue} not found.`);
        return res.status(500).json({
            message: "Some error occured while fetching the Restaurant."
        })
    }
}

// -------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>>

// PUT /api/restaurant/id
// Example: PUT /api/restaurant/62de74beba2aea34590c628f
// This API updates existing details of the restaurant with a particular id.

//If you have not entered the request body properly, the following response will be returned.
//If a restaurant with a given ID is not present, the following message should be displayed.  The status code to be returned is 200.
//In case, some error occurs while fetching the restaurant of a particular category, return error code 500 with the message "Some error occured while fetching the Restaurant.

exports.UpdateHotel = async(req, res)=>{

    const {id} = req.params;
    const {name, description, category, imageURL, location, phone, rating} = req.body;

    if(!name || !description || !category || !imageURL || !location || !phone || !rating){
        return res.status(200).json({
            message : "Restaurent Data is Required !"
        })
    }

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id, req.body, {new : true});

        if(!updateHotel){
            console.log("No Restaurent found for given ID !");
            res.status(200).json({
                message : "No Restaurent found for given ID."
            });
        }

        res.status(200).send(updateHotel);

    } catch(err){
        if(id !== Hotel._id){               // // if given id is not matching the object _id in the database, then my custom error will work...
            console.log("Your given id is not matching Object_id.");
            return res.status(200).json({
                message: "Id is not matching the Object _id."
            });
        }
        else {
            console.log("Some Error Fetching to Update the Restaurent : " + err);
            res.status(500).json({
                message: "Some error occured while fetching the Restaurant !"
            });
        }
    }
}


// ------------------_______________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>?????????????????????????????????????????


// DELETE /api/restaurant/id 
// Example: DELETE /api/restaurant/62de74beba2aea34590c628f
// This API deletes existing details of the restaurant with a particular id. After successful deletion, the following response should be returned with status code 200.

// If an error occurs while fetching the restaurant of a particular category, return error code 500 with the message "Some error occured while deleting the Restaurant."
// If no restaurants are deleted from the database, simply return details as null. 


exports.DeleteHotel = async (req, res) => {
     
        const {id} = req.params;

    try {
        const deleteHotel = await Hotel.findByIdAndDelete(id);

        if(!deleteHotel){
            console.log(`Hotel not found with this given particular id : ${id}`);
            return res.status(400).json({
                restaurent : null,
                message : "Restaurent deleted successfully."
            });
        }

        res.status(200).json({
            Restaurent : deleteHotel,
            message : "Restaurent deleted successfully."
        });

    } catch (err){
        if(id !== Hotel._id){
            console.log(`Your given id : ${req.params.id} is not matching with your stored hotel id.`);
            return res.status(200).json({
                message : "Your id is not matching with hotel id !"
            });
        }

        console.log("Some error fetching the delete hotel : " + err);
        res.status(500).json({
            message : "Some error occured while deleting the Restaurant."
        })
    }
}


// ---------------____________________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>?????????????????????????????????????????????

// DELETE  /api/restaurant/
// This API deletes all existing details of the restaurants. After hitting the API, the output you can expect is:

//This API deletes all existing details of the restaurants. After hitting the API, the output you can expect is:
// {
//     "restaurants": {
//         "acknowledged": true,
//         "deletedCount": 4
//     },
//     "message": "Restaurants deleted successfully."
// }

//In case some error occurs while fetching the restaurant of a particular category, return error code 500 with the message "Some error occured while deleting the Restaurant."
//If no restaurants are deleted from the database, simply return details as null.

exports.DeleteAllHotels = async (req, res) => {

    try {
        const deleteAllHotels = await Hotel.deleteMany();
        const deleteCount = deleteAllHotels.deletedCount;          // Once the documents are deleted, it will return an object with a property, deletedCount, containing the number of documents deleted.
        
        if(deleteCount === 0){
            console.log("Already deleted all hotels.");
            return res.status(200).json({
                restaurents : {
                    acknowledged : true,
                    deleteCount : 0
                },
                message: "Restaurents already deleted successfully."
            });
        }

        res.status(200).json({
            restaurents : {
                acknowledged : true,
                deleteCount : deleteCount,
            },
            message : "Restaurent deleted successfully."
        })

    } catch (err){
        console.log("" + err);
        res.status(500).json({
            message : "Some error occured while deleting the Restaurant."
        });
    }
}








