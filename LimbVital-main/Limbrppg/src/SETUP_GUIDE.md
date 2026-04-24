1).Prerequisites (Kya-kya install karna hai)
Before starting, make sure laptop mein ye cheezein installed hain:
Python 3.10+ (Backend logic ke liye)
Node.js (Frontend dashboard ke liye)
A decent Webcam (Laptop ka inbuilt camera bhi chalega)
2).Backend Setup (The AI Brain)
Backend hamare project ka main part hai jo camera frames process karke heart rate nikalta hai.
Open Terminal and navigate to the backend folder:
Bash
cd backend

Create a Virtual Environment (Best practice hai taaki errors na aayein):
Bash
python -m venv venv
Activate the Environment:
Windows: venv\Scripts\activate
Mac/Linux: source venv/bin/activate

Install Dependencies:
Bash
pip install -r requirements.txt
(Isme OpenCV, Mediapipe aur FastAPI jaise important libraries install ho jayengi.)
Run the Server:
Bash

python main.py
Check: Browser mein http://localhost:8000/health khol ke dekho, agar status "healthy" hai toh sab set hai.
3).. Frontend Setup (The Dashboard)
Dashboard hamare vitals ko real-time mein graphs ke saath show karega.
Open a New Terminal aur frontend folder mein jao:

Bash
cd frontend
Install Node Modules:

Bash
npm install
Launch the App:

Bash
npm run dev
Open in Browser: Terminal mein jo link dikhegi (usually http://localhost:5173), usse open kar lo.
Gemini said
Bilkul, isko ekdum "Final Project Report" ya "ReadMe" style mein likhte hain jo thoda professional lage par language ekdum simple aur easy-to-follow ho.

🫀 LimbVital: Step-by-Step Setup Guide
Ye guide tere project ko zero se start karne mein help karegi. Bas step-by-step follow kar aur tera rPPG Heart Rate Monitoring system ready ho jayega.

📌 1. Prerequisites (Kya-kya install karna hai)
Before starting, make sure tere laptop mein ye cheezein installed hain:

Python 3.10+ (Backend logic ke liye)

Node.js (Frontend dashboard ke liye)

A decent Webcam (Laptop ka inbuilt camera bhi chalega)

⚙️ 2. Backend Setup (The AI Brain)
Backend hamare project ka main part hai jo camera frames process karke heart rate nikalta hai.

Open Terminal and navigate to the backend folder:

Bash
cd backend
Create a Virtual Environment (Best practice hai taaki errors na aayein):

Bash
python -m venv venv
Activate the Environment:

Windows: venv\Scripts\activate

Mac/Linux: source venv/bin/activate

Install Dependencies:

Bash
pip install -r requirements.txt
(Isme OpenCV, Mediapipe aur FastAPI jaise important libraries install ho jayengi.)

Run the Server:

Bash
python main.py
Check: Browser mein http://localhost:8000/health khol ke dekho, agar status "healthy" hai toh sab set hai.

🎨 3. Frontend Setup (The Dashboard)
Dashboard hamare vitals ko real-time mein graphs ke saath show karega.

Open a New Terminal (Backend ko band mat karna) aur frontend folder mein jao:

Bash
cd frontend
Install Node Modules:

Bash
npm install
Launch the App:

Bash
npm run dev
Open in Browser: Terminal mein jo link dikhegi (usually http://localhost:5173), usse open kar lo.

🚀 4. How to Test the Project?
Dashboard open hone ke baad "Start Scanning" par click karo.
Browser Camera Permission maangega, usse "Allow" kar dena.
Sit still and look at the camera.
Important: Face par achi lighting honi chahiye. 5-10 seconds wait karo, niche real-time BPM aur Signal Graph dikhne lagega.
5).Important Files (Kon kya kaam karta hai?)
detector.py: Ye hamara core logic hai. Ye Mediapipe use karke face detect karta hai aur blood flow changes (rPPG) scan karta hai.
main.py: FastAPI server jo WebSockets use karke data frontend ko bhejta hai.
App.jsx: Frontend ka main file jo UI aur graphs handle karta hai.
6). Troubleshooting (Common Errors)
"No module named 'mediapipe'": Iska matlab pip install fail hua tha. Terminal mein pip install mediapipe firse chalao.
"WebSocket Connection Failed": Check karo ki backend terminal pe python main.py sahi se chal raha hai ya nahi.
Vitals not updating: Make sure aapka face camera ke frame mein clear hai aur room mein light kam nahi hai.
