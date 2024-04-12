import jwt

# Your secret key for encoding and decoding the JWT
secret_key = 'your_secret_key'

# Payload data for the JWT
payload_data = {
    'user_id': 123,
    'username': 'john_doe'
}

# Generate the JWT
jwt_token = jwt.encode(payload_data, secret_key, algorithm='HS256')

# Print or use the generated JWT
print("Generated JWT:", jwt_token)
