# Must run o host machine
# For some undetected reason, if you run the script some data won't be inserted. To work, you have to copy command by command and run it in the terminal.

wget -O response.txt --post-data "cpf=410.273.148-21&name=Marco Aurélio Prado dos Santos Vidoca" http://localhost:3000/upsert-student;
wget -O response.txt --post-data "cpf=111.111.111-11&name=Chuck Norris" http://localhost:3000/upsert-student;
wget -O response.txt --post-data "cpf=999.999.999-99&name=Maria das Dores" http://localhost:3000/upsert-student;

wget -O response.txt --post-data "year=2016&month=10&student_cpf=410.273.148-21&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=11&student_cpf=410.273.148-21&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=12&student_cpf=410.273.148-21&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=01&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=02&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=03&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=04&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=05&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=06&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=07&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=08&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=09&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=10&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=11&student_cpf=410.273.148-21&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;

wget -O response.txt --post-data "year=2016&month=10&student_cpf=111.111.111-11&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=11&student_cpf=111.111.111-11&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=12&student_cpf=111.111.111-11&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=01&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=02&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=03&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=04&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=05&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=06&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=07&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=08&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=09&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=10&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=11&student_cpf=111.111.111-11&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;

wget -O response.txt --post-data "year=2016&month=10&student_cpf=999.999.999-99&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=11&student_cpf=999.999.999-99&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2016&month=12&student_cpf=999.999.999-99&value=50.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=01&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=02&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=03&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=04&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=05&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=06&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=07&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=08&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=09&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=10&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;
wget -O response.txt --post-data "year=2017&month=11&student_cpf=999.999.999-99&value=70.00&src=/vagrant/bill_files/bill.pdf" http://localhost:3000/upsert-bill;