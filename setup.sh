sudo apt-get update;
sudo apt-get install nodejs -y;
sudo apt-get install nodejs-legacy -y;
sudo apt-get install npm -y;
sudo apt-get install postgresql-9.5 -y;
sudo apt-get install pdftk -y;
sudo apt-get install poppler-utils -y;
sudo apt-get install ghostscript -y;
sudo apt-get install tesseract-ocr -y;

sudo npm install;

sudo adduser --quiet --disabled-password --gecos "Ivonete DB" ivonetedb
echo "ivonetedb:abcdef" | sudo chpasswd

sudo runuser -l postgres -c "psql -c \"CREATE USER "ivonetedb" WITH PASSWORD '"123456"';\"";
sudo runuser -l postgres -c "psql -c \"DROP DATABASE "ivonetedb"\"";
sudo runuser -l postgres -c "psql -c \"CREATE DATABASE "ivonetedb" OWNER "ivonetedb";\"";

sudo runuser -l ivonetedb -c "psql -c \"
CREATE TABLE bill(
	year INT,
	month INT,
	student_name VARCHAR(128),
	src VARCHAR(256),
	PRIMARY KEY(year, month, student_name)
)\"";
