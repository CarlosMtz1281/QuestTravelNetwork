from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("key.json")  # Replace "key.json" with your service account key file
firebase_admin.initialize_app(cred)
db = firestore.client()

# Dummy data to be inserted into Firestore (same as your original data)
data = {
    "users": [
        {
            "userKey": "user001",
            "email": "john.doe@example.com",
            "password": "password123",
            "age": 30,
            "name": "John",
            "lastName": "Doe",
            "nacionality": "American"
        },
        {
            "userKey": "user002",
            "email": "jane.smith@example.com",
            "password": "mypassword",
            "age": 25,
            "name": "Jane",
            "lastName": "Smith",
            "nacionality": "British"
        },
        {
            "userKey": "user003",
            "email": "carlos.martinez@example.com",
            "password": "securepass",
            "age": 27,
            "name": "Carlos",
            "lastName": "Martinez",
            "nacionality": "Mexican"
        },
        {
            "userKey": "user004",
            "email": "emma.wilson@example.com",
            "password": "password456",
            "age": 22,
            "name": "Emma",
            "lastName": "Wilson",
            "nacionality": "Canadian"
        }
    ]
    # The rest of the data for posts and plans...
}

# Define a route to fetch all users but exclude email and password
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users_ref = db.collection('users')
        docs = users_ref.stream()
        users_data = []

        for doc in docs:
            user = doc.to_dict()
            # Exclude email and password
            user.pop('email', None)
            user.pop('password', None)
            users_data.append(user)

        return jsonify({"message": "Users fetched successfully!", "data": users_data}), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"message": "Error fetching users", "error": str(e)}), 500

# Define a route to fetch all posts
@app.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts_ref = db.collection('posts')
        docs = posts_ref.stream()
        posts_data = [doc.to_dict() for doc in docs]
        
        return jsonify({"message": "Posts fetched successfully!", "data": posts_data}), 200
    except Exception as e:
        print(f"Error fetching posts: {e}")
        return jsonify({"message": "Error fetching posts", "error": str(e)}), 500

# Define a route to fetch a user's own posts by ID passed in headers
@app.route('/getMyPosts', methods=['GET'])
def get_my_posts():
    user_key = request.headers.get('userKey')
    
    if not user_key:
        return jsonify({"message": "userKey not provided in headers"}), 400
    
    try:
        posts_ref = db.collection('posts').where('userKey', '==', user_key)
        docs = posts_ref.stream()
        my_posts = [doc.to_dict() for doc in docs]

        return jsonify({"message": "User's posts fetched successfully!", "data": my_posts}), 200
    except Exception as e:
        print(f"Error fetching user's posts: {e}")
        return jsonify({"message": "Error fetching user's posts", "error": str(e)}), 500

# Define a route to fetch a user's plans by ID passed in headers
@app.route('/getMyPlans', methods=['GET'])
def get_my_plans():
    author_key = request.headers.get('authorKey')
    
    if not author_key:
        return jsonify({"message": "authorKey not provided in headers"}), 400
    
    try:
        plans_ref = db.collection('plans').where('authorKey', '==', author_key)
        docs = plans_ref.stream()
        my_plans = [doc.to_dict() for doc in docs]

        return jsonify({"message": "User's plans fetched successfully!", "data": my_plans}), 200
    except Exception as e:
        print(f"Error fetching user's plans: {e}")
        return jsonify({"message": "Error fetching user's plans", "error": str(e)}), 500

# Define a route to post new post data
@app.route('/create_post', methods=['POST'])
def create_post():
    try:
        post_data = request.json
        if not post_data:
            return jsonify({"message": "No data provided"}), 400

        # Validate required fields in post data
        required_fields = ["userKey", "description", "likes", "date", "location", "category"]
        for field in required_fields:
            if field not in post_data:
                return jsonify({"message": f"Missing field: {field}"}), 400

        # Add the post to Firestore
        db.collection('posts').add(post_data)

        return jsonify({"message": "Post created successfully!"}), 201
    except Exception as e:
        print(f"Error creating post: {e}")
        return jsonify({"message": "Error creating post", "error": str(e)}), 500

# Main app runner
if __name__ == '__main__':
    app.run(debug=True, port=5000)