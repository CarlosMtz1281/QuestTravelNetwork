from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("key.json")  
firebase_admin.initialize_app(cred)
db = firestore.client()

# Define a route to test Firestore connection
@app.route('/ping', methods=['GET'])
def ping():
    try:
        print("Attempting to fetch all documents from the 'users' collection...")
        users_ref = db.collection('users')
        docs = users_ref.stream()

        users_data = []
        for doc in docs:
            print(f"Document ID: {doc.id}, Data: {doc.to_dict()}")
            users_data.append(doc.to_dict())

        return jsonify({"message": "Connection to Firebase successful!", "data": users_data}), 200
    except Exception as e:
        print(f"Error connecting to Firebase: {e}")
        return jsonify({"message": "Error connecting to Firebase", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)