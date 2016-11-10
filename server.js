var express=require('express'),
	app=express(),
	fs=require('fs');

app.get("/",function(req,res){
	res.writeHead(200,{"Content-Type" : "text/html"})
	var filesMatched=0,totalScannedFiles=0,remainingCalls=0;
	(function search(currentDirectory){
		remainingCalls++;
		fs.readdir(currentDirectory,function(err,files){
			remainingCalls--;
			if(files)
			files.forEach(function(currentFileName){				
				console.log(++totalScannedFiles);
				if(currentFileName.indexOf(".mp3")!=-1)
					res.write("<p>"+ ++filesMatched+") "+"<b>"+currentFileName+"</b> --- "+currentDirectory+"</p>");				
				else{					
					if(currentDirectory=="/")
						search(currentDirectory+currentFileName);
					else if(currentFileName!="$RECYCLE.BIN")
						search(currentDirectory+"\\"+currentFileName);
				}
			});
			if(remainingCalls==0){
				console.log("\nFinished Searching. Total files scanned = "+totalScannedFiles);
				res.end("<b>Total matches found : "+filesMatched+"</b>");
			}
		});
	})("\\\\ASHISH");
	
}).listen(8080);