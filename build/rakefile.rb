 task :build do
   puts "Building CSS"
    sh 'juicer merge ../www/styles/master.css -o ../www/styles/evbmaster-min.css --force'
    puts "Building JS"
     sh 'juicer merge -i ../www/lib/js/master.js -o ../www/lib/js/evbmaster-min.js --force'
        puts "Building CSS Mobile"
        sh 'juicer merge ../www/mobile/styles/master.css -o ../www/mobile/styles/evbmaster-min.css --force'
        puts "Building JS Mobile"
        sh 'juicer merge -i ../www/mobile/lib/js/master.js -o ../www/mobile/lib/js/evbmaster-min.js --force'
 end
 
 
