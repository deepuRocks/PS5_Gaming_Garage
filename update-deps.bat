@echo off
echo Updating frontend dependencies...
cd frontend
ncu -u
npm install

echo Updating backend dependencies...
cd ../backend
ncu -u
npm install

cd ..
echo All dependencies updated!
pause
