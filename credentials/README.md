# TeamBWiSe2021GDSDProject
- A web based platform for students and tutors with similar skills to connect


# Team Details


| Name            | Email                                  | GitHub Username  |
| --------------- |:--------------------------------------:| ----------------:|
| Kritika Murugan | kritika.murugan@informatik.hs-fulda.de | krimuru9336      |


# Tracker Details

Please request access to the below link. Only Hochschule IDs will be given access
https://drive.google.com/drive/folders/1bhf6ACxM9XDMYxOs3zwrxKVrrYHKH32a?usp=sharing

You may use this link to create a google ID with your respective Hochschule IDs
https://smallbusiness.chron.com/create-google-account-company-email-address-28999.html

# AWS

Pem file inside credentials folder

Username: kritika.murugan@informatik.hs-fulda.de

Password: gdsdWiSe2021%


# Steps to Deploy to Cloud

1. Create EC2 Instance
2. Save security key in an accessible location
3. Click on connect in EC2, and go to SSH tab
4. Copy Example and paste in xShell
5. sudo yum install httpd -y
6. cd /var/www/html
7. Sudo yum install git
8. Git clone
9. cd into the cloned directory
10. sudo cp -R * ../   since httpd service looks for index.html inside html folder, we need to bring all files out of the git repo
11. Sudo service httpd start
12. Sudo service https status


# Database

Currently not set up for M0

Database Name: gdsd

Username: root

Password: gdsdWiSe2021%
