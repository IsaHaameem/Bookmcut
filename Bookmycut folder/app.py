from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
import re

app = Flask(__name__, static_folder='static', template_folder='frontend/html pages')

# Configure MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Avengers1234#@localhost/bookmycut'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

# Route for the index page
@app.route('/')
def index():
    return render_template('index.html')  # Render the index.html template

# Route for the signup page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Expecting JSON data for POST request
        data = request.get_json()
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        # Basic validation
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"error": "Invalid email format"}), 400
        if not re.match(r"^\d{10,15}$", phone):
            return jsonify({"error": "Invalid phone number format"}), 400
        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400

        # Check if user already exists
        if User.query.filter_by(email=email).first() or User.query.filter_by(phone=phone).first():
            return jsonify({"error": "User already exists with this email or phone"}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user
        new_user = User(email=email, phone=phone, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    return render_template('signup.html')  # Render the signup.html template

if __name__ == '__main__':
    app.run(debug=True)
