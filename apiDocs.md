# Description and expected behaviour for all the CRUD api's for Catkit

# POST API -> http://localhost:5000/catkit -> To upload a new image
BODY: name -> string, description -> string, image -> file (required)
Status Codes: 
404 -> Image is not attached, File Type not suuported (either of png, jpg or jpeg should be uploaded), File size exceeds 10 MB
500 -> Image upload to cloudinary fails or public url fetch for uploaded image fails or timed out
200 -> File successfully uploads

# PUT API -> http://localhost:5000/catkit/imageId -> To update an existing image or its metadata
PARAMS: imageId of the image that needs to be updated
BODY: name -> string, description -> string, image -> file (required)
Status Codes: 
404 -> imageId not found in the db
500 -> Image upload to cloudinary fails or public url fetch for uploaded image fails or updation of the new image or metadata to db fails or timed out
200 -> File or metadata successfully replaced in the db

# GET API -> http://localhost:5000/catkit -> To fetch all the uploaded images
PARAMS: None
Status Codes:
500 -> Fetch operation timed out
200 -> All the images fetched successfully

# GET API -> http://localhost:5000/catkit/imageId -> To fetch a specific image from uploaded image
PARAMS: imageId
Status Codes:
404 -> imageId not found in the db
500 -> Fetch operation timed out
200 -> Image with the given imageId fetched successfully

# DELETE API -> http://localhost:5000/catkit/imageId -> To delete a specific image from uploaded image
PARAMS: imageId
Status Codes:
404 -> imageId not found in the db
500 -> Delete operation timed out
200 -> Image with the given imageId deleted successfully