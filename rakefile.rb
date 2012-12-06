 task :site do
   puts "Building CSS"
    sh 'juicer merge ../www/styles/master.css -o ../www/styles/evbmaster-min.css --force'
    puts "Building JS"
     sh 'juicer merge -i ../www/lib/js/master.js -o ../www/lib/js/evbmaster-min.js --force'
 end

 
 task :min do
  puts "Building JS"
   sh 'juicer merge -i -s build/build.js -o www/sandbox/lib/js/Element/release/Element.js --force'
   sh 'juicer merge -i -s build/build.js -o www/lib/js/plugins/Element.js --force'
end

 task :release do
  puts "Release: Building JS"
   sh 'juicer merge -i -s build/build.js -o release/Element.js --force'
  puts "Release: Building Documentation"
   sh 'java -Djsdoc.dir=/Users/aaron.mcguire/Documents/jsdoc-toolkit -jar /Users/aaron.mcguire/Documents/jsdoc-toolkit/jsrun.jar /Users/aaron.mcguire/Documents/jsdoc-toolkit/app/run.js -t=DOC/template -r=4 www/sandbox/lib/js/Element -d=www/doc -q'
     
end

 task :doc do
  puts "Building Documentation"
   sh 'java -Djsdoc.dir=/Users/aaron.mcguire/Documents/jsdoc-toolkit -jar /Users/aaron.mcguire/Documents/jsdoc-toolkit/jsrun.jar /Users/aaron.mcguire/Documents/jsdoc-toolkit/app/run.js -t=DOC/template -r=4 www/sandbox/lib/js/Element -d=www/doc -q'
     
end
 
