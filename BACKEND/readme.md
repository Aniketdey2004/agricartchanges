Code is in working condition
The utilities are basically middlewares that we have used at different stages. A middleware is a middle man kind of stuff which will first check a certain condition beofre sednding the req to the backend server.We can use mutliple middlewares at a particular step . The backend server mainly accepts (err,req,res,next) these 4 params out of which err is for errors received, req is the req sent from frontend, res is the response to be send to the frontend and next will actually loop the whole process of passing through multiple middlewares until a res is received.it is not a key word but a flag.
API ERROR MODULE ::
we have used the error class of node js in the api error module of the utilities
changes were made

TO fix the error make a folder in C drive name tmp ---> Then make a folder inside it named my-uploads---->Then try to submit a file--->It will push the photo file there


Changed in stock.route.js --> req.body --> req.file 
{
  fieldname: 'photo',
  originalname: '_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '/tmp/my-uploads',
  filename: '_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  path: '\\tmp\\my-uploads\\_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  size: 121932
}

In such a way it will display the photo details in terminal

Order Post example:(POST)

{
  "userId": "66c695058ce53fff572636c1",
  "products": [
    {
      "productId": "66c602bd28b946380e875eb5",
      "quantity": 2
    },
    {
      "productId": "66c6028b28b946380e875eaf",
      "quantity": 1
    }
  ],
  "address": "123 Farm Road, Green Valley"
}


Updation Example: (PUT)

{
  "orderId": "66c6968ad2554f0394f3a289",
  "status": "Shipped"
}

http://localhost:3026/api/v1/stocks/Grains (You can now search through this url to search any product with category Grains)change grains with other options to see results
Change grains with the object Id to see that particular product 
(Added this today)....24/08/2024
in multer middleware the folder name Agricart Git Push is my folder name(Akash)...Please change these according to your Folder Name 

DeliveryPartner Functionality added 

{
  "partnerId": "DP789012",
  "name": "Akash Debnath",
  "phoneNumber": "+1987654321",
  "email": "janesmith@example.com",
  "address": {
    "street": "456 Elm Avenue",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90001"
  },
  "serviceArea": ["Los Angeles", "Beverly Hills", "Santa Monica"],
  "bankingInfo": {
    "bankName": "Wells Fargo",
    "accountNumber": "9876543210",
    "ifscCode": "WFBIUS6S"
  }
}
(Copy to try post request)

Sign In Trial 
{
  
  "username": "Akash0022",
  "name": "Aniket Debnath ",
  "password": "11",
  "gender": "male",
  "address": "RR 1350 Kolkata",
  "pincode": "743271",
  "email": "Aakashde@gmail.com",
  "phoneNumber": "990"
  
}
Use Password,Email id and Username for trial in Login Page 
http://localhost:3026/api/v1/deliverypartners/:partnerid (Change Partnerid with _id)

http://localhost:3026/api/v1/cart/add
(cart add)Example json
{
  "userId": "66c9af55a9e0b2875c87622e", 
  "productId": "66cc197a94012c23ff2be3d7", 
  "quantity": 2
}
Output
{
    "message": "Product added to cart successfully",
    "cart": {
        "_id": "66cd425fb09c1bd4964a1c70",
        "userId": "66c9af55a9e0b2875c87622e",
        "products": [
            {
                "productId": "66cc197a94012c23ff2be3d7",
                "quantity": 8,    <--------------This will be increased each time
                "_id": "66cd425fb09c1bd4964a1c71"
            }
        ],
        "totalPrice": 560,
        "createdAt": "2024-08-27T03:05:03.795Z",
        "updatedAt": "2024-08-27T03:10:36.702Z",
        "__v": 0
    }
}

http://localhost:3026/api/v1/cart/66c9af55a9e0b2875c87622e(GET Request)
[RESPONSE]

{
    "_id": "66cea8e8b624ac22dd105ba1",
    "userId": {
        "_id": "66c9af55a9e0b2875c87622e",
        "username": "Aniket 11365",
        "name": "Aniket Saha",
        "gender": "male",
        "address": "Kolkata11",
        "pincode": "1111115",
        "email": "aniket112200@gmail.com",
        "phoneNumber": "78282"
    },
    "products": [
        {
            "productId": {
                "_id": "66cc197a94012c23ff2be3d7",
                "photo": "..\\..\\..\\.\\public\\moong-dal.jpg",
                "Mrp": 70,
                "description": "Moong Dal"
            },
            "quantity": 15,
            "_id": "66cea8e8b624ac22dd105ba2"
        }
    ],
    "totalPrice": 1050,
    "createdAt": "2024-08-28T04:34:48.331Z",
    "updatedAt": "2024-08-28T04:34:48.331Z",
    "__v": 0
}

