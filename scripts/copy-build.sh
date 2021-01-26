echo "Delete deploy folder"
ssh pi@brewmaster "sudo rm -rf /var/www/html/*"
echo "Copy files"
scp -r ./client/build/* pi@brewmaster:/var/www/html