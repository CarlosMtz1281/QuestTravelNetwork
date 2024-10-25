from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os
import google.generativeai as genai
import uuid
from datetime import datetime
from dateutil import parser
import re


# Initialize Flask app
app = Flask(__name__)
api_key = os.getenv('GOOGLE_GENAI_API_KEY')
print(os.getenv('GOOGLE_GENAI_API_KEY'))
genai.configure(api_key=api_key)

# Allow only requests from localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize Firebase Admin SDK
cred = credentials.Certificate("key.json")  # Replace with your service account key file
firebase_admin.initialize_app(cred)
db = firestore.client()


# Route to fetch all users but exclude email and password
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users_ref = db.collection('users')
        docs = users_ref.stream()
        users_data = []

        for doc in docs:
            user = doc.to_dict()
            user.pop('email', None)
            user.pop('password', None)
            users_data.append(user)

        return jsonify({"message": "Users fetched successfully!", "data": users_data}), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"message": "Error fetching users", "error": str(e)}), 500

# Route to fetch all posts
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

# Route to fetch a user's posts by ID passed in headers
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

# Route to fetch a user's plans by ID passed in headers
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

# Route to create a new post
@app.route('/create_post', methods=['POST'])
def create_post():
    try:
        post_data = request.json
        if not post_data:
            return jsonify({"message": "No data provided"}), 400

        # Validate required fields
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
    

# Route to create multiple posts
@app.route('/create_posts', methods=['POST'])
def create_posts():
    try:
        posts_data = request.json
        if not posts_data:
            return jsonify({"message": "No data provided"}), 400

        # Validate that the provided data is a list
        if not isinstance(posts_data, list):
            return jsonify({"message": "Data should be a list of posts"}), 400

        # Validate and insert each post
        required_fields = ["userKey", "description", "likes", "date", "location", "category"]
        for post in posts_data:
            for field in required_fields:
                if field not in post:
                    return jsonify({"message": f"Missing field: {field} in one of the posts"}), 400

            # Handle the case where comments might be in dictionary form and not a list
            if isinstance(post.get("comments"), dict):
                post["comments"] = [{"id": key, **value} for key, value in post["comments"].items()]

            # Insert post into Firestore
            db.collection('posts').add(post)

        return jsonify({"message": "Posts created successfully!"}), 201
    except Exception as e:
        print(f"Error creating posts: {e}")
        return jsonify({"message": "Error creating posts", "error": str(e)}), 500



    
    # Route to create multiple plans
@app.route('/create_plans', methods=['POST'])
def create_plans():
    try:
        plans_data = request.json
        if not plans_data:
            return jsonify({"message": "No data provided"}), 400

        # Validate that the provided data is a list
        if not isinstance(plans_data, list):
            return jsonify({"message": "Data should be a list of plans"}), 400

        # Validate each plan
        required_fields = ["authorKey", "dates", "name", "plan", "region"]
        for plan in plans_data:
            for field in required_fields:
                if field not in plan:
                    return jsonify({"message": f"Missing field: {field} in one of the plans"}), 400

        # Add all plans to Firestore
        for plan in plans_data:
            db.collection('plans').add(plan)

        return jsonify({"message": "Plans created successfully!"}), 201
    except Exception as e:
        print(f"Error creating plans: {e}")
        return jsonify({"message": "Error creating plans", "error": str(e)}), 500
    

@app.route('/test_gemini', methods=['GET'])
def test_gemini():
    try:
        # Specify the model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Get the prompt from query parameters or use a default value
        prompt = request.args.get('prompt', 'Hello, Gemini!')
        
        # Generate the response
        response = model.generate_content(prompt)
        
        # Extract the generated text from the response
        generated_text = response.candidates[0].content.parts[0].text
        
        return jsonify({"message": "Generated text from Gemini API", "data": generated_text}), 200
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return jsonify({"message": "Error calling Gemini API", "error": str(e)}), 500
    
    


@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    try:
        # Parse request data
        data = request.json
        country = data.get("country")
        dates = data.get("dates", {})
        date_from = dates.get("from")
        date_to = dates.get("to")
        details = data.get("details")
        name = data.get("name")

        # Remove timezone name in parentheses (e.g., " (Central Standard Time)")
        date_from = re.sub(r'\s*\(.*\)$', '', date_from)
        date_to = re.sub(r'\s*\(.*\)$', '', date_to)

        # Parse dates using dateutil's parser
        date_from_obj = parser.parse(date_from)
        date_to_obj = parser.parse(date_to)

        # Format dates as desired
        formatted_dates = f"{date_from_obj.strftime('%b %d')} - {date_to_obj.strftime('%b %d')}"

        # Prompt for Gemini to generate itinerary
        prompt = f"Create a detailed day-by-day itinerary for a trip to {country}. Trip details: {details}. Duration: from {formatted_dates}. Format the response in Markdown with sections by days."

        # Send request to Gemini for itinerary generation
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        plan_text = response.text

        # Prepare the Firebase document data
        itinerary_id = str(uuid.uuid4())
        itinerary_data = {
            "authorKey": "user001",  # Adjust this dynamically as needed
            "dates": formatted_dates,
            "id": itinerary_id,
            "name": name,
            "plan": plan_text,
            "region": country
        }

        # Save to Firebase
        db.collection('plans').document(itinerary_id).set(itinerary_data)

        return jsonify({
            "message": "Itinerary generated and saved successfully",
            "data": itinerary_data
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error generating itinerary", "error": str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True, port=5002, host='0.0.0.0')