http://localhost:3026/api/v1/cart/delete
[Delete Request]

{
  "userId": "66c9af55a9e0b2875c87622e",
  "productId": "66cc197a94012c23ff2be3d7",
  "quantity": 3--------->quantity will be decreased each time
}

http://localhost:3026/api/v1/farmers/login
farmer login

{
    "username": "farmerJohn",
    "password": "StrongPassword123"
}


output

{
    "statusCode": "Farmer logged in successfully",
    "data": {
        "farmer": {
            "_id": "66ceb214e5ba6813242db7cc",
            "username": "farmerJohn",
            "name": "John Doe",
            "gender": "Male",
            "address": "123 Farm Lane, Villageville",
            "pincode": 123456,
            "email": "farmer.john@example.com",
            "farmingCertifications": "Organic Farming Certified",
            "farmingDetails": "Specializes in organic vegetables and fruits",
            "phoneNumber": "9876543210",
            "createdAt": "2024-08-28T05:13:56.907Z",
            "updatedAt": "2024-08-28T05:16:01.449Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2ViMjE0ZTViYTY4MTMyNDJkYjdjYyIsImlhdCI6MTcyNDgyMjE2MSwiZXhwIjoxNzI0ODIzMDYxfQ.5cpfBSzqss9Li8pTZ5iw5_IxPOEwtokS6seE4A1J8Hc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2ViMjE0ZTViYTY4MTMyNDJkYjdjYyIsImlhdCI6MTcyNDgyMjE2MSwiZXhwIjoxNzI1NDI2OTYxfQ.D7Ef1XdienSKJzf1bUT3b4ty8eP3EkdtjnoJWrnKaa0"
    },
    "message": "Success",
    "success": false
}

http://localhost:3026/api/v1/farmers/register
farmer register

{
    "username": "farmerJohn",
    "name": "John Doe",
    "password": "StrongPassword123",
    "gender": "Male",
    "address": "123 Farm Lane, Villageville",
    "pincode": 123456,
    "email": "farmer.john@example.com",
    "farmingCertifications": "Organic Farming Certified",
    "farmingDetails": "Specializes in organic vegetables and fruits",
    "phoneNumber": "9876543210"
}

Output

{
    "username": "farmerJohn",
    "name": "John Doe",
    "password": "StrongPassword123",
    "gender": "Male",
    "address": "123 Farm Lane, Villageville",
    "pincode": 123456,
    "email": "farmer.john@example.com",
    "farmingCertifications": "Organic Farming Certified",
    "farmingDetails": "Specializes in organic vegetables and fruits",
    "phoneNumber": "9876543210"
}

http://localhost:3026/api/v1/orders/orderNew(GET Request)

{
  "userId": "66c9ae108fb94dd3746f0057", 
  "products": [
    {
      "productId": "66ca03f787113865608de2a3", 
      "quantity": 2
    },
    {
      "productId": "66ca08f987113865608de2b3", 
      "quantity": 1
    }
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "Anystate",
    "zip": "123456",
    "country": "India"
  },
  "paymentMethod": "Credit Card"
}

Output 

{
    "success": true,
    "message": "Order created successfully",
    "data": {
        "order": {
            "userId": "66c9ae108fb94dd3746f0057",
            "products": [
                {
                    "productId": "66ca03f787113865608de2a3",
                    "quantity": 2,
                    "_id": "66d3497d930019e0f4f105d6"
                },
                {
                    "productId": "66ca08f987113865608de2b3",
                    "quantity": 1,
                    "_id": "66d3497d930019e0f4f105d7"
                }
            ],
            "totalAmount": 110,
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "Anystate",
                "zip": "123456",
                "country": "India"
            },
            "paymentDetails": {
                "paymentMethod": "Credit Card",
                "status": "Paid",
                "transactionId": "dummyTransactionId",
                "created_at": "2024-08-31T16:49:01.505Z"
            },
            "_id": "66d3497d930019e0f4f105d5",
            "createdAt": "2024-08-31T16:49:01.510Z",
            "updatedAt": "2024-08-31T16:49:01.510Z",
            "__v": 0
        }
    }
}


//subscribe to csa as an user
request - 
{
  "planId": "66d9b30abd316780ef8030b9",  // Replace with actual CSA plan ID from your database
  "email": "Aakashdebnath@gmail.com",           // Replace with an actual user's email from your database
  "password": "1111"              // Replace with the user's password
}

