echo "student table:"
echo
sudo runuser -l ivonetedb -c "psql -c \"
SELECT * FROM student;
\"";

echo "bill table:"
echo
sudo runuser -l ivonetedb -c "psql -c \"
SELECT * FROM bill;
\"";