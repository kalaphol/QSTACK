<?php
/**
 * Test API Endpoints
 * Access: http://localhost:8000/backend/test-api.php
 * 
 * This file helps test all API endpoints
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Testing - GCTU E-Library Backend</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }
        
        .endpoints {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .endpoint-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .endpoint-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .endpoint-card h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        
        .endpoint-info {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 15px;
        }
        
        .method {
            display: inline-block;
            padding: 4px 8px;
            background: #667eea;
            color: white;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .endpoint-path {
            background: #f5f5f5;
            padding: 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            color: #333;
            overflow-x: auto;
        }
        
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            margin: 10px 0;
            resize: vertical;
        }
        
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            transition: background 0.2s;
        }
        
        button:hover {
            background: #764ba2;
        }
        
        button:active {
            transform: scale(0.98);
        }
        
        .response {
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .response.success {
            background: #e8f5e9;
            border-color: #4caf50;
        }
        
        .response.error {
            background: #ffebee;
            border-color: #f44336;
        }
        
        .response pre {
            margin: 0;
            font-size: 0.85em;
            color: #333;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .status-code {
            margin-top: 10px;
            padding: 8px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .status-code.success {
            background: #4caf50;
            color: white;
        }
        
        .status-code.error {
            background: #f44336;
            color: white;
        }
        
        .info-box {
            background: white;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        .info-box h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .info-box p {
            color: #666;
            font-size: 0.9em;
            line-height: 1.6;
        }
        
        .api-url {
            background: white;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
        }
        
        .api-url label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: bold;
        }
        
        .api-url input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 GCTU E-Library API Testing</h1>
            <p>Test all backend API endpoints</p>
        </div>
        
        <div class="info-box">
            <h3>⚙️ API Configuration</h3>
            <div class="api-url">
                <label for="apiUrl">API Base URL:</label>
                <input type="text" id="apiUrl" value="http://localhost:8000/backend/api" placeholder="Enter API URL">
            </div>
        </div>
        
        <div class="info-box">
            <h3>📝 Instructions</h3>
            <p>1. Make sure your PHP backend is running</p>
            <p>2. Update the API URL if needed</p>
            <p>3. Fill in the request data (JSON format)</p>
            <p>4. Click the "Test Endpoint" button to make a request</p>
            <p>5. Response will appear below</p>
        </div>
        
        <div class="endpoints">
            <!-- Register Endpoint -->
            <div class="endpoint-card">
                <h3>User Registration</h3>
                <div class="endpoint-info">
                    <div class="method">POST</div>
                    <div class="endpoint-path">/api/register.php</div>
                </div>
                <textarea id="registerData" placeholder="Request data..." rows="8">{
  "fullName": "John Doe",
  "email": "john@students.gctu.edu.gh",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}</textarea>
                <button onclick="testEndpoint('register')">Test Registration</button>
                <div id="registerResponse"></div>
            </div>
            
            <!-- Login Endpoint -->
            <div class="endpoint-card">
                <h3>User Login</h3>
                <div class="endpoint-info">
                    <div class="method">POST</div>
                    <div class="endpoint-path">/api/login.php</div>
                </div>
                <textarea id="loginData" placeholder="Request data..." rows="8">{
  "email": "john@students.gctu.edu.gh",
  "password": "SecurePass123"
}</textarea>
                <button onclick="testEndpoint('login')">Test Login</button>
                <div id="loginResponse"></div>
            </div>
            
            <!-- Logout Endpoint -->
            <div class="endpoint-card">
                <h3>User Logout</h3>
                <div class="endpoint-info">
                    <div class="method">POST</div>
                    <div class="endpoint-path">/api/logout.php</div>
                </div>
                <textarea id="logoutData" placeholder="Request data..." rows="8">{}</textarea>
                <button onclick="testEndpoint('logout')">Test Logout</button>
                <div id="logoutResponse"></div>
            </div>
            
            <!-- Profile Endpoint -->
            <div class="endpoint-card">
                <h3>Get User Profile</h3>
                <div class="endpoint-info">
                    <div class="method">GET</div>
                    <div class="endpoint-path">/api/profile.php</div>
                </div>
                <p style="color: #666; font-size: 0.9em; margin-bottom: 15px;">No data needed - retrieves current user profile</p>
                <button onclick="testEndpoint('profile-get')">Test Get Profile</button>
                <div id="profileGetResponse"></div>
            </div>
            
            <!-- Update Profile Endpoint -->
            <div class="endpoint-card">
                <h3>Update User Profile</h3>
                <div class="endpoint-info">
                    <div class="method">PUT</div>
                    <div class="endpoint-path">/api/profile.php</div>
                </div>
                <textarea id="profileData" placeholder="Request data..." rows="8">{
  "fullName": "Jane Doe"
}</textarea>
                <button onclick="testEndpoint('profile-put')">Test Update Profile</button>
                <div id="profilePutResponse"></div>
            </div>
            
            <!-- Change Password Endpoint -->
            <div class="endpoint-card">
                <h3>Change Password</h3>
                <div class="endpoint-info">
                    <div class="method">POST</div>
                    <div class="endpoint-path">/api/change-password.php</div>
                </div>
                <textarea id="passwordData" placeholder="Request data..." rows="8">{
  "currentPassword": "SecurePass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}</textarea>
                <button onclick="testEndpoint('password')">Test Change Password</button>
                <div id="passwordResponse"></div>
            </div>
        </div>
    </div>
    
    <script>
        async function testEndpoint(endpoint) {
            const apiUrl = document.getElementById('apiUrl').value;
            let url, method, data;
            let responseDiv;
            
            switch(endpoint) {
                case 'register':
                    url = `${apiUrl}/register.php`;
                    method = 'POST';
                    data = JSON.parse(document.getElementById('registerData').value);
                    responseDiv = document.getElementById('registerResponse');
                    break;
                case 'login':
                    url = `${apiUrl}/login.php`;
                    method = 'POST';
                    data = JSON.parse(document.getElementById('loginData').value);
                    responseDiv = document.getElementById('loginResponse');
                    break;
                case 'logout':
                    url = `${apiUrl}/logout.php`;
                    method = 'POST';
                    data = JSON.parse(document.getElementById('logoutData').value);
                    responseDiv = document.getElementById('logoutResponse');
                    break;
                case 'profile-get':
                    url = `${apiUrl}/profile.php`;
                    method = 'GET';
                    responseDiv = document.getElementById('profileGetResponse');
                    break;
                case 'profile-put':
                    url = `${apiUrl}/profile.php`;
                    method = 'PUT';
                    data = JSON.parse(document.getElementById('profileData').value);
                    responseDiv = document.getElementById('profilePutResponse');
                    break;
                case 'password':
                    url = `${apiUrl}/change-password.php`;
                    method = 'POST';
                    data = JSON.parse(document.getElementById('passwordData').value);
                    responseDiv = document.getElementById('passwordResponse');
                    break;
            }
            
            try {
                const options = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                if (method !== 'GET' && data) {
                    options.body = JSON.stringify(data);
                }
                
                const response = await fetch(url, options);
                const result = await response.json();
                
                const isSuccess = response.ok && result.success;
                const className = isSuccess ? 'success' : 'error';
                const statusClass = response.status >= 200 && response.status < 300 ? 'success' : 'error';
                
                responseDiv.innerHTML = `
                    <div class="response ${className}">
                        <pre>${JSON.stringify(result, null, 2)}</pre>
                        <div class="status-code ${statusClass}">Status: ${response.status}</div>
                    </div>
                `;
            } catch (error) {
                responseDiv.innerHTML = `
                    <div class="response error">
                        <pre>Error: ${error.message}</pre>
                        <p style="color: #d32f2f; margin-top: 10px;">Make sure the API URL is correct and the server is running.</p>
                    </div>
                `;
            }
        }
    </script>
</body>
</html>