if successful expected RESPONSE - {
    "message": "Subscriber added successfully to the CSA plan!",
    "csaPlan": {
        "product_culivated": {
            "productName": "Organic Tomatoes",
            "description": "Fresh, locally grown organic tomatoes.",
            "growingPractices": "Organic farming with sustainable water usage",
            "category": "Vegetables",
            "placeOfOrigin": "California, USA",
            "estimated_units": 100
        },
        "_id": "66d9b30abd316780ef8030b9",
        "farmerId": "66d8a3afb4a4c700bfd2f072",
        "total_estimated_price": 1500,
        "initial_price": 500,
        "estimated_time_of_produce": "3 months",
        "subscribers": [
            {
                "userId": "66d89eb8d1aebbd7a748d24a",
                "_id": "66d9b30abd316780ef8030ba"
            },
            {
                "userId": "66d89db9d1aebbd7a748d240",
                "_id": "66d9b30abd316780ef8030bb"
            },
            {
                "userId": "66c02e8250609d2552f9c8c1",
                "_id": "66d9c4549e9ad6cfd8fdf05a"
            },
            {
                "userId": "66c02d020ac92a8780e5213b",
                "_id": "66d9c4789e9ad6cfd8fdf060"
            },
            {
                "userId": "66c7590f296f8fd467dafc87",
                "_id": "66e1a8e0a5db143dfe298c51"
            }
        ],
        "__v": 3
    }
}

//get all orders by farmer id
request to be sent 
{
  "email": "admin@gmail.com",
  "username": "Admin"
}
response received by frontend
[
    {
        "_id": "66e1cd953de2f4523761fcce",
        "userId": "66c695058ce53fff572636c1",
        "products": [
            {
                "productId": {
                    "_id": "66e1c3597724d60609f3295e",
                    "photo": null,
                    "Mrp": 100,
                    "description": "Fresh and organic apples",
                    "units": 49,
                    "date_of_produce": "2024-09-01",
                    "growing_practices": "Organic",
                    "place_of_origin": "Hilly region",
                    "product_id": "apple-1234",
                    "seller_name": "John Doe",
                    "sellerDetails": {
                        "_id": "66dfc63f8111f10d68e0636d",
                        "name": "Admin",
                        "address": "Admin",
                        "email": "admin@gmail.com",
                        "phoneNumber": "0000"
                    },
                    "category": "Fruits",
                    "createdAt": "2024-09-11T16:20:42.022Z",
                    "updatedAt": "2024-09-11T17:04:21.750Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "66e1cd953de2f4523761fccf"
            },
            {
                "productId": {
                    "_id": "66e1c405e642f693eb044c86",
                    "photo": null,
                    "Mrp": 500,
                    "description": "Fresh and organic onions",
                    "units": 149,
                    "date_of_produce": "2024-09-01",
                    "growing_practices": "Organic",
                    "place_of_origin": "land",
                    "product_id": "onion-1234",
                    "seller_name": "John Doe",
                    "sellerDetails": {
                        "_id": "66dfc63f8111f10d68e0636d",
                        "name": "Admin",
                        "address": "Admin",
                        "email": "admin@gmail.com",
                        "phoneNumber": "0000"
                    },
                    "category": "Vegetables",
                    "createdAt": "2024-09-11T16:23:33.967Z",
                    "updatedAt": "2024-09-11T17:04:21.750Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "66e1cd953de2f4523761fcd0"
            },
            {
                "productId": {
                    "_id": "66e1cc6c3de2f4523761fcc9",
                    "photo": null,
                    "Mrp": 500,
                    "description": "Fresh and organic pineapples",
                    "units": 122,
                    "date_of_produce": "2024-09-01",
                    "growing_practices": "Organic",
                    "place_of_origin": "land",
                    "product_id": "pineapples-1456",
                    "seller_name": "John Doe",
                    "sellerDetails": {
                        "_id": "66dfc63f8111f10d68e0636d",
                        "name": "Admin",
                        "address": "Admin",
                        "email": "admin@gmail.com",
                        "phoneNumber": "0000"
                    },
                    "category": "Fruits",
                    "createdAt": "2024-09-11T16:59:24.923Z",
                    "updatedAt": "2024-09-11T17:04:21.750Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "66e1cd953de2f4523761fcd1"
            }
        ],
        "totalAmount": 1100,
        "address": "123 Farm Road, Green Valley",
        "pincode": "67890940",
        "createdAt": "2024-09-11T17:04:21.704Z",
        "updatedAt": "2024-09-11T17:04:21.704Z",
        "__v": 0
    }
]

Cart example 